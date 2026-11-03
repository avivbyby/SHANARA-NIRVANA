import { readFile, writeFile, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const root = fileURLToPath(new URL('../', import.meta.url));
const site = JSON.parse(await readFile(path.join(root,'app/content/site-metadata.json'),'utf8'));
const origin = site.origin.replace(/\/$/,'');
const serialize = value => JSON.stringify(value).replace(/</g,'\\u003c');
const website = { '@type':'WebSite', '@id':origin+'/#website', url:origin+'/', name:site.name, inLanguage:'he', publisher:{'@id':origin+'/#organization'} };
const organization = { '@type':'Organization', '@id':origin+'/#organization', name:site.name, url:origin+'/', logo:origin+site.logo, sameAs:site.social };
for (const page of site.pages.filter(p=>p.path!=='/')) {
 const file=path.join(root,'app',page.path.slice(1),'document.html'); let html=await readFile(file,'utf8');
 const schema={'@context':'https://schema.org','@graph':[website,organization,{'@type':'WebPage','@id':origin+page.path+'#page',url:origin+page.path,name:page.name,description:page.description,inLanguage:'he',isPartOf:{'@id':website['@id']}}]};
 const head=`<!-- site-seo:start --><link rel="canonical" href="${origin+page.path}"><script type="application/ld+json">${serialize(schema)}</script><!-- site-seo:end -->`;
 html=html.replace(/<!-- site-seo:start -->[\s\S]*?<!-- site-seo:end -->/g,'').replace('</head>',head+'</head>');
 await writeFile(file,html);
}
await writeFile(path.join(root,'public/robots.txt'),`User-agent: *\nAllow: /\nDisallow: /api/\nDisallow: /_vinext/\nSitemap: ${origin}/sitemap.xml\n`);
await writeFile(path.join(root,'public/sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${site.pages.map(p=>`  <url><loc>${origin+p.path}</loc></url>`).join('\n')}\n</urlset>\n`);

// Netlify's independent HTML shell shares the same search metadata.
const shell=path.join(root,'netlify/index.html');
try {
 await access(shell); const schema={'@context':'https://schema.org','@graph':[website,organization]};
 let html=await readFile(shell,'utf8');
 html=html.replace(/<!-- site-seo:start -->[\s\S]*?<!-- site-seo:end -->/g,'');
 html=html.replace('</head>',`<!-- site-seo:start --><link rel="canonical" href="${origin}/"><script type="application/ld+json">${serialize(schema)}</script><!-- site-seo:end --></head>`);
 await writeFile(shell,html);
} catch(error) { if(error.code!=='ENOENT') throw error; }
