import { lazy, Suspense, useState } from 'react';
import { trackStudioEvent } from '../lib/analytics';
import { PDF_PORTFOLIO_PATH } from '../constants';

import { GALLERY_ARTWORK } from '../galleryContent';

const PREVIEW_ARTWORK = [GALLERY_ARTWORK[0], GALLERY_ARTWORK[1], GALLERY_ARTWORK[7]];
const Flipbook = lazy(() => import('./Flipbook'));

export default function PortfolioPreview() {
  const [open, setOpen] = useState(false);
  return <div className="max-w-5xl mx-auto min-h-64 text-center p-6">
    {open ? <Suspense fallback={<p role="status" className="py-16">Loading interactive portfolio…</p>}>
      <Flipbook />
    </Suspense> : <>
      <h3 className="text-2xl font-bold mb-4">Explore our illustration portfolio</h3>
      <p className="text-studio-ink/70 mb-6">Browse these samples on the page, or open the full portfolio below.</p>
      <div className="grid gap-4 sm:grid-cols-3 mb-8">
        {PREVIEW_ARTWORK.map(art => <figure key={art.src} className="rounded-xl bg-white p-3">
          <a href={art.src} target="_blank" rel="noopener noreferrer" aria-label={`Open larger preview: ${art.title}`}>
            <img src={art.src} alt={art.alt} width={art.width} height={art.height} loading="lazy" decoding="async" className="w-full h-40 object-contain" />
          </a>
          <figcaption className="mt-2 text-sm"><strong className="block">{art.category}</strong>{art.title}</figcaption>
        </figure>)}
      </div>
      <button type="button" onClick={() => { trackStudioEvent('portfolio_open', { portfolio_format: 'interactive' }); setOpen(true); }} className="px-8 py-4 rounded-xl bg-studio-accent text-white font-bold">
        Open Interactive Portfolio
      </button>
      <p className="text-sm text-studio-ink/60 mt-4">The full portfolio is a 30 MB PDF. Open it when you’re ready.</p>
    </>}
    <div className="flex flex-wrap gap-6 justify-center mt-6">
      <a href={PDF_PORTFOLIO_PATH} download className="underline">Download PDF</a>
      <a href="https://www.behance.net/thesadiqaakhter" target="_blank" rel="noopener noreferrer" className="underline">Browse artwork on Behance</a>
    </div>
  </div>;
}
