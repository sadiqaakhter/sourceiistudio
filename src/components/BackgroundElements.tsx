import React from 'react';
import { motion } from 'motion/react';
import { Star, Sparkles, Cloud } from 'lucide-react';

export default function BackgroundElements() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-20">
      {/* Floating Stars */}
      <motion.div 
        animate={{ 
          y: [0, -40, 0],
          rotate: [0, 45, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[10%] left-[5%] text-studio-accent/40"
      >
        <Star className="w-8 h-8 fill-current" />
      </motion.div>
      
      <motion.div 
        animate={{ 
          y: [0, 40, 0],
          rotate: [0, -45, 0],
          scale: [1, 0.8, 1]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[60%] right-[10%] text-studio-accent/20"
      >
        <Star className="w-6 h-6" />
      </motion.div>

      {/* Floating Sparkles */}
      <motion.div 
        animate={{ 
          opacity: [0.2, 0.8, 0.2],
          scale: [0.8, 1.2, 0.8]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[30%] right-[20%] text-studio-accent/30"
      >
        <Sparkles className="w-12 h-12" />
      </motion.div>

      {/* Floating Clouds */}
      <motion.div 
        animate={{ 
          x: [-20, 20, -20],
          y: [-10, 10, -10]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[20%] left-[15%] text-studio-ink/10"
      >
        <Cloud className="w-32 h-32" />
      </motion.div>

      {/* Subtle Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20" />
    </div>
  );
}
