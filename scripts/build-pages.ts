// Generate readable HTML and direct-entry pages for the existing React routes.
// All visitors receive the same content; React replaces this fallback when loaded.
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { PAGES, SITE_URL, STUDIO_SCHEMA } from '../src/pageMetadata';
import { SERVICE_CATEGORIES, FOUNDERS } from '../src/constants';

const escape = (value: string) => value.replace(/[&<>"']/g, char => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[char]!);
const template = await readFile('dist/index.html', 'utf8');
const navigation = `<nav aria-label="Main navigation">${Object.entries(PAGES).map(([path, page]) =>
  `<a href="${path === '/' ? '/' : `${path}/`}">${escape(path === '/' ? 'Home' : page.heading)}</a>`).join(' · ')}</nav>`;

for (const [path, page] of Object.entries(PAGES)) {
  const url = `${SITE_URL}${path === '/' ? '/' : `${path}/`}`;
  const structuredData = { ...STUDIO_SCHEMA, '@graph': [...STUDIO_SCHEMA['@graph'], {
    '@type': 'WebPage', '@id': `${url}#page`, url, name: page.title,
    description: page.description, about: { '@id': `${SITE_URL}/#studio` },
  }] };
  const head = `<title>${escape(page.title)}</title>
    <meta name="description" content="${escape(page.description)}" />
    <link rel="canonical" href="${url}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Source II Studio" />
    <meta property="og:title" content="${escape(page.title)}" />
    <meta property="og:description" content="${escape(page.description)}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${SITE_URL}/images/optimized/about-banner.webp" />
    <meta property="og:image:alt" content="Illustration artwork from Source II Studio" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="${escape(page.title)}" />
    <meta name="twitter:description" content="${escape(page.description)}" />
    <script type="application/ld+json">${JSON.stringify(structuredData).replace(/</g, '\\u003c')}</script>`;
  const details = path === '/services' ? SERVICE_CATEGORIES.map(category =>
    `<section><h2>${escape(category.category)}</h2>${category.items.map(service => `<h3>${escape(service.title)}</h3><p>${escape(service.description)}</p>`).join('')}</section>`).join('')
    : path === '/about' ? FOUNDERS.map(founder => `<section><h2>${escape(founder.name)}</h2><p>${escape(founder.role)}</p><p>${escape(founder.bio)}</p></section>`).join('') : '';
  const content = `<div id="root"><main style="max-width:70rem;margin:auto;padding:3rem 1.5rem;font-family:system-ui;line-height:1.7">
    <p>Source II Studio · Sadiqa Akhter</p>${navigation}
    <h1>${escape(page.heading)}</h1><p>${escape(page.summary)}</p>
    ${details}
    <p>Picture-book illustration · Character design · Book covers · Amazon KDP formatting</p>
    <p><a href="/portfolio/SourceIIStudio_Portfolio.pdf">Download illustration portfolio</a></p>
    <p><a href="https://www.behance.net/thesadiqaakhter">View artwork on Behance</a> · <a href="https://www.amazon.com/author/sadiqaakhter">Books by Sadiqa Akhter</a></p>
    <p><a href="mailto:hello@sourceiistudio.com">Email Source II Studio</a></p>
  </main></div>`;
  const html = template.replace(/\s*<meta name="description"[^>]*>/g, '')
    .replace(/<title>[\s\S]*?<\/title>/, head)
    .replace('<div id="root"></div>', content);
  const directory = path === '/' ? 'dist' : `dist${path}`;
  await mkdir(directory, { recursive: true });
  await writeFile(`${directory}/index.html`, html);
}

await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${Object.keys(PAGES).map(path => `  <url><loc>${SITE_URL}${path === '/' ? '/' : `${path}/`}</loc></url>`).join('\n')}
</urlset>\n`);

const notFound = template
  .replace(/<title>[\s\S]*?<\/title>/, '<title>Page not found | Source II Studio</title>')
  .replace(/<meta name="robots"[^>]*>/, '<meta name="robots" content="noindex, follow" />')
  .replace('<div id="root"></div>', `<div id="root"><main><h1>Page not found</h1>${navigation}<p>Explore our illustration services or contact Source II Studio.</p></main></div>`);
await writeFile('dist/404.html', notFound);

