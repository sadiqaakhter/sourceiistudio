# Source II Studio search readiness

Checked 23 October 2026. These changes support discovery; they do not guarantee search rankings or AI recommendations.

| Checklist item | Status |
| --- | --- |
| Remove noindex | Five published pages permit indexing. The actual 404 page deliberately uses noindex. |
| Google Search Console | Owner verification tag retained. Owner screenshots show the verified site. |
| Submit sitemap | Owner screenshot confirms Success and five discovered pages. Sitemap now uses the final trailing-slash URLs. |
| Request homepage indexing | Owner screenshot confirms the homepage is already indexed. A new crawl request can be made in Search Console after updates. |
| Bing Webmaster Tools | Pending account connection. Import sourceiistudio.com from the verified Google Search Console account at https://www.bing.com/webmasters/. |
| Google Analytics | Pending the owner's GA4 web-stream measurement ID, in the form G-XXXXXXXXXX. No tracking code has been installed without a real account ID. |
| Google Business Profile | Create only if the studio qualifies through real in-person customer contact. Online-only businesses are not eligible. |
| HTTPS | Existing production website is served over HTTPS. |
| Unique page titles | Each of the five routes has a unique title, description, canonical URL, and sharing metadata. |
| Page speed | Initial JavaScript reduced from about 1.81 MB to 0.42 MB. Portfolio PDF loads only after a click. Large hero/about images compressed, off-screen media deferred. PageSpeed API score unavailable due to API quota. |
| ChatGPT search crawling | robots.txt allows OAI-SearchBot and lists the sitemap. Crawling eligibility does not guarantee recommendations. |

## Other improvements

- Corrected four image filename errors and removed 38 references to sample files absent from the repository. Every service retains available samples.
- Added page-specific readable HTML, structured data, consistent final URLs, keyboard skip link, focus indicators, and a favicon.
- Split route code and eliminated the full icon-library import from the services page.
- Added a proper 404 document and page rather than a blank application view.
- Existing Google verification token, portfolio originals, book data, and contact email preserved.

## Still needed from the owner

- GA4 measurement ID to connect visitor analytics.
- Bing import through the owner's Google account, or a Bing verification meta tag for installation.
- Verified Formspree form endpoint to enable direct submissions. The current contact page honestly opens an email draft; visitors must send it in their email app.

## Validation

Production build and TypeScript checks pass. Generated HTML checks cover all five route titles, descriptions, canonicals, JSON-LD, indexability, and the retained Google verification token. Asset checks cover service sample paths, optimized images, favicon, sitemap, and noindex on 404. Portfolio preview is rendered without mounting the PDF viewer until requested. An actual browser performance score and inbox-delivery test have not been completed.
