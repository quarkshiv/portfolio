'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Star {
  id: number;
  startX: number;
  startY: number;
  angle: number;
}

export default function ShootingStars() {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    let counter = 0;
    const spawn = () => {
      const star: Star = {
        id: counter++,
        startX: Math.random() * 100,
        startY: Math.random() * 40,
        angle: 30 + Math.random() * 30,
      };
      setStars(prev => [...prev, star]);
      setTimeout(() => {
        setStars(prev => prev.filter(s => s.id !== star.id));
      }, 1500);
    };

    const scheduleNext = () => {
      const delay = 8000 + Math.random() * 7000;
      return setTimeout(() => {
        spawn();
        timerId = scheduleNext();
      }, delay);
    };

    // Initial spawn after a short delay
    let timerId = setTimeout(() => {
      spawn();
      timerId = scheduleNext();
    }, 3000);

    return () => clearTimeout(timerId);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      <AnimatePresence>
        {stars.map(star => (
          <motion.div
            key={star.id}
            initial={{
              left: `${star.startX}%`,
              top: `${star.startY}%`,
              opacity: 1,
              scale: 1,
            }}
            animate={{
              left: `${star.startX + 40}%`,
              top: `${star.startY + 30}%`,
              opacity: 0,
              scale: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="absolute"
          >
            <div
              className="w-1 h-1 bg-white rounded-full"
              style={{
                boxShadow: '0 0 6px 2px rgba(255,255,255,0.8), 0 0 20px 5px rgba(0,212,255,0.4)',
              }}
            />
            <div
              className="absolute top-0 right-0 h-[1px] origin-right"
              style={{
                width: '80px',
                background: 'linear-gradient(to left, rgba(255,255,255,0.8), transparent)',
                transform: `rotate(${180 + star.angle}deg)`,
              }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
