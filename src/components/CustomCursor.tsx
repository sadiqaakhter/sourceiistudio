import React, { useEffect, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'motion/react';

interface Sparkle {
  id: number;
  x: number;
  y: number;
}

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for the cursor
  const springConfig = { damping: 25, stiffness: 250 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const addSparkle = useCallback((x: number, y: number) => {
    const id = Date.now() + Math.random();
    setSparkles(prev => [...prev.slice(-10), { id, x, y }]);
    setTimeout(() => {
      setSparkles(prev => prev.filter(s => s.id !== id));
    }, 1000);
  }, []);

  useEffect(() => {
    let lastX = 0;
    let lastY = 0;

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Add sparkle if moved enough
      const dist = Math.hypot(e.clientX - lastX, e.clientY - lastY);
      if (dist > 30) {
        addSparkle(e.clientX, e.clientY);
        lastX = e.clientX;
        lastY = e.clientY;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('button') || 
        target.closest('a') ||
        window.getComputedStyle(target).cursor === 'pointer'
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isVisible, mouseX, mouseY, addSparkle]);

  if (!isVisible) return null;

  return (
    <>
      {/* Sparkle Trail */}
      <AnimatePresence>
        {sparkles.map(sparkle => (
          <motion.div
            key={sparkle.id}
            initial={{ scale: 0, opacity: 1, rotate: 0 }}
            animate={{ scale: 1.5, opacity: 0, rotate: 180 }}
            exit={{ opacity: 0 }}
            className="fixed top-0 left-0 w-1 h-1 bg-studio-accent rounded-full pointer-events-none z-[9996]"
            style={{
              left: sparkle.x,
              top: sparkle.y,
              translateX: '-50%',
              translateY: '-50%',
            }}
          />
        ))}
      </AnimatePresence>

      {/* Main Cursor Dot */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-studio-accent rounded-full pointer-events-none z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovering ? 2 : 1,
        }}
      />
      
      {/* Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-studio-accent/30 rounded-full pointer-events-none z-[9998]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovering ? 1.2 : 1,
          opacity: isHovering ? 0.4 : 0.2,
        }}
        transition={{ duration: 0.3 }}
      />
    </>
  );
}
