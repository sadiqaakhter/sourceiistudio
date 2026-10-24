import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import PortfolioPreview from './PortfolioPreview';
import { ArrowLeft, Play, BookOpen, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { VIDEO_PORTFOLIO, CASE_STUDIES, PAGE_BANNERS } from '../constants';

import { PUBLISHED_BOOKS } from '../searchContent';

type Tab = 'flipbook' | 'animation' | 'cases';

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState<Tab>('flipbook');

  return (
    <div className="min-h-screen bg-studio-bg text-studio-ink">
      {/* Banner Section */}
      <section className="relative h-[70vh] flex items-end px-6 md:px-12 lg:px-24 pb-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-studio-bg via-studio-bg/25 to-transparent z-10" />
          <img
            src={PAGE_BANNERS.portfolio}
            fetchPriority="high"
            className="w-full h-full object-cover opacity-90"
            alt="Portfolio Banner"
            referrerPolicy="no-referrer"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="relative z-20 max-w-3xl"
        >
          <span className="text-studio-accent font-mono text-sm tracking-widest uppercase mb-3 block">Our Work</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter uppercase mb-4 leading-none">
            The <span className="text-studio-accent">Portfolio</span>
          </h1>
          <p className="text-base md:text-lg text-studio-ink/75 font-serif italic max-w-xl leading-relaxed">
            A showcase of our world-class illustrations, high-tech animations, and strategic case studies.
          </p>
        </motion.div>
      </section>

      <div className="px-6 md:px-12 lg:px-24">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-studio-ink/50 hover:text-studio-accent transition-colors mb-12 font-mono text-sm uppercase tracking-widest"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

      <section aria-labelledby="published-books-heading" className="mb-20">
        <span className="text-studio-accent font-mono text-xs tracking-widest uppercase">Published Work</span>
        <h2 id="published-books-heading" className="text-3xl md:text-4xl font-bold tracking-tight mt-3 mb-4">Books illustrated by Sadiqa Akhter</h2>
        <p className="text-studio-ink/70 max-w-2xl mb-8">Selected children’s books with Sadiqa Akhter credited as illustrator on the cover.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PUBLISHED_BOOKS.map((book) => (
            <article key={book.title} className="rounded-2xl border border-studio-ink/10 bg-studio-ink/5 p-7">
              <img src={book.image} alt={`${book.title} cover, illustrated by Sadiqa Akhter`} loading="lazy" decoding="async" width="400" height="480" className="w-full h-72 object-contain bg-white rounded-xl mb-5" />
              <h3 className="text-2xl font-bold tracking-tight mb-4">{book.title}</h3>
              {book.author && <p className="text-sm text-studio-ink/70 mb-2">Author: {book.author}</p>}
              <p className="text-sm text-studio-ink/70">Illustrator: Sadiqa Akhter</p>
            </article>
          ))}
        </div>
        <a href="https://www.amazon.com/author/sadiqaakhter" target="_blank" rel="noopener noreferrer" className="inline-flex mt-7 font-bold text-studio-accent underline underline-offset-4">Browse Sadiqa’s books on Amazon</a>
      </section>

      {/* Tabs */}
      <div className="flex flex-wrap gap-4 mb-16 border-b border-studio-ink/10">
        {[
          { id: 'flipbook', label: 'Flipbook', icon: BookOpen },
          { id: 'animation', label: 'Animations', icon: Play },
          { id: 'cases', label: 'Case Studies', icon: Search },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as Tab)}
            className={`flex items-center gap-2 px-8 py-4 font-bold uppercase tracking-widest transition-all relative ${
              activeTab === tab.id ? 'text-studio-accent' : 'text-studio-ink/40 hover:text-studio-ink'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
            {activeTab === tab.id && (
              <motion.div 
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-1 bg-studio-accent"
              />
            )}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'flipbook' && (
          <motion.div
            key="flipbook"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="bg-studio-ink/5 rounded-3xl p-8 md:p-16 mb-24"
          >
            <PortfolioPreview />
          </motion.div>
        )}

        {activeTab === 'animation' && (
          <motion.div
            key="animation"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              },
              exit: { opacity: 0 }
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24"
          >
            {VIDEO_PORTFOLIO.map((vid, i) => (
              <motion.div 
                key={i} 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="group relative aspect-video bg-studio-ink/5 overflow-hidden rounded-2xl cursor-pointer"
              >
                <iframe loading="lazy"
                  className="w-full h-full"
                  src={`https://www.youtube-nocookie.com/embed/${vid.youtubeId}`}
                  title={vid.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-studio-bg/90 backdrop-blur-sm border-t border-studio-ink/10">
                  <h3 className="text-sm font-bold uppercase tracking-tighter">{vid.title}</h3>
                  <p className="text-studio-accent font-mono text-[10px] uppercase tracking-widest">{vid.category}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === 'cases' && (
          <motion.div
            key="cases"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.3
                }
              },
              exit: { opacity: 0 }
            }}
            className="space-y-24 mb-24"
          >
            {CASE_STUDIES.map((study, i) => (
              <motion.div 
                key={i} 
                variants={{
                  hidden: { opacity: 0, x: i % 2 === 0 ? -50 : 50 },
                  visible: { opacity: 1, x: 0 }
                }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
              >
                <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl bg-black">
                    <iframe loading="lazy"
                      className="w-full h-full"
                      src={`https://www.youtube-nocookie.com/embed/${study.youtubeId}`}
                      title={study.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-4xl font-bold uppercase tracking-tighter mb-6">{study.title}</h3>
                  <p className="text-xl text-studio-ink/60 font-serif italic mb-8">{study.description}</p>
                  <div className="space-y-4">
                    <h4 className="font-mono text-xs uppercase tracking-[0.3em] text-studio-accent">The Process</h4>
                    <div className="flex flex-wrap gap-3">
                      {study.steps.map((step, si) => (
                        <span key={si} className="px-4 py-2 bg-studio-ink/5 border border-studio-ink/10 rounded-full text-xs font-mono uppercase tracking-widest">
                          {si + 1}. {step}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  </div>
  );
}

