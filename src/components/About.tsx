import { FOUNDERS } from '../constants';
import { PAGES } from '../pageMetadata';
import { Link } from 'react-router-dom';
import PageHeader from './PageHeader';
import ReviewLinks from './ReviewLinks';
export default function About() {
 return <div className="studio-inner"><PageHeader title="Meet Sadiqa Akhter & the studio" description={PAGES['/about'].summary} eyebrow="The people behind the pages" />
 <section className="founder-grid">{FOUNDERS.map(founder=><article key={founder.name}><img src={founder.image} alt={founder.name} width={400} height={480} loading="lazy" decoding="async" /><p className="story-eyebrow">{founder.role}</p><h2>{founder.name}</h2><p>{founder.bio}</p></article>)}</section>
 <section className="studio-reading"><h2>A thoughtful partnership for your book</h2><p>We work remotely with authors and publishers on character design, picture book illustrations, book covers, and publishing layouts. We start by discussing your story and readers, then agree a scope and feedback process that fits your project.</p><p>Explore <Link to="/portfolio/">Sadiqa’s illustration portfolio</Link>, read our <Link to="/guides/childrens-book-illustration/">guide for authors</Link>, or <Link to="/contact/">tell us about your next book</Link>.</p></section><ReviewLinks /></div>;
}
