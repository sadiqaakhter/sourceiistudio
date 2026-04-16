import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Sparkles, Cloud, Star, Moon, Sun, Bird, Trees as Tree } from 'lucide-react';

export default function StoryScene() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const cloud1X = useTransform(scrollYProgress, [0, 1], [-100, 200]);
  const cloud2X = useTransform(scrollYProgress, [0, 1], [200, -100]);
  const birdY = useTransform(scrollYProgress, [0, 1], [50, -150]);
  const starRotate = useTransform(scrollYProgress, [0, 1], [0, 720]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section 
      ref={containerRef}
      className="relative py-40 px-6 md:px-12 lg:px-24 bg-studio-ink/[0.02] text-studio-ink overflow-hidden paper-texture"
    >
      {/* Background Elements */}
      <motion.div style={{ x: cloud1X }} className="absolute top-20 left-10 opacity-10">
        <Cloud className="w-32 h-32" />
      </motion.div>
      <motion.div style={{ x: cloud2X }} className="absolute top-60 right-20 opacity-10">
        <Cloud className="w-40 h-40" />
      </motion.div>
      <motion.div style={{ y: birdY }} className="absolute bottom-60 left-1/4 opacity-20">
        <Bird className="w-16 h-16" />
      </motion.div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div 
            style={{ y: textY }}
            className="order-2 lg:order-1"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative"
            >
              <div className="absolute -inset-4 border-2 border-studio-accent/30 hand-drawn-border -rotate-2" />
              <div className="absolute -inset-4 border-2 border-studio-ink/10 hand-drawn-border rotate-1" />
              
              <div className="relative bg-[#FDFBF7] p-4 hand-drawn-border sketch-shadow overflow-hidden aspect-[4/5]">
                <img 
                  src="/images/about/storyscene.jpg"
                  alt="Children's Illustration Style"
                  className="w-full h-full object-cover opacity-90 hover:scale-105 transition-all duration-700"
                />
                
                {/* Floating Magic Elements */}
                <motion.div 
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, 5, 0]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-8 right-8 text-studio-accent"
                >
                  <Sparkles className="w-8 h-8" />
                </motion.div>
                
                <motion.div 
                  style={{ rotate: starRotate }}
                  className="absolute bottom-12 left-8 text-yellow-500/50"
                >
                  <Star className="w-10 h-10 fill-current" />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          <div className="order-1 lg:order-2 space-y-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.2
                  }
                }
              }}
              className="space-y-6"
            >
              <motion.div 
                variants={{
                  hidden: { opacity: 0, x: 20 },
                  visible: { opacity: 1, x: 0 }
                }}
                className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-studio-ink/10 text-xs font-mono uppercase tracking-widest"
              >
                <PenTool className="w-3 h-3" /> The Art of Wonder
              </motion.div>
              
              <motion.h2 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="text-5xl md:text-7xl font-bold tracking-tighter uppercase leading-[0.9]"
              >
                Where Stories <br />
                <span className="text-studio-accent italic font-serif lowercase">Come to Life</span>
              </motion.h2>
              
              <motion.p 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="text-xl text-studio-ink/60 font-serif leading-relaxed italic"
              >
                "Every stroke tells a story, every color holds a dream. We specialize in creating whimsical worlds that capture the imagination of children and the hearts of adults alike."
              </motion.p>
              
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="grid grid-cols-2 gap-8 pt-8"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-studio-accent">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    >
                      <Sun className="w-5 h-5" />
                    </motion.div>
                    <span className="font-bold uppercase tracking-tighter">Vibrant Worlds</span>
                  </div>
                  <p className="text-sm text-studio-ink/60">Lush landscapes and magical settings.</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-studio-accent">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Moon className="w-5 h-5" />
                    </motion.div>
                    <span className="font-bold uppercase tracking-tighter">Dreamy Tales</span>
                  </div>
                  <p className="text-sm text-studio-ink/60">Soft palettes for bedtime stories.</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full flex justify-around opacity-10 pointer-events-none">
        <Tree className="w-20 h-20 -mb-4" />
        <Tree className="w-16 h-16 -mb-2" />
        <Tree className="w-24 h-24 -mb-6" />
        <Tree className="w-12 h-12 -mb-2" />
        <Tree className="w-20 h-20 -mb-4" />
      </div>
    </section>
  );
}

import { PenTool } from 'lucide-react';
