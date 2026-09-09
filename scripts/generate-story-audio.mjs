import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import tls from "node:tls";
import vm from "node:vm";

const projectRoot = path.resolve(import.meta.dirname, "..");
const appPath = path.join(projectRoot, "app.js");
const audioRootDirectory = path.join(projectRoot, "assets", "audio");
const manifestPath = path.join(projectRoot, "audio-manifest.js");
const voice = "zh-CN-XiaoxiaoNeural";

function loadQuestionSets() {
  const source = fs.readFileSync(appPath, "utf8");
  const start = source.indexOf("const questionSets =");
  const end = source.indexOf("\n\nconst state =", start);
  if (start < 0 || end < 0) throw new Error("Could not find questionSets in app.js");
  return vm.runInNewContext(`${source.slice(start, end)}\nquestionSets;`);
}

function integerToChinese(value) {
  const number = Number(value);
  if (!Number.isSafeInteger(number) || number < 0 || number > 9999) return String(value);
  if (number === 0) return "零";
  const digits = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
  const units = ["", "十", "百", "千"];
  const source = String(number);
  let result = "";
  let pendingZero = false;

  [...source].forEach((character, index) => {
    const digit = Number(character);
    const unit = units[source.length - index - 1];
    if (digit === 0) {
      if (result && [...source.slice(index + 1)].some((item) => item !== "0")) pendingZero = true;
      return;
    }
    if (pendingZero) {
      result += "零";
      pendingZero = false;
    }
    const omitOne = digit === 1 && unit === "十" && result === "";
    result += `${omitOne ? "" : digits[digit]}${unit}`;
  });
  return result;
}

function speechFriendlyText(text) {
  return text
    // Pause after a complete expression before explanatory prose, while
    // keeping number-and-measure-word phrases such as “8 张” connected.
    .replace(/((?:\(?\d+\)?\s*[×*÷/＋+－\-=＝]\s*)+\(?\d+\)?)\s+(?![个只本张支颗块页天元人组份层盒包袋班次倍米厘米])(?=[\p{Script=Han}])/gu, "$1，")
    .replace(/\d+/g, integerToChinese)
    .replace(/[×*]/g, "，乘以，")
    .replace(/[÷/]/g, "，除以，")
    .replace(/[＝=]/g, "，等于，")
    .replace(/[＋+]/g, "，加，")
    .replace(/[－-]/g, "，减，")
    .replaceAll("(", "，括号里，")
    .replaceAll(")", "，括号结束，")
    .replace(/\s*，\s*/g, "，")
    .replace(/，{2,}/g, "，")
    .replace(/\s+/g, "")
    .trim();
}

function escapeXml(text) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function collectEntries(questionSets) {
  const entries = new Map();
  const add = (mode, text) => {
    if (!entries.has(text)) entries.set(text, { mode, text });
  };
  add("common", "语音讲解已开启");

  ["story", "order", "calculate", "transfer"].forEach((mode) => {
    const levels = Object.values(questionSets[mode].levels);
    levels.flat().forEach((question) => {
      add(mode, `答对了。${question.explain}`);
      add(mode, `提示。${question.hint}`);
      add(mode, `再观察一次。${question.hint}`);
      question.wrongHints?.filter(Boolean).forEach((hint) => add(mode, `再观察一次。${hint}`));
    });
    if (mode !== "story") {
      add(mode, "再观察一次。先别急着计算答案，看看运算符和括号。");
    }
    new Set(levels.map((questions) => questions.length)).forEach((total) => {
      for (let firstTryCorrect = 0; firstTryCorrect <= total; firstTryCorrect += 1) {
        add(
          mode,
          `本轮完成。你完成了${total}道题，独立一次答对${firstTryCorrect}道，`
            + `获得${total + firstTryCorrect}颗星。`
        );
      }
    });
  });
  return [...entries.values()];
}

const host = "speech.platform.bing.com";
const clientToken = "6A5AA1D4EAFF4E9FB37E23D68491D6F4";
const chromiumVersion = "143.0.3650.75";
const uuid = () => crypto.randomUUID().replaceAll("-", "");

function createGecToken() {
  const unixSeconds = Math.floor(Date.now() / 1000);
  let windowsSeconds = unixSeconds + 11644473600;
  windowsSeconds -= windowsSeconds % 300;
  const fileTime = BigInt(windowsSeconds) * 10000000n;
  return crypto
    .createHash("sha256")
    .update(`${fileTime}${clientToken}`, "ascii")
    .digest("hex")
    .toUpperCase();
}

function websocketFrame(payload, opcode = 1) {
  const body = Buffer.from(payload);
  const mask = crypto.randomBytes(4);
  let header;
  if (body.length < 126) {
    header = Buffer.from([0x80 | opcode, 0x80 | body.length]);
  } else if (body.length < 65536) {
    header = Buffer.alloc(4);
    header[0] = 0x80 | opcode;
    header[1] = 0xfe;
    header.writeUInt16BE(body.length, 2);
  } else {
    header = Buffer.alloc(10);
    header[0] = 0x80 | opcode;
    header[1] = 0xff;
    header.writeBigUInt64BE(BigInt(body.length), 2);
  }
  const masked = Buffer.alloc(body.length);
  for (let index = 0; index < body.length; index += 1) {
    masked[index] = body[index] ^ mask[index % 4];
  }
  return Buffer.concat([header, mask, masked]);
}

function javascriptDate() {
  return new Date().toString().replace(/ \([^)]*\)$/, " (Coordinated Universal Time)");
}

function synthesize(text) {
  return new Promise((resolve, reject) => {
    const connectionId = uuid();
    const requestPath = `/consumer/speech/synthesize/readaloud/edge/v1?TrustedClientToken=${clientToken}`
      + `&ConnectionId=${connectionId}&Sec-MS-GEC=${createGecToken()}`
      + `&Sec-MS-GEC-Version=1-${chromiumVersion}`;
    const websocketKey = crypto.randomBytes(16).toString("base64");
    const audioChunks = [];
    let buffer = Buffer.alloc(0);
    let upgraded = false;
    let settled = false;

    const finish = (error, audio) => {
      if (settled) return;
      settled = true;
      clearTimeout(timeout);
      socket.destroy();
      if (error) reject(error);
      else resolve(audio);
    };

    const socket = tls.connect(443, host, { servername: host }, () => {
      const headers = [
        `GET ${requestPath} HTTP/1.1`,
        `Host: ${host}`,
        "Upgrade: websocket",
        "Connection: Upgrade",
        `Sec-WebSocket-Key: ${websocketKey}`,
        "Sec-WebSocket-Version: 13",
        "Pragma: no-cache",
        "Cache-Control: no-cache",
        "Origin: chrome-extension://jdiccldimpdaibmpdkjnbmckianbfold",
        `Cookie: muid=${crypto.randomBytes(16).toString("hex").toUpperCase()};`,
        "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
          + "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0",
        "Accept-Encoding: gzip, deflate, br, zstd",
        "Accept-Language: en-US,en;q=0.9",
        "\r\n"
      ];
      socket.write(headers.join("\r\n"));
    });

    const timeout = setTimeout(() => finish(new Error("Speech generation timed out")), 30000);

    function sendSynthesisRequests() {
      const config = {
        context: {
          synthesis: {
            audio: {
              metadataoptions: { sentenceBoundaryEnabled: "false", wordBoundaryEnabled: "false" },
              outputFormat: "audio-24khz-48kbitrate-mono-mp3"
            }
          }
        }
      };
      socket.write(websocketFrame(
        `X-Timestamp:${javascriptDate()}\r\nContent-Type:application/json; charset=utf-8\r\n`
          + `Path:speech.config\r\n\r\n${JSON.stringify(config)}\r\n`
      ));
      const ssml = `<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xml:lang='zh-CN'>`
        + `<voice name='${voice}'><prosody pitch='+2Hz' rate='-8%' volume='+0%'>`
        + `${escapeXml(speechFriendlyText(text))}</prosody></voice></speak>`;
      socket.write(websocketFrame(
        `X-RequestId:${uuid()}\r\nContent-Type:application/ssml+xml\r\n`
          + `X-Timestamp:${javascriptDate()}Z\r\nPath:ssml\r\n\r\n${ssml}`
      ));
    }

    function parseFrames() {
      while (buffer.length >= 2) {
        const opcode = buffer[0] & 0x0f;
        let length = buffer[1] & 0x7f;
        let offset = 2;
        if (length === 126) {
          if (buffer.length < 4) return;
          length = buffer.readUInt16BE(2);
          offset = 4;
        } else if (length === 127) {
          if (buffer.length < 10) return;
          length = Number(buffer.readBigUInt64BE(2));
          offset = 10;
        }
        if (buffer.length < offset + length) return;
        const payload = buffer.subarray(offset, offset + length);
        buffer = buffer.subarray(offset + length);

        if (opcode === 1) {
          if (payload.toString("utf8").includes("turn.end")) {
            finish(null, Buffer.concat(audioChunks));
          }
        } else if (opcode === 2 && payload.length >= 2) {
          const headerLength = payload.readUInt16BE(0);
          if (headerLength + 2 <= payload.length) audioChunks.push(payload.subarray(headerLength + 2));
        } else if (opcode === 9) {
          socket.write(websocketFrame(payload, 10));
        }
      }
    }

    socket.on("data", (chunk) => {
      buffer = Buffer.concat([buffer, chunk]);
      if (!upgraded) {
        const headerEnd = buffer.indexOf("\r\n\r\n");
        if (headerEnd < 0) return;
        const responseHeaders = buffer.subarray(0, headerEnd).toString("utf8");
        if (!responseHeaders.startsWith("HTTP/1.1 101")) {
          finish(new Error(responseHeaders.split("\r\n")[0]));
          return;
        }
        buffer = buffer.subarray(headerEnd + 4);
        upgraded = true;
        sendSynthesisRequests();
      }
      parseFrames();
    });
    socket.on("error", (error) => finish(error));
    socket.on("close", () => {
      if (!settled) finish(new Error("Speech service closed before returning audio"));
    });
  });
}

fs.mkdirSync(audioRootDirectory, { recursive: true });
const entries = collectEntries(loadQuestionSets());
const manifest = {};
const refreshMatch = process.argv
  .find((argument) => argument.startsWith("--refresh-match="))
  ?.slice("--refresh-match=".length);
const refreshAll = process.argv.includes("--refresh-all");

for (const [index, { mode, text: line }] of entries.entries()) {
  const audioDirectory = path.join(audioRootDirectory, mode);
  fs.mkdirSync(audioDirectory, { recursive: true });
  const id = crypto.createHash("sha256").update(line).digest("hex").slice(0, 16);
  const audioVersion = crypto
    .createHash("sha256")
    .update(speechFriendlyText(line))
    .digest("hex")
    .slice(0, 8);
  const filename = `${id}.mp3`;
  const outputPath = path.join(audioDirectory, filename);
  manifest[line] = `assets/audio/${mode}/${filename}?v=${audioVersion}`;
  const shouldRefresh = refreshAll || (refreshMatch && line.includes(refreshMatch));
  if (fs.existsSync(outputPath) && fs.statSync(outputPath).size > 0 && !shouldRefresh) {
    console.log(`[${index + 1}/${entries.length}] cached ${mode}/${filename}`);
    continue;
  }
  console.log(`[${index + 1}/${entries.length}] generating ${mode}/${filename}`);
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const audio = await synthesize(line);
      fs.writeFileSync(outputPath, audio);
      lastError = null;
      break;
    } catch (error) {
      lastError = error;
      console.warn(`  attempt ${attempt} failed: ${error.message}`);
      await new Promise((resolve) => setTimeout(resolve, attempt * 1500));
    }
  }
  if (lastError) throw lastError;
  await new Promise((resolve) => setTimeout(resolve, 750));
}

const manifestSource = `// Generated by scripts/generate-story-audio.mjs.\n`
  + `window.ARITHMETIC_AUDIO = Object.freeze(${JSON.stringify(manifest, null, 2)});\n`;
fs.writeFileSync(manifestPath, manifestSource);
console.log(`Generated ${entries.length} speech clips and ${path.relative(projectRoot, manifestPath)}.`);
