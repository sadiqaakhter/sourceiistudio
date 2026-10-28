type AnalyticsWindow = Window & { gtag?: (...args: unknown[]) => void };

// No visitor-provided fields are sent to Analytics. Tracking must not block delivery.
export function trackAcceptedEnquiry() {
  try {
    (window as AnalyticsWindow).gtag?.('event', 'generate_lead', {
      form_id: 'studio_contact',
      lead_source: 'website_contact_form',
    });
  } catch { /* An unavailable analytics service must not change form success. */ }
}

export function trackStudioEvent(name: string, parameters: Record<string, string> = {}) {
  try {
    (window as AnalyticsWindow).gtag?.('event', name, parameters);
  } catch { /* Measurement must never interrupt a visitor action. */ }
}

// Fixed labels only: never collect email addresses, form text, or URL queries.
export function installStudioClickTracking() {
  const onClick = (event: MouseEvent) => {
    if (!(event.target instanceof Element)) return;
    const anchor = event.target.closest('a');
    if (!anchor) return;
    let url: URL;
    try { url = new URL(anchor.href, window.location.href); } catch { return; }
    if (url.protocol === 'mailto:') {
      trackStudioEvent('contact_click', { contact_method: 'email' });
    } else if (url.origin === window.location.origin && /^\/contact\/?$/.test(url.pathname)) {
      trackStudioEvent('contact_click', { contact_method: 'website_form' });
    } else if (url.origin === window.location.origin && /\.pdf$/i.test(url.pathname)) {
      trackStudioEvent('portfolio_download_click', { portfolio_format: 'pdf' });
    } else if (/(^|\.)amazon\.com$/.test(url.hostname)) {
      trackStudioEvent('book_store_click', { destination: 'amazon' });
    } else if (/(^|\.)behance\.net$/.test(url.hostname)) {
      trackStudioEvent('artwork_profile_click', { destination: 'behance' });
    }
  };
  document.addEventListener('click', onClick);
  return () => document.removeEventListener('click', onClick);
}
