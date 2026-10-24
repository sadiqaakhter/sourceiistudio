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
    title: "Children's Book Illustration & Publishing Services | Source II Studio",
    heading: 'Illustration & Publishing Services',
    description: "Explore children's book illustration, character design, book covers, animation, and Amazon KDP formatting services from Source II Studio.",
    summary: 'Explore illustration and art, animation and video, and publishing support for authors and publishers.',
  },
  '/portfolio': {
    title: "Children's Book Illustration Portfolio | Source II Studio",
    heading: "Children's Book Illustration Portfolio",
    description: "View Source II Studio's illustration portfolio, character artwork, animation examples, and creative case studies led by Sadiqa Akhter.",
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
    description: 'Contact Source II Studio about picture-book illustrations, character design, covers, and publishing support for your next project.',
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
