'use client';

import { motion } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import { timeline } from '@/lib/data';

function TimelinePlanet({ item, index }: { item: typeof timeline[0]; index: number }) {
  const isLeft = index % 2 === 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className={`relative flex items-center gap-8 mb-16 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col md:flex-row`}
    >
      {/* Content */}
      <div className={`flex-1 ${isLeft ? 'md:text-right' : 'md:text-left'} text-center`}>
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="relative bg-[rgba(13,17,23,0.6)] backdrop-blur-xl border border-[rgba(0,212,255,0.12)] rounded-2xl p-6 group cursor-pointer"
          style={{ boxShadow: `0 0 30px ${item.color}15` }}
        >
          {/* Top glow line */}
          <div className="absolute top-0 left-0 right-0 h-[1px] rounded-t-2xl" style={{ background: `linear-gradient(to right, transparent, ${item.color}, transparent)`, opacity: 0.5 }} />
          
          <span className="text-sm font-mono text-[#8899aa] tracking-wider">{item.year}</span>
          <h3 className="text-xl md:text-2xl font-bold font-orbitron mt-2 mb-3" style={{ color: item.color }}>
            {item.title}
          </h3>
          <p className="text-[#8899aa] text-sm leading-relaxed">{item.description}</p>
        </motion.div>
      </div>

      {/* Planet Node */}
      <div className="relative flex-shrink-0 z-10">
        <motion.div
          whileHover={{ scale: 1.3 }}
          className="w-16 h-16 rounded-full flex items-center justify-center text-2xl relative"
          style={{
            background: `radial-gradient(circle at 30% 30%, ${item.color}40, ${item.color}10)`,
            border: `2px solid ${item.color}60`,
            boxShadow: `0 0 20px ${item.color}30, inset 0 0 20px ${item.color}10`,
          }}
        >
          {item.icon}
          {/* Orbital ring */}
          <div
            className="absolute inset-[-8px] rounded-full border animate-orbit-slow"
            style={{ borderColor: `${item.color}20` }}
          />
        </motion.div>
      </div>

      {/* Empty space for alignment */}
      <div className="flex-1 hidden md:block" />
    </motion.div>
  );
}

export default function TimelineSection() {
  return (
    <section id="journey" className="relative py-24 px-6 lg:px-8">
      <SectionHeading
        title="My Journey"
        subtitle="A timeline through the stars — milestones that shaped my universe"
      />

      <div className="max-w-6xl mx-auto relative">
        {/* Central timeline line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-gradient-to-b from-transparent via-[#00d4ff] to-transparent opacity-30 hidden md:block" />
        
        {/* Animated glow on the line */}
        <motion.div
          animate={{ y: ['0%', '100%'] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
          className="absolute left-1/2 -translate-x-1/2 w-[2px] h-20 bg-gradient-to-b from-transparent via-[#00d4ff] to-transparent hidden md:block"
        />

        {timeline.map((item, index) => (
          <TimelinePlanet key={item.title} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}
