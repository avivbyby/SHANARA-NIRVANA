import assert from "node:assert/strict";
import test from "node:test";
import { readFile, access } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../dist-netlify/", import.meta.url));
const routes = ["index.html", "nirvana/index.html", "nirvana/plans/index.html"];

test("Netlify output contains three complete prerendered routes", async () => {
  const pages = await Promise.all(routes.map(route => readFile(path.join(root, route), "utf8")));
  for (const page of pages) {
    assert.match(page, /<html[^>]+lang="he"/);
    assert.match(page, /<title>.+<\/title>/);
    assert.doesNotMatch(page, /localhost:|<!--shanara-app-->/);
  }
  assert.match(pages[0], /הרגע עבר/);
  for (const html of pages) {
    const head = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i)?.[1] ?? "";
    assert.match(head, /name="description"/);
    assert.match(head, /property="og:image" content="https:\/\//);
    assert.doesNotMatch(head, /fonts\.googleapis/);
  }
  assert.match(pages[0], /af15e43f976a49cc8c1d70c1946a3044/);
  assert.match(pages[0], /m5u7izGsMinckmtB6/);
  await access(path.join(root, "shanara-photos/desert-canopy-artlead.webp"));
  assert.match(pages[1], /Nirvana by SHANARA/);
  assert.match(pages[2], /Nirvana Reset/);
});

test("all local HTML resources and route links resolve in the output", async () => {
  for (const route of routes) {
    const html = await readFile(path.join(root, route), "utf8");
    const paths = [...html.matchAll(/(?:src|href)="(\/[^"?#]*)(?:[?#][^"]*)?"/g)].map(match => match[1]);
    for (const localPath of new Set(paths)) {
      const target = localPath === "/" ? "index.html" : ["/nirvana", "/nirvana/", "/nirvana/plans", "/nirvana/plans/"].includes(localPath) ? `${localPath.replace(/^\/+|\/+$/g, "")}/index.html` : localPath.slice(1);
      await access(path.join(root, target)).catch(() => assert.fail(`${route}: missing ${localPath}`));
    }
  }
});
