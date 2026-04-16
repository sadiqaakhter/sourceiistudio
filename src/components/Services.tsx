import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SERVICE_CATEGORIES, PAGE_BANNERS, Service } from '../constants';
import * as Icons from 'lucide-react';
import { Link } from 'react-router-dom';
import { ArrowRight, X, ChevronLeft, ChevronRight } from 'lucide-react';

const CATEGORY_COLORS: Record<string, string> = {
  'Illustration & Art': 'from-amber-500/10 to-studio-accent/5',
  'Animation & Video': 'from-studio-accent/10 to-emerald-500/5',
  'Publishing & Digital': 'from-blue-500/10 to-studio-accent/5',
};

const CATEGORY_ACCENT: Record<string, string> = {
  'Illustration & Art': '#f59e0b',
  'Animation & Video': '#1a9391',
  'Publishing & Digital': '#3b82f6',
};

// ── Expanded overlay ──────────────────────────────────────────────────────────
function ServiceModal({
  item,
  accent,
  cardId,
  onClose,
}: {
  item: Service;
  accent: string;
  cardId: string;
  onClose: () => void;
}) {
  const [imgIndex, setImgIndex] = useState(0);
  const images = item.images ?? [];
  const IconComponent = (Icons as any)[item.icon] || Icons.HelpCircle;

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  // Prevent body scroll while open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 bg-studio-ink/50 backdrop-blur-sm z-50"
        onClick={onClose}
      />

      {/* Expanded card */}
      <motion.div
        layoutId={cardId}
        className="fixed inset-4 md:inset-10 lg:inset-16 z-50 rounded-3xl bg-studio-bg overflow-hidden flex flex-col md:flex-row shadow-[0_32px_80px_rgba(0,0,0,0.25)]"
        transition={{ type: 'spring', stiffness: 280, damping: 30 }}
      >
        {/* Left — image viewer */}
        <div className="relative w-full md:w-[55%] bg-studio-ink/5 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            {images.length > 0 ? (
              <motion.img
                key={imgIndex}
                src={images[imgIndex]}
                alt={`${item.title} ${imgIndex + 1}`}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35 }}
                className="w-full h-full object-cover"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-center w-full h-full min-h-[280px]"
              >
                <IconComponent className="w-24 h-24 opacity-10" style={{ color: accent }} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Image nav arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); setImgIndex((i) => (i - 1 + images.length) % images.length); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow hover:bg-white transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-studio-ink" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setImgIndex((i) => (i + 1) % images.length); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow hover:bg-white transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-studio-ink" />
              </button>

              {/* Dot indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.stopPropagation(); setImgIndex(i); }}
                    className="w-2 h-2 rounded-full transition-all duration-200"
                    style={{ backgroundColor: i === imgIndex ? accent : `${accent}40` }}
                  />
                ))}
              </div>
            </>
          )}

          {/* Thumbnail strip */}
          {images.length > 1 && (
            <div className="absolute bottom-12 left-0 right-0 px-4 flex gap-2 justify-center">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setImgIndex(i); }}
                  className={`w-14 h-10 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    i === imgIndex ? 'scale-110' : 'opacity-60 hover:opacity-100'
                  }`}
                  style={{ borderColor: i === imgIndex ? accent : 'transparent' }}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right — info */}
        <div className="flex flex-col justify-between p-8 md:p-10 w-full md:w-[45%] overflow-y-auto">
          <div>
            {/* Icon + close */}
            <div className="flex items-start justify-between mb-6">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${accent}18` }}
              >
                <IconComponent className="w-7 h-7" style={{ color: accent }} />
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-studio-ink/8 flex items-center justify-center hover:bg-studio-ink/15 transition-colors"
              >
                <X className="w-4 h-4 text-studio-ink" />
              </button>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tighter mb-4 text-studio-ink">
              {item.title}
            </h2>
            <p className="text-studio-ink/60 leading-relaxed font-serif italic text-lg mb-8">
              {item.description}
            </p>

            {/* Accent divider */}
            <div className="h-px w-full mb-8" style={{ background: `linear-gradient(to right, ${accent}60, transparent)` }} />

            <p className="text-xs font-mono uppercase tracking-widest text-studio-ink/30 mb-3">
              What we deliver
            </p>
            <ul className="space-y-2 mb-8">
              {[
                'Custom concepts tailored to your vision',
                'Multiple revision rounds included',
                'High-resolution final files',
                'Commercial usage rights',
              ].map((point, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-studio-ink/70">
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: accent }} />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-3 flex-wrap">
            <Link
              to="/contact"
              onClick={onClose}
              className="px-7 py-3 text-white font-bold uppercase tracking-wider rounded-xl text-sm flex items-center gap-2 transition-all duration-300 hover:opacity-90"
              style={{ backgroundColor: accent }}
            >
              Get a Quote <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              onClick={onClose}
              className="px-7 py-3 border border-studio-ink/15 rounded-xl text-sm font-bold uppercase tracking-wider hover:border-studio-ink/30 transition-colors text-studio-ink/60"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function Services() {
  const [selected, setSelected] = useState<{
    item: Service;
    accent: string;
    cardId: string;
  } | null>(null);

  return (
    <div className="min-h-screen bg-studio-bg text-studio-ink">

      {/* ── Banner ──────────────────────────────────────────────────── */}
      <section className="relative h-[70vh] flex items-end px-6 md:px-12 lg:px-24 pb-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-studio-bg via-studio-bg/25 to-transparent z-10" />
          <img
            src={PAGE_BANNERS.services}
            className="w-full h-full object-cover opacity-90"
            alt="Services Banner"
            referrerPolicy="no-referrer"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="relative z-20 max-w-3xl"
        >
          <span className="text-studio-accent font-mono text-sm tracking-widest uppercase mb-3 block">
            Our Expertise
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter uppercase mb-4 leading-none">
            Our <span className="text-studio-accent">Services</span>
          </h1>
          <p className="text-base md:text-lg text-studio-ink/75 font-serif italic max-w-xl leading-relaxed">
            From traditional children's book illustrations to hyper-realistic 3D animations and
            technical publishing guides — a comprehensive suite of digital studio services.
          </p>
        </motion.div>
      </section>

      {/* ── Service Categories ──────────────────────────────────────── */}
      <div className="px-6 md:px-12 lg:px-24 space-y-28 pb-32 pt-8">
        {SERVICE_CATEGORIES.map((category, catIndex) => (
          <motion.section
            key={catIndex}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            {/* Category header */}
            <div className="flex items-center gap-4 mb-12">
              <div
                className="flex items-center gap-3 px-5 py-2 rounded-full border text-sm font-mono uppercase tracking-widest"
                style={{
                  backgroundColor: `${CATEGORY_ACCENT[category.category]}15`,
                  borderColor: `${CATEGORY_ACCENT[category.category]}30`,
                  color: CATEGORY_ACCENT[category.category],
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: CATEGORY_ACCENT[category.category] }} />
                {category.category}
              </div>
              <div className="h-px flex-1 bg-studio-ink/8" />
              <span className="text-xs font-mono text-studio-ink/30 uppercase tracking-widest">
                {category.items.length} services
              </span>
            </div>

            {/* Cards grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.items.map((item, itemIndex) => {
                const IconComponent = (Icons as any)[item.icon] || Icons.HelpCircle;
                const accent = CATEGORY_ACCENT[category.category];
                const cardId = `card-${catIndex}-${itemIndex}`;
                const hasImages = item.images && item.images.length > 0;

                return (
                  <motion.div
                    key={itemIndex}
                    layoutId={cardId}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.65, delay: itemIndex * 0.07 }}
                    whileHover={{ y: -4 }}
                    onClick={() => setSelected({ item, accent, cardId })}
                    className={`group relative bg-gradient-to-br cursor-pointer ${
                      CATEGORY_COLORS[category.category] ?? 'from-studio-accent/5 to-transparent'
                    } border border-studio-ink/8 rounded-2xl p-8 overflow-hidden transition-all duration-300 hover:border-studio-accent/30 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]`}
                  >
                    {/* Top accent bar on hover */}
                    <div
                      className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: `linear-gradient(to right, transparent, ${accent}80, transparent)` }}
                    />

                    {/* Icon */}
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
                      style={{ backgroundColor: `${accent}18` }}
                    >
                      <IconComponent className="w-7 h-7" style={{ color: accent }} />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold uppercase tracking-tight mb-3 transition-colors duration-300 group-hover:text-studio-accent text-studio-ink">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-studio-ink/55 text-sm leading-relaxed font-serif italic mb-6">
                      {item.description}
                    </p>

                    {/* Footer row */}
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-[11px] font-mono uppercase tracking-widest text-studio-ink/30 group-hover:text-studio-accent transition-colors flex items-center gap-1.5">
                        View samples
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </span>
                      {hasImages && (
                        <div className="flex -space-x-2">
                          {item.images!.slice(0, 2).map((img, i) => (
                            <div key={i} className="w-8 h-8 rounded-full overflow-hidden border-2 border-studio-bg">
                              <img
                                src={img}
                                alt=""
                                className="w-full h-full object-cover"
                                onError={(e) => { (e.target as HTMLImageElement).parentElement!.style.display = 'none'; }}
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>
        ))}
      </div>

      {/* ── Expanded modal ──────────────────────────────────────────── */}
      <AnimatePresence>
        {selected && (
          <ServiceModal
            item={selected.item}
            accent={selected.accent}
            cardId={selected.cardId}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>

      {/* ── Bottom CTA ──────────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-12 lg:px-24 border-t border-studio-ink/8 bg-studio-ink/[0.02]">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold tracking-tighter uppercase mb-6"
          >
            Ready to <span className="text-studio-accent">Start</span>?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-studio-ink/60 font-serif italic mb-10"
          >
            Tell us about your project and we'll craft something extraordinary together.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Link
              to="/contact"
              className="px-8 py-4 bg-studio-accent text-white font-bold uppercase tracking-wider hover:bg-studio-ink transition-all duration-300 flex items-center gap-2 rounded-xl shadow-[0_4px_20px_rgba(26,147,145,0.25)]"
            >
              Hire Us <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/portfolio"
              className="px-8 py-4 border border-studio-ink/20 hover:border-studio-accent hover:text-studio-accent transition-all duration-300 uppercase tracking-wider font-bold rounded-xl"
            >
              View Our Work
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
