import { SOCIAL_LINKS } from '../constants';
export default function ReviewLinks() {
 return <section className="studio-review-links"><div><p className="story-eyebrow">Get to know your creative partner</p><h2>Explore our work and client feedback.</h2><p>Browse the studio’s freelance profiles to read client feedback and learn more about past work.</p></div><div><a href={SOCIAL_LINKS.fiverr} target="_blank" rel="noopener noreferrer">Read feedback on Fiverr ↗</a><a href={SOCIAL_LINKS.upworkSadiqa} target="_blank" rel="noopener noreferrer">View Sadiqa’s Upwork profile ↗</a></div></section>;
}
