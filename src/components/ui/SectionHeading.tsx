'use client';

import { motion } from 'framer-motion';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export default function SectionHeading({ title, subtitle, className = '' }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8 }}
      className={`text-center mb-20 ${className}`}
    >
      {/* Decorative label */}
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="inline-block mb-4 px-4 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-[0.25em]"
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          color: 'rgba(0, 212, 255, 0.7)',
          background: 'rgba(0, 212, 255, 0.04)',
          border: '1px solid rgba(0, 212, 255, 0.1)',
        }}
      >
        {title}
      </motion.span>

      {/* Main title */}
      <h2
        className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
        style={{
          fontFamily: "'Inter', sans-serif",
          background: 'linear-gradient(135deg, #f0f0ff 0%, #c0c8e0 40%, #00d4ff 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className="mt-4 text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            color: 'rgba(136, 153, 170, 0.85)',
          }}
        >
          {subtitle}
        </p>
      )}

      {/* Accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mt-8 mx-auto w-16 h-[1px]"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.5), transparent)',
        }}
      />
    </motion.div>
  );
}
