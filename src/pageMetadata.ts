import { PUBLISHED_BOOKS } from './searchContent';
export const SITE_URL = 'https://sourceiistudio.com';

export const PAGES = {
  '/': {
    title: "Children's Book Illustrator Sadiqa Akhter | Source II Studio",
    heading: "Children's Book Illustration",
    description: "Work with children's book illustrator Sadiqa Akhter at Source II Studio for picture books, consistent characters, book covers, and Amazon KDP formatting.",
    summary: "Source II Studio is founded by children's book illustrator Sadiqa Akhter. We help authors and publishers worldwide bring picture books to life with expressive characters, story illustrations, book covers, and publishing layouts.",
  },
  '/services': {
    title: "Children's Book Illustration & KDP Formatting | Source II Studio",
    heading: 'Children’s Book Illustration Services',
    description: "Explore children's book illustration, character design, book covers, animation, and Amazon KDP formatting services from Source II Studio.",
    summary: 'Children’s book illustration, character design, book cover design, and Amazon KDP formatting for authors and publishers. Explore creative support from your first sketch to your finished book.',
  },
  '/portfolio': {
    title: "Children's Book Illustration Portfolio | Source II Studio",
    heading: "Children's Book Illustration Portfolio",
    description: "Explore children’s book illustration, watercolor artwork, character design, and published picture books in Sadiqa Akhter’s Source II Studio portfolio.",
    summary: 'Browse our illustration portfolio and creative case studies, or download the studio portfolio to review our artwork.',
  },
  '/about': {
    title: 'About Sadiqa Akhter & the Founders | Source II Studio',
    heading: 'About Source II Studio',
    description: "Meet Sadiqa Akhter, children's book illustrator and founder of Source II Studio, and the team behind our illustration and publishing work.",
    summary: "Source II Studio is founded by children's book illustrator Sadiqa Akhter. Our team supports authors and publishers with character design, picture-book illustrations, covers, and publishing layouts.",
  },
  '/contact': {
    title: "Contact a Children's Book Illustrator | Source II Studio",
    heading: 'Discuss Your Book Project',
    description: 'Hire a children’s book illustrator for your next story. Request a quote from Source II Studio for picture book artwork, character design, covers, and KDP formatting.',
    summary: 'Tell us about your story, intended age group, illustration style, page count, and timeline. Email hello@sourceiistudio.com to discuss your project.',
  },
};

export const STUDIO_SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#studio`,
      name: 'Source II Studio',
      url: `${SITE_URL}/`,
      description: PAGES['/'].summary,
      email: 'hello@sourceiistudio.com',
      founder: { '@id': `${SITE_URL}/#sadiqa-akhter` },
      sameAs: [
        'https://www.behance.net/thesadiqaakhter',
        'https://www.linkedin.com/company/sourceiistudio',
        'https://www.instagram.com/sourceiistudio/',
      ],
    },
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#sadiqa-akhter`,
      name: 'Sadiqa Akhter',
      jobTitle: "Children's Book Illustrator and Creative Director",
      url: 'https://www.sadiqaakhter.com/',
      worksFor: { '@id': `${SITE_URL}/#studio` },
      sameAs: [
        'https://www.behance.net/thesadiqaakhter',
        'https://www.fiverr.com/sadi86',
        'https://www.amazon.com/author/sadiqaakhter',
      ],
    },
  ],
};


export function getPageSchema(path: string) {
  const page = PAGES[path as keyof typeof PAGES];
  if (!page) return null;
  const url = `${SITE_URL}${path === '/' ? '/' : `${path}/`}`;
  const extra: object[] = [];
  if (path !== '/') extra.push({ '@type': 'BreadcrumbList', '@id': `${url}#breadcrumbs`, itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
    { '@type': 'ListItem', position: 2, name: page.heading, item: url },
  ] });
  if (path === '/portfolio') extra.push(...PUBLISHED_BOOKS.map((book, index) => ({
    '@type': 'Book', '@id': `${url}#book-${index + 1}`, name: book.title,
    image: `${SITE_URL}${book.image}`, illustrator: { '@id': `${SITE_URL}/#sadiqa-akhter` },
    ...(book.author ? { author: { '@type': 'Person', name: book.author } } : {}),
  })));
  return { ...STUDIO_SCHEMA, '@graph': [...STUDIO_SCHEMA['@graph'], {
    '@type': 'WebPage', '@id': `${url}#page`, url, name: page.title,
    description: page.description, about: { '@id': `${SITE_URL}/#studio` },
    ...(path !== '/' ? { breadcrumb: { '@id': `${url}#breadcrumbs` } } : {}),
  }, ...extra] };
}
