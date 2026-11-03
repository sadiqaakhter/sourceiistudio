import { Link } from 'react-router-dom';
export default function BookServiceGuide() {
  return <section className="book-service-guide" aria-labelledby="book-guide-heading">
    <p className="story-eyebrow">For authors, educators & publishers</p><h2 id="book-guide-heading">Children’s book illustration, from character to cover</h2>
    <div className="guide-grid">
      <article id="picture-book-illustration"><h3>Picture book illustration services</h3><p>Bring your manuscript to life with storybook scenes, spot illustrations, and full-page or double-page artwork. Share your reader age, story, page count, and visual references so we can discuss the right direction for your book.</p><Link to="/portfolio/#published-books-heading">View illustrated children’s books →</Link></article>
      <article id="watercolor-character-design"><h3>Watercolor illustration & character design</h3><p>Explore gentle watercolor children’s book illustration and custom character design. From expressions to recurring outfits, discuss how your characters should look and stay consistent across the pages.</p><Link to="/#samples-heading">Explore watercolor and character samples →</Link></article>
      <article id="book-cover-kdp"><h3>Children’s book covers & Amazon KDP formatting</h3><p>Connect your cover illustration with your interior layout. We can discuss trim size, page count, bleed, and print or ebook requirements as part of your illustration and formatting scope.</p><Link to="/contact/">Discuss book cover design and KDP formatting →</Link></article>
    </div>
    <div className="guide-grid">
      <article id="dubai-uae-illustration"><h3>Children’s book illustration for Dubai and UAE authors</h3><p>Looking to hire a children’s book illustrator for a project in Dubai or elsewhere in the UAE? Work remotely with Sadiqa Akhter and Source II Studio on picture book illustrations, character design, book covers, and Amazon KDP formatting.</p><p>For a tailored quote, share your manuscript or sample pages, intended reader age, and whether you need artwork, layout, or both. If your book is bilingual or uses a right-to-left layout, include those requirements in your brief so we can confirm the scope.</p><Link to="/contact/">Request an illustration quote →</Link></article>
    </div>
    <p className="guide-note">Looking to hire a children’s book illustrator for a self-publishing project? <Link to="/about/">Meet Sadiqa and the studio</Link>, then <Link to="/contact/">request a quote for your book</Link>. Pricing and delivery depend on the agreed scope.</p>
  </section>;
}
