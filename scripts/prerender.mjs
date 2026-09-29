// Renders the app to static HTML at build time and injects it into
// dist/index.html, so the page is readable before any JavaScript runs
// (and by crawlers and link unfurlers). The client bundle then hydrates it.
import { readFile, readdir, writeFile, rm } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";

const dist = resolve("dist");
const ssrDir = resolve("dist-ssr");

const { render } = await import(pathToFileURL(resolve(ssrDir, "entry-server.js")).href);
let html = await readFile(resolve(dist, "index.html"), "utf8");

if (!html.includes("<!--app-html-->")) {
  throw new Error("dist/index.html is missing the <!--app-html--> placeholder");
}
html = html.replace("<!--app-html-->", render());

// Inline the stylesheet: it's small, and it saves a render-blocking round trip.
const cssLink = html.match(/<link rel="stylesheet"[^>]*href="\/(assets\/[^"]+\.css)"[^>]*>/);
if (cssLink) {
  const css = await readFile(resolve(dist, cssLink[1]), "utf8");
  html = html.replace(cssLink[0], () => `<style>${css}</style>`);
}

// Preload the Latin subsets of the fonts used above the fold, so text
// renders in its final face and doesn't shift when fonts swap in.
const assets = await readdir(resolve(dist, "assets"));
const critical = [
  /^geist-latin-wght-normal-.*\.woff2$/,
  /^geist-mono-latin-wght-normal-.*\.woff2$/,
  /^instrument-serif-latin-400-normal-.*\.woff2$/,
  /^instrument-serif-latin-400-italic-.*\.woff2$/
];
const preloads = critical
  .map((re) => assets.find((f) => re.test(f)))
  .filter(Boolean)
  .map((f) => `<link rel="preload" href="/assets/${f}" as="font" type="font/woff2" crossorigin />`)
  .join("\n    ");
html = html.replace("</title>", `</title>\n    ${preloads}`);

await writeFile(resolve(dist, "index.html"), html);

// GitHub Pages: serve files as-is and fall back to the same page for 404s.
await writeFile(resolve(dist, ".nojekyll"), "");
await writeFile(resolve(dist, "404.html"), html);

await rm(ssrDir, { recursive: true, force: true });
console.log(`prerendered dist/index.html (${(html.length / 1024).toFixed(1)} kB, ${critical.length} font preloads)`);
