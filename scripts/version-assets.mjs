import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const projectRoot = path.resolve(import.meta.dirname, "..");
const pages = {
  "index.html": ["styles.css", "app.js"],
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

  for (const asset of assets) {
    const version = assetVersion(asset);
    const pattern = new RegExp(`((?:href|src)=(["']))${escapeRegExp(asset)}(?:\\?v=[^"']*)?\\2`, "g");
    html = html.replace(pattern, `$1${asset}?v=${version}$2`);
    console.log(`${page}: ${asset}?v=${version}`);
  }

  fs.writeFileSync(pagePath, html);
}
