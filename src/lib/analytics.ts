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
