'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  delay?: number;
}

export default function GlassCard({ children, className = '', hover = true, delay = 0 }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
      whileHover={hover ? { 
        scale: 1.02, 
        boxShadow: '0 0 40px rgba(0, 212, 255, 0.2)',
        borderColor: 'rgba(0, 212, 255, 0.3)'
      } : {}}
      className={`relative bg-[rgba(13,17,23,0.6)] backdrop-blur-xl border border-[rgba(0,212,255,0.12)] rounded-2xl overflow-hidden transition-colors duration-300 ${className}`}
      style={{
        boxShadow: '0 0 30px rgba(0, 212, 255, 0.05), inset 0 1px 0 rgba(255,255,255,0.05)',
      }}
    >
      {/* Scan line effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(0,212,255,0.02)] to-transparent animate-scan" />
      </div>
      {children}
    </motion.div>
  );
}
