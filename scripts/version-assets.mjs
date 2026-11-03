import { createHash } from "node:crypto";
import { readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
const root = fileURLToPath(new URL("../", import.meta.url));
const hashes = new Map();
async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) await walk(file);
    else if (/\.(js|css)$/.test(file)) hashes.set("/" + path.relative(path.join(root, "public"), file).split(path.sep).join("/"), createHash("sha256").update(await readFile(file)).digest("hex").slice(0, 12));
  }
}
await walk(path.join(root, "public/site-modules"));
await walk(path.join(root, "public/fonts"));
for (const relative of ["netlify/index.html", "app/accessibility/document.html", "app/nirvana/document.html", "app/nirvana/plans/document.html", "app/hooks/useSmoothScrolling.ts"]) {
  const file = path.join(root, relative); const source = await readFile(file, "utf8");
  const next = source.replace(/\/(?:site-modules|fonts)\/[^"'\s<>?]+\.(?:js|css)(?:\?v=[a-f0-9]+)?/g, value => {
    const asset = value.split("?")[0]; return hashes.has(asset) ? `${asset}?v=${hashes.get(asset)}` : value;
  });
  if (next !== source) await writeFile(file, next);
}
