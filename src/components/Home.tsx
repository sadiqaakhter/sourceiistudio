import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import {
  PenTool, Play, Sparkles, Layers, ArrowRight, ExternalLink,
  Mail, Instagram, Youtube, Star, Cloud, Bird,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SOCIAL_LINKS, PAGE_BANNERS } from '../constants';
import Flipbook from './Flipbook';
import StoryScene from './StoryScene';

const STATS = [
  { value: '11+', label: 'Years' },
  { value: '500+', label: 'Books' },
  { value: '3', label: 'Founders' },
  { value: '3', label: 'Continents' },
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <div ref={containerRef} className="flex flex-col w-full overflow-hidden">

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-end pt-28 pb-20 px-6 md:px-12 lg:px-24 overflow-hidden">

        {/* Parallax background */}
        <motion.div
          style={{ y: bgY, scale: bgScale, opacity: bgOpacity }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-studio-bg via-studio-bg/20 to-transparent z-10" />
          <img
            src={PAGE_BANNERS.home}
            className="w-full h-full object-cover opacity-90"
            alt="Source II Studio"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        {/* Floating decorative elements */}
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          {/* Large star — top right */}
          <motion.div
            animate={{ y: [0, -28, 0], rotate: [0, 12, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-24 right-16 text-studio-accent/12"
          >
            <Star className="w-28 h-28 fill-current" />
          </motion.div>

          {/* Small star — mid right */}
          <motion.div
            animate={{ y: [0, -14, 0], rotate: [0, -18, 0], scale: [1, 1.3, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
            className="absolute top-1/3 right-1/3 text-studio-accent/20"
          >
            <Star className="w-8 h-8 fill-current" />
          </motion.div>

          {/* Tiny star — lower left */}
          <motion.div
            animate={{ y: [0, -10, 0], rotate: [0, 25, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 2.5 }}
            className="absolute bottom-1/3 left-12 text-studio-accent/15"
          >
            <Star className="w-5 h-5 fill-current" />
          </motion.div>

          {/* Cloud — bottom left quadrant */}
          <motion.div
            animate={{ y: [0, 18, 0], x: [0, -10, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-1/3 left-1/4 text-studio-ink/5"
          >
            <Cloud className="w-36 h-36" />
          </motion.div>

          {/* Cloud — upper right */}
          <motion.div
            animate={{ y: [0, 12, 0], x: [0, 8, 0] }}
            transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
            className="absolute top-16 right-1/3 text-studio-ink/4"
          >
            <Cloud className="w-20 h-20" />
          </motion.div>

          {/* Bird — left side */}
          <motion.div
            animate={{ y: [0, -22, 0], x: [0, 18, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1.8 }}
            className="absolute top-1/4 left-16 text-studio-accent/8"
          >
            <Bird className="w-16 h-16" />
          </motion.div>

          {/* Sparkle pulse — right side */}
          <motion.div
            animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/2 right-10 text-studio-accent/25"
          >
            <Sparkles className="w-12 h-12" />
          </motion.div>

          {/* Floating dots */}
          <motion.div
            animate={{ y: [0, -28, 0], x: [0, 18, 0] }}
            transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
            className="absolute bottom-1/4 right-1/4 w-5 h-5 rounded-full bg-studio-accent/12"
          />
          <motion.div
            animate={{ y: [0, 18, 0], x: [0, -14, 0] }}
            transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
            className="absolute top-2/3 left-1/3 w-7 h-7 rounded-full bg-studio-ink/6"
          />
          <motion.div
            animate={{ y: [0, -16, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
            className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full bg-studio-accent/20"
          />
        </div>

        {/* Content grid */}
        <div className="relative z-20 w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-16 items-center">

            {/* ── Left: Text ──────────────────────────────────────────── */}
            <div>
              {/* Animated badge */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.7 }}
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-studio-accent/10 border border-studio-accent/20 mb-8"
              >
                <span className="w-2 h-2 rounded-full bg-studio-accent animate-pulse" />
                <span className="text-studio-accent font-mono text-[11px] tracking-widest uppercase">
                  Est. 2015 · Global Digital Studio
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-[clamp(3.5rem,9vw,7.5rem)] font-bold leading-[0.88] tracking-tighter mb-8"
              >
                <motion.span
                  initial={{ opacity: 0, x: -32 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.9, ease: [0.21, 0.47, 0.32, 0.98] }}
                  className="block uppercase"
                >
                  We Craft
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, x: 32 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.9, ease: [0.21, 0.47, 0.32, 0.98] }}
                  className="block text-studio-accent font-serif italic normal-case"
                >
                  Stories
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, x: -32 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7, duration: 0.9, ease: [0.21, 0.47, 0.32, 0.98] }}
                  className="block uppercase"
                >
                  That Move
                </motion.span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65, duration: 0.7 }}
                className="text-lg md:text-xl text-studio-ink/60 max-w-xl font-serif italic mb-10 leading-relaxed"
              >
                Crafting world-class illustrations, animations, and high-tech digital content for
                global visionaries.
              </motion.p>

              {/* CTA buttons */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="flex flex-wrap gap-4 mb-14"
              >
                <Link
                  to="/portfolio"
                  className="px-8 py-4 bg-studio-accent text-white font-bold uppercase tracking-wider hover:bg-studio-ink transition-all duration-300 flex items-center gap-2 rounded-xl shadow-[0_4px_20px_rgba(26,147,145,0.3)]"
                >
                  View Portfolio <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/services"
                  className="px-8 py-4 border border-studio-ink/20 hover:border-studio-accent hover:text-studio-accent transition-all duration-300 uppercase tracking-wider font-bold rounded-xl"
                >
                  Our Services
                </Link>
              </motion.div>

              {/* Stats row */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="flex flex-wrap gap-8 pt-8 border-t border-studio-ink/10"
              >
                {STATS.map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1 + i * 0.07 }}
                    className="flex flex-col"
                  >
                    <span className="text-3xl font-bold text-studio-accent leading-none">
                      {stat.value}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-studio-ink/40 mt-1">
                      {stat.label}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* ── Right: Decorative visual ─────────────────────────────── */}
            <div className="hidden lg:flex items-center justify-center relative h-[480px]">

              {/* Outer slow-rotating ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                className="absolute w-[400px] h-[400px] rounded-full border border-studio-ink/6"
              />

              {/* Middle dashed ring — counter-rotate */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute w-[300px] h-[300px] rounded-full"
                style={{ border: '1.5px dashed rgba(26,147,145,0.18)' }}
              />

              {/* Rotating text ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
                className="absolute w-[400px] h-[400px] flex items-center justify-center"
              >
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path
                    id="ringText"
                    d="M 50,50 m -44,0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0"
                    fill="none"
                  />
                  <text className="font-mono" fontSize="5.2" fill="rgba(44,36,33,0.22)" letterSpacing="1">
                    <textPath href="#ringText">
                      • ILLUSTRATION • ANIMATION • AI CONTENT • PUBLISHING •
                    </textPath>
                  </text>
                </svg>
              </motion.div>

              {/* Centre glow orb */}
              <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="relative w-36 h-36 rounded-full bg-studio-accent/12 flex items-center justify-center border border-studio-accent/25 shadow-[0_0_60px_rgba(26,147,145,0.15)] z-10"
              >
                <Sparkles className="w-16 h-16 text-studio-accent" />
              </motion.div>

              {/* Orbiting service pills */}
              {[
                { label: 'Illustration', angle: -70 },
                { label: 'Animation', angle: 20 },
                { label: 'AI Content', angle: 110 },
                { label: 'Publishing', angle: 200 },
              ].map((item, i) => {
                const rad = (item.angle * Math.PI) / 180;
                const r = 175;
                const cx = Math.cos(rad) * r;
                const cy = Math.sin(rad) * r;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.0 + i * 0.15, type: 'spring', stiffness: 260, damping: 20 }}
                    style={{
                      position: 'absolute',
                      left: `calc(50% + ${cx}px)`,
                      top: `calc(50% + ${cy}px)`,
                      transform: 'translate(-50%, -50%)',
                    }}
                    className="px-3.5 py-1.5 bg-studio-bg/80 backdrop-blur-sm border border-studio-ink/12 rounded-full text-[11px] font-mono uppercase tracking-wider text-studio-ink/55 whitespace-nowrap shadow-sm hover:border-studio-accent/30 hover:text-studio-accent transition-colors duration-300"
                  >
                    {item.label}
                  </motion.div>
                );
              })}

              {/* Small floating accent dots on ring */}
              {[0, 90, 180, 270].map((angle, i) => {
                const rad = (angle * Math.PI) / 180;
                const r = 200;
                return (
                  <motion.div
                    key={i}
                    animate={{ scale: [1, 1.6, 1], opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.75 }}
                    style={{
                      position: 'absolute',
                      left: `calc(50% + ${Math.cos(rad) * r}px - 4px)`,
                      top: `calc(50% + ${Math.sin(rad) * r}px - 4px)`,
                    }}
                    className="w-2 h-2 rounded-full bg-studio-accent/35"
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2 text-studio-ink/30"
          >
            <span className="text-[9px] font-mono uppercase tracking-[0.3em]">Scroll</span>
            <div className="w-px h-8 bg-gradient-to-b from-studio-ink/30 to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* ── Studio Intro ─────────────────────────────────────────────── */}
      <section id="about" className="py-32 px-6 md:px-12 lg:px-24 bg-studio-ink/[0.02] text-studio-ink relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase mb-8">
                A Legacy of <br />
                <span className="text-studio-accent">Creative Excellence</span>
              </h2>
              <p className="text-xl leading-relaxed text-studio-ink/70 font-serif italic mb-8">
                Source II Studio is a high-tech graphics powerhouse built on over 11 years of market
                excellence. We merge traditional artistic mastery with advanced digital workflows to
                deliver world-class content globally.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-4 text-xl font-bold uppercase tracking-tighter hover:text-studio-accent transition-colors group text-studio-ink"
              >
                Meet Our Founders{' '}
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="aspect-video rounded-2xl overflow-hidden border border-studio-ink/10 relative group"
            >
              <img
                src="/images/about/studio-environment - Copy.jpg"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-80"
                alt="Studio Work Environment"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-studio-accent/5 group-hover:bg-transparent transition-colors duration-500" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Story Scene ──────────────────────────────────────────────── */}
      <StoryScene />

      {/* ── Services Preview ─────────────────────────────────────────── */}
      <section id="services" className="py-32 px-6 md:px-12 lg:px-24">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-studio-accent font-mono text-sm tracking-widest uppercase mb-4 block">
              What We Do
            </span>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase">
              Our Expertise
            </h2>
          </motion.div>
          <Link
            to="/services"
            className="text-studio-accent flex items-center gap-2 font-bold uppercase tracking-widest hover:text-studio-ink transition-colors group"
          >
            View All Services{' '}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { title: 'Illustration', icon: PenTool, desc: 'Expertly crafted digital solutions for global brands.' },
            { title: 'Animation', icon: Play, desc: 'Fluid motion graphics and character animation.' },
            { title: 'AI Content', icon: Sparkles, desc: 'Cutting-edge visuals with lifelike detail.' },
            { title: 'Publishing', icon: Layers, desc: 'Expert formatting and setup for Amazon publishing.' },
          ].map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-10 border border-studio-ink/10 hover:border-studio-accent transition-all duration-500 group relative overflow-hidden rounded-2xl bg-studio-bg"
            >
              <div className="absolute inset-0 bg-studio-accent/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <service.icon className="w-12 h-12 text-studio-accent mb-8 group-hover:scale-110 transition-transform duration-500" />
              <h3 className="text-2xl font-bold uppercase mb-4 relative z-10 text-studio-ink">
                {service.title}
              </h3>
              <p className="text-studio-ink/60 text-sm leading-relaxed relative z-10 group-hover:text-studio-ink/80 transition-colors">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Portfolio Preview ─────────────────────────────────────────── */}
      <section className="py-32 px-6 md:px-12 lg:px-24 bg-studio-ink/5 relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-studio-ink/10 to-transparent" />
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-bold tracking-tighter uppercase mb-4"
          >
            The Portfolio
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-studio-accent font-mono text-sm tracking-widest uppercase"
          >
            Interactive Flipbook Experience
          </motion.p>
        </div>

        <Flipbook />

        <div className="flex justify-center mt-12">
          <Link
            to="/portfolio"
            className="group flex items-center gap-4 text-2xl font-bold uppercase tracking-tighter hover:text-studio-accent transition-colors text-studio-ink"
          >
            Explore Full Gallery{' '}
            <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </section>

      {/* ── Footer / Connect ─────────────────────────────────────────── */}
      <footer className="py-32 px-6 md:px-12 lg:px-24 border-t border-studio-ink/10 bg-studio-bg relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-6xl md:text-8xl font-bold tracking-tighter uppercase mb-8 text-studio-ink"
            >
              Let's <br /> <span className="text-studio-accent">Connect</span>
            </motion.h2>
            <div className="space-y-6">
              <Link
                to="/contact"
                className="flex items-center gap-4 text-2xl md:text-3xl font-light hover:text-studio-accent transition-colors group text-studio-ink"
              >
                <Mail className="w-8 h-8 text-studio-accent group-hover:scale-110 transition-transform" />
                Send a Message
              </Link>
              <div className="flex gap-6 pt-8">
                <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="p-4 border border-studio-ink/10 rounded-full hover:bg-studio-accent hover:text-studio-bg hover:scale-110 transition-all">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer" className="p-4 border border-studio-ink/10 rounded-full hover:bg-studio-accent hover:text-studio-bg hover:scale-110 transition-all">
                  <Youtube className="w-6 h-6" />
                </a>
                <a href={SOCIAL_LINKS.amazon} target="_blank" rel="noopener noreferrer" className="p-4 border border-studio-ink/10 rounded-full hover:bg-studio-accent hover:text-studio-bg hover:scale-110 transition-all">
                  <ExternalLink className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-end">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="font-mono text-xs uppercase tracking-[0.3em] text-studio-ink/30 mb-6">Quick Links</h4>
                <ul className="space-y-4 text-lg uppercase tracking-tighter font-bold text-studio-ink">
                  <li><Link to="/" className="hover:text-studio-accent transition-colors">Home</Link></li>
                  <li><Link to="/services" className="hover:text-studio-accent transition-colors">Services</Link></li>
                  <li><Link to="/portfolio" className="hover:text-studio-accent transition-colors">Portfolio</Link></li>
                  <li><Link to="/contact" className="hover:text-studio-accent transition-colors">Contact</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-mono text-xs uppercase tracking-[0.3em] text-studio-ink/30 mb-6">Presence</h4>
                <ul className="space-y-4 text-lg uppercase tracking-tighter font-bold text-studio-ink">
                  <li><a href={SOCIAL_LINKS.upworkAgency} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-studio-accent transition-colors">Upwork Agency <ExternalLink className="w-4 h-4" /></a></li>
                  <li><a href={SOCIAL_LINKS.upworkSadiqa} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-studio-accent transition-colors">Sadiqa Upwork <ExternalLink className="w-4 h-4" /></a></li>
                  <li><a href={SOCIAL_LINKS.upworkSamad} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-studio-accent transition-colors">Samad Upwork <ExternalLink className="w-4 h-4" /></a></li>
                  <li><a href={SOCIAL_LINKS.fiverr} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-studio-accent transition-colors">Fiverr <ExternalLink className="w-4 h-4" /></a></li>
                </ul>
              </div>
            </div>
            <div className="mt-24 pt-8 border-t border-studio-ink/10 flex justify-between items-center text-xs font-mono text-studio-ink/30 uppercase tracking-widest">
              <p>© 2026 Source II Studio</p>
              <p>Built with Passion</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
