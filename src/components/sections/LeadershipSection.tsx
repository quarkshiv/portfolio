'use client';

import { motion } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';
import { leadership } from '@/lib/data';

export default function LeadershipSection() {
  return (
    <section id="leadership" className="relative py-24 px-4">
      <SectionHeading
        title="Command Center"
        subtitle="Leading teams, building communities, and driving impact beyond code"
      />

      {/* Network visualization */}
      <div className="max-w-6xl mx-auto relative">
        {/* Central hub */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full items-center justify-center z-10"
          style={{
            background: 'radial-gradient(circle, rgba(0,212,255,0.2), transparent)',
            border: '2px solid rgba(0,212,255,0.3)',
            boxShadow: '0 0 40px rgba(0,212,255,0.2)',
          }}
        >
          <span className="text-2xl font-bold font-orbitron text-[#00d4ff]">SS</span>
          <div className="absolute inset-[-10px] rounded-full border border-[rgba(0,212,255,0.1)] animate-orbit-slow" />
          <div className="absolute inset-[-20px] rounded-full border border-[rgba(139,92,246,0.1)] animate-orbit-reverse" />
        </motion.div>

        {/* Role cards in a grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {leadership.map((item, index) => (
            <GlassCard key={item.role + item.org} delay={index * 0.1} className="p-6">
              <div className="flex items-start gap-4">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{
                    background: `${item.color}15`,
                    border: `1px solid ${item.color}30`,
                  }}
                >
                  {item.icon}
                </motion.div>
                <div>
                  <h3 className="font-bold text-[#f0f0ff] text-lg">{item.role}</h3>
                  <p className="text-sm font-mono mb-2" style={{ color: item.color }}>{item.org}</p>
                  <p className="text-sm text-[#8899aa] leading-relaxed">{item.description}</p>
                </div>
              </div>

              {/* Connection line to center (decorative) */}
              <div className="hidden md:block absolute top-1/2 left-1/2 w-full h-[1px] -translate-y-1/2 pointer-events-none" style={{ background: `linear-gradient(to right, transparent, ${item.color}10, transparent)` }} />
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
