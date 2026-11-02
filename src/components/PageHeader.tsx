import { Link } from 'react-router-dom';
export default function PageHeader({ title, description, eyebrow = 'Source II Studio' }: { title: string; description: string; eyebrow?: string }) {
  return <header className="studio-page-header"><div><p className="story-eyebrow">{eyebrow}</p><h1>{title}</h1><p className="page-intro">{description}</p><nav aria-label="Page navigation"><Link to="/portfolio/">Explore illustration work</Link><Link to="/contact/">Discuss your book →</Link></nav></div></header>;
}
