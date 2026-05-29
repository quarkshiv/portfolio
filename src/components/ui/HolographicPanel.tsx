'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface HolographicPanelProps {
  children: ReactNode;
  className?: string;
  title?: string;
  delay?: number;
}

export default function HolographicPanel({ children, className = '', title, delay = 0 }: HolographicPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
      whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, delay, ease: 'easeOut' }}
      className={`relative bg-[rgba(10,10,30,0.7)] backdrop-blur-2xl border border-[rgba(0,212,255,0.2)] rounded-xl overflow-hidden ${className}`}
      style={{
        boxShadow: '0 0 40px rgba(0, 212, 255, 0.08), 0 0 80px rgba(139, 92, 246, 0.05)',
      }}
    >
      {/* Top glow line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent opacity-60" />
      
      {/* Holographic scan lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-full h-full" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,212,255,0.015) 2px, rgba(0,212,255,0.015) 4px)',
        }} />
      </div>

      {/* Corner brackets */}
      <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-[rgba(0,212,255,0.4)]" />
      <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-[rgba(0,212,255,0.4)]" />
      <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-[rgba(0,212,255,0.4)]" />
      <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-[rgba(0,212,255,0.4)]" />

      {title && (
        <div className="px-6 pt-4 pb-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#00d4ff] animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#00d4ff]">{title}</span>
          </div>
        </div>
      )}
      
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
