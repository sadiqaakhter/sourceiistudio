import { PUBLISHED_BOOKS } from './searchContent';
const slugs = ['life-stinks', 'little-leos-dj-dream', 'miles-and-the-grumpy-pants'];
export const BOOK_PROJECTS = PUBLISHED_BOOKS.map((book, i) => ({ ...book, path: `/projects/${slugs[i]}`, focus: ['An expressive children’s book cover with the illustrator’s credit presented alongside the author’s name.', 'A character-led children’s book cover, with Sadiqa Akhter credited as illustrator and Patrick Chow as author.', 'A children’s book cover featuring the illustration credit for Sadiqa Akhter.'][i] }));
export const AUTHOR_GUIDE_PATH = '/guides/childrens-book-illustration';
