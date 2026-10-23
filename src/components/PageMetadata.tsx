import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { PAGES, SITE_URL } from '../pageMetadata';

export default function PageMetadata() {
  const { pathname } = useLocation();
  useEffect(() => {
    const path = pathname.replace(/\/$/, '') || '/';
    const page = PAGES[path as keyof typeof PAGES];
    if (!page) return;
    document.title = page.title;
    const setMeta = (key: string, value: string, attribute = 'name') => {
      let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attribute, key);
        document.head.appendChild(tag);
      }
      tag.content = value;
    };
    const url = `${SITE_URL}${path === '/' ? '/' : path}`;
    setMeta('description', page.description);
    setMeta('og:title', page.title, 'property');
    setMeta('og:description', page.description, 'property');
    setMeta('og:url', url, 'property');
    setMeta('twitter:title', page.title);
    setMeta('twitter:description', page.description);
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;
  }, [pathname]);
  return null;
}
