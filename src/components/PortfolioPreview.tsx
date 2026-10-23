import { lazy, Suspense, useState } from 'react';
import { PDF_PORTFOLIO_PATH } from '../constants';

const Flipbook = lazy(() => import('./Flipbook'));

export default function PortfolioPreview() {
  const [open, setOpen] = useState(false);
  return <div className="max-w-5xl mx-auto min-h-64 text-center p-6">
    {open ? <Suspense fallback={<p role="status" className="py-16">Loading interactive portfolio…</p>}>
      <Flipbook />
    </Suspense> : <>
      <h3 className="text-2xl font-bold mb-4">Explore our illustration portfolio</h3>
      <p className="text-studio-ink/70 mb-6">View characters, storybook artwork, and publishing examples.</p>
      <button type="button" onClick={() => setOpen(true)} className="px-8 py-4 rounded-xl bg-studio-accent text-white font-bold">
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
