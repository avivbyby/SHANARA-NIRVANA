import assert from "node:assert/strict";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the Shanara experience", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /SHANARA Legacy \| מעגל של אהבה/);
  assert.match(html, /לאירוע הבא/);
  assert.match(html, /https:\/\/zygo\.co\.il\/event\/698cbb46740bbd0327f146fb\?tl=OXA2/);
  assert.match(html, /shanara-logo-white\.png/);
  assert.match(html, /event-friendship\.jpg/);
  assert.match(html, /PXBL3519\.webp/);
  assert.match(html, /role="tablist"/);
  assert.match(html, /role="tabpanel"/);
  assert.match(html, /גלריית הרגעים של שנארה/);
  assert.match(html, /PXBL3749\.webp/);
  assert.match(html, /PXBL3717\.webp/);
  assert.match(html, /PXBL3262\.webp/);
  assert.match(html, /PXBL4235\.webp/);
  assert.match(html, /רגעים שאי אפשר/);
  assert.match(html, /href="\/nirvana"/);
  assert.match(html, /פחות רעש/);
  assert.match(html, /shanara-vision\.jpg/);
  assert.match(html, /החזון המלא של SHANARA Legacy/);
  assert.doesNotMatch(html, /כמקשה אחת/);
  assert.doesNotMatch(html, /פתיחת החזון המלא/);
  assert.doesNotMatch(html, /codex-preview/);
});

test("server-renders the NIRVANA product page with route-specific metadata", async () => {
  const response = await render("/nirvana");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /Nirvana by SHANARA \| מרחב של נוכחות, ריפוי וחיבור/);
  assert.match(html, /לעצור\. לנשום\./);
  assert.match(html, /הילינג/);
  assert.match(html, /סדנאות/);
  assert.match(html, /ארבעה עולמות/);
  assert.match(html, /הפקות/);
  assert.match(html, /nirvana-assets\/nirvana\/desert-ritual-duo\.webp/);
  assert.match(html, /href="\/"/);
  assert.doesNotMatch(html, /SHANARA Legacy \| מעגל של אהבה/);
});


test("plans page offers company routes before production packages", async () => {
  const response = await render("/nirvana/plans");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.ok(html.indexOf('id="teams"') < html.indexOf('id="productions"'));
  for (const plan of ["Nirvana Reset", "Nirvana Day", "Nirvana Retreat", "נשימה", "זרימה", "הארה"]) assert.ok(html.includes(`data-plan="${plan}"`));
  assert.match(html, /id="selected-plan"/);
  assert.doesNotMatch(html, /class="fab"/);
});

// Splitting the standalone pages must never ship a missing or invalid script.
test("standalone page modules exist and parse after extraction", async () => {
  const { readFile } = await import("node:fs/promises");
  const { Script } = await import("node:vm");
  for (const pathname of ["/nirvana", "/nirvana/plans"]) {
    const html = await (await render(pathname)).text();
    const references = [...html.matchAll(/(?:src|href)="(\/site-modules\/[^"?]+)"/g)];
    assert.ok(references.length > 1, `Expected modular resources for ${pathname}`);
    for (const [, asset] of references) {
      const source = await readFile(new URL(`../public${asset}`, import.meta.url), "utf8");
      assert.ok(source.length > 0);
      if (asset.endsWith(".js")) new Script(source, { filename: asset });
    }
  }
});

// Every business destination from Taplink must survive server rendering and future additions.
test("renders all five albums and the community, Instagram and event destinations", async () => {
  const html = await (await render()).text();
  for (const url of [
    "https://pixelbel.pixieset.com/shanaralegacyfemina/",
    "https://pixelbel.pixieset.com/shanaralegacy/#",
    "https://shelchyk.pixieset.com/shanaralegacy/",
    "https://alexoosherov.pixieset.com/shanaralegacy/",
    "https://lidorpeerartlead.pixieset.com/shanara/",
    "https://instagram.com/shanara.legacy",
    "https://chat.whatsapp.com/BE0FNMEybINEyQLG83KuOj?mode=ac_c",
    "https://zygo.co.il/event/698cbb46740bbd0327f146fb?tl=OXA2",
  ]) assert.ok(html.includes(`href="${url}"`), `Missing destination: ${url}`);
  assert.ok(html.includes('id="albums"'));
  assert.ok(html.includes('id="connect"'));
  assert.ok(html.indexOf('id="albums"') < html.indexOf('id="connect"'));
});

test("All Stars groups both supplied albums under one event", async () => {
  const html = await (await render()).text();
  assert.match(html, /data-event-id="all-stars"/);
  assert.match(html, /האלבומים של All Stars/);
  assert.match(html, /2 אלבומים/);
  assert.ok(html.includes('href="https://lightroom.adobe.com/shares/af15e43f976a49cc8c1d70c1946a3044"'));
  assert.ok(html.includes('href="https://photos.app.goo.gl/m5u7izGsMinckmtB6"'));
});
