import { useLocation, Link } from 'react-router-dom';
import { BookOpen, Palette, Users, Layers, ArrowRight } from 'lucide-react';

const TOPICS = [
  { title: 'Picture book illustration', text: 'Explore story illustrations for self-publishing authors and publishers.', href: '/services/#picture-book-illustration', icon: BookOpen },
  { title: 'Watercolor illustration & characters', text: 'See soft watercolor artwork, expressive children, and character development samples.', href: '/#samples-heading', icon: Palette },
  { title: 'Children’s book illustration portfolio', text: 'Browse published books with Sadiqa Akhter credited as illustrator.', href: '/portfolio/#published-books-heading', icon: Users },
  { title: 'Book covers & Amazon KDP formatting', text: 'Find cover design and interior layout support for your chosen book format.', href: '/services/#book-cover-kdp', icon: Layers },
];
export default function ExploreStudio() {
  const { pathname } = useLocation();
  if (!(pathname === '/' || /^\/(services|portfolio|about|contact|projects|guides)(\/|$)/.test(pathname))) return null;
  return <section className="explore-studio" aria-labelledby="explore-studio-heading">
    <div className="explore-heading"><div><p className="story-eyebrow">Find the right creative support</p><h2 id="explore-studio-heading">Explore your book’s possibilities.</h2></div><p>Follow your story from illustration inspiration to a project conversation.</p></div>
    <nav className="explore-grid" aria-label="Illustration services and related artwork">{TOPICS.map(({title,text,href,icon: Icon})=><Link to={href} key={title}><Icon size={25} aria-hidden="true" /><h3>{title}</h3><p>{text}</p><span>Explore <ArrowRight size={16} aria-hidden="true" /></span></Link>)}</nav>
    <p className="explore-next">Meet <Link to="/about/">children’s book illustrator Sadiqa Akhter</Link>, or <Link to="/contact/">request an illustration quote</Link> with your story, page count, and preferred style. Read our <Link to="/guides/childrens-book-illustration/">illustration guide for authors</Link> before you begin.</p>
  </section>;
}
