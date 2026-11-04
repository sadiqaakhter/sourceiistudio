import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { GALLERY_ARTWORK } from '../galleryContent';

export default function CinematicHero() {
  const ring = useRef<HTMLDivElement>(null);
  const scene = useRef<HTMLDivElement>(null);
  const angle = useRef(-18);
  const dragging = useRef(false);
  const dragStart = useRef({x: 0, angle: 0});
  const stopped = useRef(false);
  const [paused, setPaused] = useState(false);
  const [slots, setSlots] = useState(() => GALLERY_ARTWORK.slice(0, 8));
  useEffect(() => { stopped.current = paused; }, [paused]);
  useEffect(() => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    if (reduced.matches) { stopped.current = true; setPaused(true); }
    const onReduced = () => { if (reduced.matches) { stopped.current = true; setPaused(true); } };
    reduced.addEventListener('change', onReduced);
    let frame = 0, last = 0, visible = true, nextImage = 8;
    const changed = Array(8).fill(false);
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    if (scene.current) observer.observe(scene.current);
    const tick = (time: number) => {
      const dt = last ? Math.min(time - last, 60) : 0;
      last = time;
      if (!stopped.current && !dragging.current && !document.hidden && visible) {
        angle.current -= dt * .007;
        for (let i = 0; i < 8; i++) {
          const phase = ((i * 45 + angle.current) % 360 + 360) % 360;
          // Replace artwork only on the rear of the ring; keep the approved geometry.
          if (phase > 170 && phase < 190 && !changed[i]) {
            changed[i] = true;
            const artwork = GALLERY_ARTWORK[nextImage++ % GALLERY_ARTWORK.length];
            setSlots(previous => previous.map((item, slot) => slot === i ? artwork : item));
          }
          if (phase < 90 || phase > 270) changed[i] = false;
        }
      }
      if (ring.current) ring.current.style.transform = `rotateY(${angle.current}deg)`;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); reduced.removeEventListener('change', onReduced); };
  }, []);
  return <>
    <section className="cinema-hero" aria-labelledby="cinema-title">
      <div className="cinema-top"><p className="eyebrow">Sadiqa Akhter / Illustration &amp; book design</p><span className="edition">A world of imagination. In motion.</span></div>
      <div className="cinema-copy"><h1 id="cinema-title">Small stories.<br /><em>Big wonder.</em></h1><p>Children’s book illustration with character.<br />Work with Sadiqa Akhter and Source II Studio.</p><div className="hero-tags"><span>Picture books</span><span>Character design</span><span>Beautiful covers</span></div></div>
      <span className="hero-spark" aria-hidden="true">✳<small>✦</small></span>
      <div className="cinema-scene" ref={scene} aria-label="Rotating gallery of illustration and book design" onPointerDown={event => { dragging.current = true; stopped.current = true; setPaused(true); dragStart.current = {x: event.clientX, angle: angle.current}; event.currentTarget.setPointerCapture(event.pointerId); }} onPointerMove={event => { if (dragging.current) angle.current = dragStart.current.angle + (event.clientX - dragStart.current.x) * .22; }} onPointerUp={() => { dragging.current = false; }} onPointerCancel={() => { dragging.current = false; }}>
        <div className="camera"><div className="art-ring" ref={ring} style={{transform: 'rotateY(-18deg)'}}>{slots.map((art, index) => <figure className="cinema-card" key={index} style={{'--i': index} as CSSProperties}><div className="card-face"><img src={art.src} alt={art.alt} width={art.width} height={art.height} decoding="async" fetchPriority={index === 0 ? 'high' : 'auto'} /><figcaption><span>{String(index + 1).padStart(2, '0')}</span><span>{art.alt}</span><span aria-hidden="true">↗</span></figcaption></div><div className="card-back" aria-hidden="true">Source II<br /><em>Studio</em></div></figure>)}</div></div><div className="stage-shadow" />
      </div>
      <div className="cinema-bottom"><Link to="/portfolio/" className="cinema-cta">Explore the artwork <span aria-hidden="true">↗</span></Link><div className="cinema-controls"><span className="live-indicator" aria-hidden="true" /><span aria-live="polite">{paused ? 'Gallery paused' : 'Gallery in motion'}</span><button type="button" aria-label={paused ? 'Play gallery rotation' : 'Pause gallery rotation'} aria-pressed={paused} onClick={() => setPaused(value => !value)}>{paused ? 'Play ▶' : 'Pause Ⅱ'}</button></div><Link to="/contact/" className="under">Let’s make your book ↗</Link></div>
      <span className="floating-word" aria-hidden="true">IMAGINE.</span>
    </section>
    <div className="cinema-proof"><span><b>11+</b>years creating</span><span><b>500+</b>children’s books developed</span><span>For authors &amp; publishers worldwide ↗</span></div>
    <details className="gallery-all"><summary>Explore all 15 new illustration &amp; book design samples</summary><div className="gallery-all-grid">{GALLERY_ARTWORK.map(art => <figure key={art.src}><img src={art.src} alt={art.alt} width={art.width} height={art.height} loading="lazy" decoding="async" /><figcaption>{art.alt}</figcaption></figure>)}</div></details>
  </>;
}
