import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) { window.scrollTo(0, 0); return; }
    let id: string;
    try { id = decodeURIComponent(hash.slice(1)); } catch { return; }
    const scroll = () => {
      const target = document.getElementById(id);
      if (!target) return false;
      target.scrollIntoView({ block: 'start', behavior: 'auto' });
      return true;
    };
    // Lazy routes can mount after this effect. Wait only for the linked section.
    const observer = new MutationObserver(() => { if (scroll()) observer.disconnect(); });
    observer.observe(document.getElementById('main-content') || document.body, { childList: true, subtree: true });
    const frame = requestAnimationFrame(() => { if (scroll()) observer.disconnect(); });
    const timer = window.setTimeout(() => observer.disconnect(), 5000);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); clearTimeout(timer); };
  }, [pathname, hash]);
  return null;
}
