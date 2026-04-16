import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { motion } from 'motion/react';
import { PORTFOLIO_PAGES, PDF_PORTFOLIO_PATH } from '../constants';
import { ChevronLeft, ChevronRight, Loader2, Download, ExternalLink } from 'lucide-react';
import { Document, Page as PdfPage, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

if (typeof window !== 'undefined') {
  try {
    pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
  } catch (e) {
    console.error('Failed to set PDF worker source:', e);
  }
}

// A single page wrapper — must forward ref for react-pageflip
const Page = React.forwardRef<
  HTMLDivElement,
  { children: React.ReactNode; number: number }
>((props, ref) => (
  <div
    ref={ref}
    className="overflow-hidden"
    style={{ background: '#fff' }}
  >
    <div className="relative w-full h-full">
      {props.children}
      <div className="absolute bottom-3 right-3 text-studio-ink/40 text-[10px] font-mono bg-white/80 px-2 py-0.5 rounded backdrop-blur-sm border border-studio-ink/5 z-10">
        {props.number}
      </div>
    </div>
  </div>
));
Page.displayName = 'Page';

export default function Flipbook() {
  const bookRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [numPages, setNumPages] = useState<number | null>(null);
  const [pdfError, setPdfError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Measured page dimensions — updated on every resize
  const [pageWidth, setPageWidth] = useState(480);
  const [pageHeight, setPageHeight] = useState(640);

  // Measure container and compute per-page size
  useLayoutEffect(() => {
    const measure = () => {
      if (!containerRef.current) return;
      const totalW = containerRef.current.offsetWidth;
      // Two pages side-by-side → each page gets half the width (minus 2px gutter)
      const pw = Math.max(260, Math.floor(totalW / 2) - 2);
      // A4-ish aspect ratio (height ≈ 1.38× width)
      const ph = Math.round(pw * 1.38);
      setPageWidth(pw);
      setPageHeight(ph);
    };

    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  // Check PDF availability
  useEffect(() => {
    async function checkPdf() {
      try {
        const res = await fetch(PDF_PORTFOLIO_PATH, { method: 'HEAD' });
        if (!res.ok) {
          setPdfError(`PDF not found (${res.status})`);
          setIsLoading(false);
        }
      } catch {
        // network error — let Document try anyway
      }
    }
    checkPdf();
  }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setIsLoading(false);
    setPdfError(null);
  }

  function onDocumentLoadError(error: Error) {
    setPdfError(error.message || 'Failed to load PDF');
    setIsLoading(false);
  }

  // Shared flipbook props
  const flipbookProps = {
    width: pageWidth,
    height: pageHeight,
    size: 'stretch' as const,
    minWidth: 260,
    maxWidth: 800,
    minHeight: 360,
    maxHeight: 1100,
    maxShadowOpacity: 0.4,
    showCover: true,
    mobileScrollSupport: true,
    usePortrait: false,
    startPage: 0,
    drawShadow: true,
    flippingTime: 900,
    useMouseEvents: true,
    clickEventForward: true,
    swipeDistance: 30,
    showPageCorners: true,
    disableFlipByClick: false,
    startZIndex: 0,
    autoSize: true,
    ref: bookRef,
    className: 'mx-auto',
    style: {},
  };

  return (
    <div className="flex flex-col items-center w-full py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        ref={containerRef}
        className="relative w-full max-w-5xl"
      >
        {/* Loading spinner */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center h-[500px] text-studio-ink/50">
            <Loader2 className="w-12 h-12 animate-spin mb-4 text-studio-accent" />
            <p className="font-mono text-sm uppercase tracking-widest">Loading Portfolio…</p>
          </div>
        )}

        {!pdfError ? (
          <Document
            file={PDF_PORTFOLIO_PATH}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={null}
          >
            {numPages && (
              <HTMLFlipBook {...flipbookProps}>
                {Array.from({ length: numPages }, (_, i) => (
                  <Page key={`page_${i + 1}`} number={i + 1}>
                    <PdfPage
                      pageNumber={i + 1}
                      width={pageWidth}
                      renderAnnotationLayer={false}
                      renderTextLayer={false}
                      // Override react-pdf's canvas/wrapper styles so it fills the page
                      canvasBackground="white"
                      className="!w-full !h-full"
                    />
                  </Page>
                ))}
              </HTMLFlipBook>
            )}
          </Document>
        ) : (
          /* Fallback: image pages */
          <div>
            {pdfError && (
              <div className="bg-red-500/10 border border-red-500/20 p-5 rounded-2xl text-center mb-6">
                <p className="text-red-400 font-mono text-xs uppercase tracking-widest mb-1">
                  Portfolio Notice
                </p>
                <p className="text-studio-ink/50 text-xs">{pdfError}</p>
              </div>
            )}
            <HTMLFlipBook {...flipbookProps}>
              {PORTFOLIO_PAGES.map((url, i) => (
                <Page key={i} number={i + 1}>
                  <img
                    src={url}
                    alt={`Portfolio Page ${i + 1}`}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </Page>
              ))}
            </HTMLFlipBook>
          </div>
        )}
      </motion.div>

      {/* Controls */}
      {!isLoading && (
        <>
          <div className="flex justify-center gap-6 mt-10">
            <button
              onClick={() => bookRef.current?.pageFlip().flipPrev()}
              className="p-4 rounded-full border border-studio-ink/20 hover:bg-studio-accent hover:text-white hover:border-studio-accent transition-all group"
            >
              <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </button>
            <button
              onClick={() => bookRef.current?.pageFlip().flipNext()}
              className="p-4 rounded-full border border-studio-ink/20 hover:bg-studio-accent hover:text-white hover:border-studio-accent transition-all group"
            >
              <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </button>
          </div>

          <div className="flex gap-4 mt-6">
            <a
              href={PDF_PORTFOLIO_PATH}
              download
              className="flex items-center gap-2 px-6 py-3 bg-studio-ink/5 border border-studio-ink/10 rounded-full text-xs font-mono uppercase tracking-widest hover:bg-studio-accent hover:text-white hover:border-studio-accent transition-all"
            >
              <Download className="w-4 h-4" /> Download PDF
            </a>
            <a
              href={PDF_PORTFOLIO_PATH}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-studio-ink/5 border border-studio-ink/10 rounded-full text-xs font-mono uppercase tracking-widest hover:bg-studio-ink/10 transition-all"
            >
              <ExternalLink className="w-4 h-4" /> Open PDF
            </a>
          </div>

          <p className="mt-6 text-studio-ink/30 text-[10px] uppercase tracking-[0.3em] font-mono">
            Click or drag corners to flip · {numPages ?? PORTFOLIO_PAGES.length} pages
          </p>
        </>
      )}
    </div>
  );
}
