/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './components/Home';
import Portfolio from './components/Portfolio';
import Services from './components/Services';
import About from './components/About';
import Contact from './components/Contact';
import ScrollToTop from './components/ScrollToTop';
import BackgroundElements from './components/BackgroundElements';
import CustomCursor from './components/CustomCursor';
import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => setMenuOpen(false), [location.pathname]);

  return (
    <>
      {/* Floating Glassmorphism Navbar */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-6xl px-5 py-3 flex justify-between items-center rounded-2xl transition-all duration-300 ${
          scrolled
            ? 'bg-studio-bg/75 backdrop-blur-2xl border border-white/20 shadow-[0_8px_32px_rgba(44,36,33,0.10)]'
            : 'bg-studio-bg/55 backdrop-blur-xl border border-studio-ink/8 shadow-[0_4px_24px_rgba(44,36,33,0.06)]'
        }`}
      >
        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-bold tracking-tighter uppercase group text-studio-ink flex items-center shrink-0"
        >
          <span className="group-hover:tracking-widest transition-all duration-500">
            Source <span className="text-studio-accent">II</span> Studio
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`relative px-3.5 py-1.5 text-[15px] font-mono font-bold uppercase tracking-widest transition-colors duration-200 rounded-lg ${
                  isActive
                    ? 'text-studio-accent'
                    : 'text-studio-ink/60 hover:text-studio-accent hover:bg-studio-accent/5'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 bg-studio-accent/8 rounded-lg"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Hire Us CTA + Mobile Toggle */}
        <div className="flex items-center gap-3">
          <Link
            to="/contact"
            className="px-5 py-2 bg-studio-accent text-white text-[11px] font-bold uppercase tracking-wider rounded-xl hover:bg-studio-ink transition-colors duration-300 shadow-[0_2px_12px_rgba(26,147,145,0.25)]"
          >
            Hire Us
          </Link>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden p-2 rounded-lg text-studio-ink/70 hover:text-studio-accent hover:bg-studio-accent/8 transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed top-[5rem] left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-sm bg-studio-bg/90 backdrop-blur-2xl border border-white/20 shadow-[0_16px_48px_rgba(44,36,33,0.12)] rounded-2xl p-4 flex flex-col gap-1"
          >
            {NAV_LINKS.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-4 py-3 text-[15px] font-mono font-bold uppercase tracking-widest rounded-xl transition-colors ${
                    isActive
                      ? 'text-studio-accent bg-studio-accent/8'
                      : 'text-studio-ink/70 hover:text-studio-accent hover:bg-studio-accent/5'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <Router>
      <ScrollToTop />
      <div className="relative min-h-screen bg-studio-bg text-studio-ink selection:bg-studio-accent selection:text-studio-bg lg:cursor-none">
        {/* Global Background Elements */}
        <BackgroundElements />

        {/* Custom Animated Cursor */}
        <CustomCursor />

        {/* Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-0.5 bg-studio-accent z-50 origin-left"
          style={{ scaleX }}
        />

        {/* Floating Glassmorphism Navigation */}
        <Navbar />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
