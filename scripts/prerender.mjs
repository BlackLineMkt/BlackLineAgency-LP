// Pré-renderização da LP (roda depois do build, via `npm run build`).
//
//  1. Gera o HTML do <App /> com react-dom/server (bundle SSR em dist-ssr).
//  2. Injeta o resultado dentro de <div id="root"> em dist/index.html.
//     No navegador, src/main.tsx hidrata esse HTML (sem duplicar conteúdo).
//  3. Se a variável de ambiente SITE_URL estiver definida (ex.: https://www.seudominio.com.br),
//     gera também canonical, og:url, og:image, twitter:image, url/logo no JSON-LD,
//     sitemap.xml e a linha Sitemap do robots.txt.
//     Sem SITE_URL nada disso é gerado: nenhuma URL é presumida.
import { readFile, writeFile, rm } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const dist = resolve("dist");
const ssrDir = resolve("dist-ssr");

const rawSite = (process.env.SITE_URL ?? "").trim();
let siteUrl = "";
if (rawSite) {
  if (!/^https:\/\/[a-z0-9.-]+(:\d+)?$/i.test(rawSite.replace(/\/+$/, ""))) {
    throw new Error(
      `SITE_URL inválida: "${rawSite}". Use o formato https://dominio.com.br (sem caminho).`,
    );
  }
  siteUrl = rawSite.replace(/\/+$/, "");
}

const OG_ALT =
  "Black Line Agency, agência de marketing para estúdios de tatuagem. Logo com polvo e o texto BL | BLACK LINE AGENCY";

const { render } = await import(pathToFileURL(resolve(ssrDir, "entry-server.js")).href);
const appHtml = render();

let html = await readFile(resolve(dist, "index.html"), "utf8");

// 1) conteúdo pré-renderizado
const emptyRoot = '<div id="root"></div>';
if (!html.includes(emptyRoot))
  throw new Error('dist/index.html não contém <div id="root"></div> vazio.');
html = html.replace(emptyRoot, () => `<div id="root">${appHtml}</div>`);

// 2) tags que dependem do domínio
const marker = /[ \t]*<!-- SITE_URL_TAGS:[\s\S]*?-->\n?/;
if (!marker.test(html)) throw new Error("Marcador SITE_URL_TAGS não encontrado em index.html.");

if (siteUrl) {
  const tags = [
    `<link rel="canonical" href="${siteUrl}/" />`,
    `<meta property="og:url" content="${siteUrl}/" />`,
    `<meta property="og:image" content="${siteUrl}/og-image.jpg" />`,
    `<meta property="og:image:type" content="image/jpeg" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${OG_ALT}" />`,
    `<meta name="twitter:image" content="${siteUrl}/og-image.jpg" />`,
  ]
    .map((t) => `    ${t}`)
    .join("\n");
  html = html.replace(marker, () => `${tags}\n`);

  // JSON-LD: acrescenta url e logo da organização
  html = html.replace(
    /(<script type="application\/ld\+json">)([\s\S]*?)(<\/script>)/,
    (_m, open, body, close) => {
      const data = JSON.parse(body);
      const org = data["@graph"].find((n) => n["@type"] === "Organization");
      org.url = `${siteUrl}/`;
      org.logo = `${siteUrl}/apple-touch-icon.png`;
      return `${open}\n${JSON.stringify(data, null, 2)}\n    ${close}`;
    },
  );

  await writeFile(
    resolve(dist, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${siteUrl}/</loc>\n  </url>\n</urlset>\n`,
  );
  const robots = await readFile(resolve(dist, "robots.txt"), "utf8");
  await writeFile(
    resolve(dist, "robots.txt"),
    `${robots.trimEnd()}\nSitemap: ${siteUrl}/sitemap.xml\n`,
  );
} else {
  html = html.replace(marker, "");
  console.warn(
    "[prerender] SITE_URL não definida: canonical, og:url, og:image, sitemap.xml e url/logo do schema NÃO foram gerados.",
  );
}

await writeFile(resolve(dist, "index.html"), html);
await rm(ssrDir, { recursive: true, force: true });
console.log(
  `[prerender] OK. HTML pré-renderizado (${(appHtml.length / 1024).toFixed(0)} KB de markup).`,
);
