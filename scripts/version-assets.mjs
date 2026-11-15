import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { renderHeader } from "./site-navigation.mjs";

const projectRoot = path.resolve(import.meta.dirname, "..");
const pages = {
  "compare.html": ["learning.css", "compare.css", "compare-data.js", "compare.js"],
  "index.html": ["learning.css", "learning.js"],
  "math.html": ["styles.css", "app.js"],
  "describe.html": ["learning.css", "describe.css", "describe-data.js", "describe-paragraphs.js", "describe.js"],
  "story.html": ["learning.css", "story-data.js", "story.js"],
  "make24.html": ["styles.css", "make24.css", "make24.js"],
  "sudoku.html": ["styles.css", "sudoku.css", "sudoku.js"]
};

function assetVersion(asset) {
  const content = fs.readFileSync(path.join(projectRoot, asset));
  return crypto.createHash("sha256").update(content).digest("hex").slice(0, 10);
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

for (const [page, assets] of Object.entries(pages)) {
  const pagePath = path.join(projectRoot, page);
  let html = fs.readFileSync(pagePath, "utf8");
  html = html.replace(/<header\b[^>]*>[\s\S]*?<\/header>/, renderHeader(page));
  if (!html.includes('href="site-nav.css')) html = html.replace("</head>", '<link rel="stylesheet" href="site-nav.css"><script src="site-nav.js" defer></script></head>');
  const mainId = html.match(/<main[^>]*id="([^"]+)"/)[1];
  html = html.replace(/<a class="(?:visually-hidden|skip-link|skip-describe|skip|site-skip)" href="#[^"]+">[^<]+<\/a>/, "");
  html = html.replace(/<body([^>]*)>/, `<body$1><a class="site-skip" href="#${mainId}">跳到学习内容</a>`);
  html = html.replace(/<main([^>]*)>/, (tag, attrs) => attrs.includes("tabindex=") ? tag : `<main${attrs} tabindex="-1">`);

  for (const asset of [...assets, "site-nav.css", "site-nav.js"]) {
    const version = assetVersion(asset);
    const pattern = new RegExp(`((?:href|src)=(["']))${escapeRegExp(asset)}(?:\\?v=[^"']*)?\\2`, "g");
    html = html.replace(pattern, `$1${asset}?v=${version}$2`);
    console.log(`${page}: ${asset}?v=${version}`);
  }

  fs.writeFileSync(pagePath, html.replace(/^[ \t]+$/gm, ""));
}
