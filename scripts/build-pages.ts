// Generate readable HTML and direct-entry pages for the existing React routes.
// All visitors receive the same content; React replaces this fallback when loaded.
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { PAGES, SITE_URL, getPageSchema } from '../src/pageMetadata';
import { SERVICE_CATEGORIES, FOUNDERS, PAGE_BANNERS } from '../src/constants';
import { PUBLISHED_BOOKS, CLIENT_FAQS } from '../src/searchContent';

const escape = (value: string) => value.replace(/[&<>"']/g, char => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[char]!);
const template = await readFile('dist/index.html', 'utf8');
const initialStyles = `<style id="initial-page-styles">
.initial-page{background:#f8f7f4;color:#2c2421;min-height:100vh;font-family:Arial,sans-serif;line-height:1.65}.initial-page *{box-sizing:border-box}.initial-page a{color:#147b79;text-decoration:underline;text-underline-offset:4px}.initial-nav{display:flex;align-items:center;gap:24px;justify-content:space-between;padding:22px 5%;background:#fff;border-bottom:1px solid #e6e2da}.initial-page .initial-brand{font-size:20px;font-weight:800;white-space:nowrap;text-decoration:none;color:#2c2421}.initial-brand span{color:#1a9391}.initial-nav nav{display:flex;flex-wrap:wrap;gap:12px;font-size:12px}.initial-nav nav a{text-decoration:none}.initial-page .initial-button{display:inline-block;background:#168b89;color:white;padding:12px 20px;border-radius:10px;text-decoration:none;font-size:13px;font-weight:bold}.initial-hero{padding:88px 7% 64px;background-size:cover;background-position:center;min-height:390px}.initial-page .initial-eyebrow{text-transform:uppercase;letter-spacing:2px;font-size:12px;color:#147b79}.initial-page h1{font-size:clamp(32px,5vw,64px);font-weight:800;line-height:1.08;max-width:850px;margin:16px 0 24px;letter-spacing:-1.5px}.initial-hero>p:not(.initial-eyebrow){max-width:680px;font-size:18px;margin-bottom:26px}.initial-body{max-width:1200px;margin:auto;padding:56px 6%}.initial-page h2{font-size:28px;line-height:1.25;font-weight:700;margin:0 0 24px}.initial-page h3{font-size:20px;line-height:1.3;font-weight:700;margin:24px 0 12px}.initial-body>section{margin-bottom:48px}.initial-portfolio>section:first-child{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px}.initial-portfolio>section:first-child>h2{grid-column:1/-1}.initial-portfolio article{display:flex;flex-direction:column;padding:24px;border:1px solid #dfded8;border-radius:18px;background:white}.initial-portfolio article h3{order:1;margin-top:20px}.initial-portfolio article img{order:0;width:100%;height:290px;object-fit:contain}.initial-portfolio article p{order:2;font-size:14px;margin:4px 0}.initial-links{border-top:1px solid #dfded8;padding-top:32px}.initial-actions{display:flex;align-items:center;flex-wrap:wrap;gap:20px;margin:24px 0}.initial-page a:focus-visible{outline:3px solid #147b79;outline-offset:5px}@media(max-width:760px){.initial-nav{flex-wrap:wrap;gap:14px;padding:18px 6%}.initial-nav nav{order:3;width:100%;font-size:12px;gap:10px}.initial-nav>.initial-button{margin-left:auto}.initial-hero{padding:52px 6% 44px;min-height:320px}.initial-body{padding-top:36px}.initial-portfolio>section:first-child{grid-template-columns:1fr}.initial-portfolio article img{height:300px}}
</style>`;
const navigation = `<nav aria-label="Main navigation">${Object.entries(PAGES).map(([path, page]) =>
  `<a href="${path === '/' ? '/' : `${path}/`}">${escape(path === '/' ? 'Home' : page.heading)}</a>`).join(' · ')}</nav>`;

for (const [path, page] of Object.entries(PAGES)) {
  const url = `${SITE_URL}${path === '/' ? '/' : `${path}/`}`;
  const structuredData = getPageSchema(path);
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
    <script id="page-structured-data" type="application/ld+json">${JSON.stringify(structuredData).replace(/</g, '\\u003c')}</script>`;
  let details = path === '/services' ? SERVICE_CATEGORIES.map(category =>
    `<section><h2>${escape(category.category)}</h2>${category.items.map(service => `<h3>${escape(service.title)}</h3><p>${escape(service.description)}</p>`).join('')}</section>`).join('')
    : path === '/about' ? FOUNDERS.map(founder => `<section><h2>${escape(founder.name)}</h2><p>${escape(founder.role)}</p><p>${escape(founder.bio)}</p></section>`).join('') : '';
  if (path === '/services') details += `<section><h2>Children’s book illustration: common questions</h2>${CLIENT_FAQS.map(faq => `<h3>${escape(faq.question)}</h3><p>${escape(faq.answer)}</p>`).join('')}</section>`;
  if (path === '/portfolio') details += `<section><h2>Books illustrated by Sadiqa Akhter</h2>${PUBLISHED_BOOKS.map(book => `<article><h3>${escape(book.title)}</h3><img src="${book.image}" alt="${escape(book.title)} cover, illustrated by Sadiqa Akhter" width="240" decoding="async" />${book.author ? `<p>Author: ${escape(book.author)}</p>` : ''}<p>Illustrator: Sadiqa Akhter</p></article>`).join('')}</section>`;
  // Styled, usable content is present before JavaScript starts, including on slow connections.
  const banner = PAGE_BANNERS[path === '/' ? 'home' : path.slice(1) as keyof typeof PAGE_BANNERS];
  const content = `<div id="root"><main class="initial-page">
    <header class="initial-nav"><a class="initial-brand" href="/">SOURCE <span>II</span> STUDIO</a>${navigation}<a class="initial-button" href="/contact/">Hire us</a></header>
    <section class="initial-hero" style="background-image:linear-gradient(90deg,rgba(248,247,244,.97),rgba(248,247,244,.65)),url('${banner}')">
      <p class="initial-eyebrow">Source II Studio · Sadiqa Akhter</p>
      <h1>${escape(page.heading)}</h1><p>${escape(page.summary)}</p>
      <a class="initial-button" href="/contact/">Discuss your book</a>
    </section>
    <div class="initial-body ${path === '/portfolio' ? 'initial-portfolio' : ''}">
      ${details}
      <section class="initial-links"><h2>Explore our work</h2>
        <p>Picture-book illustration · Character design · Book covers · Amazon KDP formatting</p>
        <div class="initial-actions"><a class="initial-button" href="/portfolio/SourceIIStudio_Portfolio.pdf">Download illustration portfolio</a>
        <a href="https://www.behance.net/thesadiqaakhter">View artwork on Behance</a>
        <a href="https://www.amazon.com/author/sadiqaakhter">Books by Sadiqa Akhter</a></div>
        <p><a href="mailto:hello@sourceiistudio.com">hello@sourceiistudio.com</a></p>
      </section>
    </div>
  </main></div>`;
  const html = template.replace(/\s*<meta name="description"[^>]*>/g, '')
    .replace(/<title>[\s\S]*?<\/title>/, head)
    .replace('</head>', `${initialStyles}</head>`)
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

