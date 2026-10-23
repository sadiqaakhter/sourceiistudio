export const CONTACT_EMAIL = 'hello@sourceiistudio.com';

// Studio-owned endpoint explicitly confirmed by the owner.
export const CONTACT_FORM_ENDPOINT: string = 'https://formspree.io/f/mnjlqzjk';

export type ContactFields = { name: string; email: string; subject: string; message: string };

export function emailDraftUrl(fields: ContactFields) {
  const body = `Name: ${fields.name}\nReply email: ${fields.email}\n\n${fields.message}`;
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(fields.subject)}&body=${encodeURIComponent(body)}`;
}

export async function submitContact(endpoint: string, fields: ContactFields, request: typeof fetch = fetch) {
  const url = new URL(endpoint);
  if (url.origin !== 'https://formspree.io' || !/^\/f\/[a-zA-Z0-9]+$/.test(url.pathname)) {
    throw new Error('Please email us directly while the contact form is being connected.');
  }
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);
  try {
    const response = await request(url.href, {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(fields),
      signal: controller.signal,
    });
    if (response.status === 429) {
      throw new Error('Too many requests. Please wait a few minutes, or email us directly.');
    }
    const result = await response.json().catch(() => null);
    if (!response.ok || result?.ok !== true) {
      throw new Error('Your message was not confirmed. Please try again or email us directly.');
    }
  } finally {
    clearTimeout(timeout);
  }
}
