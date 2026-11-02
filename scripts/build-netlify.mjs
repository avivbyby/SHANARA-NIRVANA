import { build } from "vite";
import react from "@vitejs/plugin-react";
import { copyFile, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";

const project = fileURLToPath(new URL("../", import.meta.url));
const root = path.join(project, "netlify");
const output = path.join(project, "dist-netlify");
const renderer = path.join(project, ".netlify-render");
const common = { configFile: false, root, plugins: [react()] };

try {
  // The same React components and content as Sites, without Cloudflare runtime dependencies.
  await build({ ...common, publicDir: path.join(project, "public"), build: { outDir: output, emptyOutDir: true } });
  await build({ ...common, publicDir: false, build: {
    ssr: path.join(root, "entry-server.tsx"), outDir: renderer, emptyOutDir: true,
    rollupOptions: { output: { entryFileNames: "render.mjs" } },
  } });
  const { render } = await import(pathToFileURL(path.join(renderer, "render.mjs")));
  const indexPath = path.join(output, "index.html");
  const template = await readFile(indexPath, "utf8");
  if (!template.includes("<!--shanara-app-->")) throw new Error("Missing prerender slot");
  await writeFile(indexPath, template.replace("<!--shanara-app-->", render()));
  for (const route of ["nirvana", "nirvana/plans"]) {
    const directory = path.join(output, route);
    await mkdir(directory, { recursive: true });
    await copyFile(path.join(project, "app", route, "document.html"), path.join(directory, "index.html"));
  }
  await writeFile(path.join(output, "404.html"), '<!doctype html><html lang="he" dir="rtl"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>העמוד לא נמצא | SHANARA</title><body><main><h1>העמוד לא נמצא</h1><a href="/">חזרה לשנארה</a></main></body></html>');
  console.log("Netlify static site ready: dist-netlify (/, /nirvana, /nirvana/plans)");
} finally {
  await rm(renderer, { recursive: true, force: true });
}
