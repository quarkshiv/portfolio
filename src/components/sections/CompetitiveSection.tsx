'use client';

import { motion } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import HolographicPanel from '@/components/ui/HolographicPanel';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import { competitiveProgramming } from '@/lib/data';
import { Trophy, Code, Zap, Target } from 'lucide-react';

const codeSnippets = [
  'int dp[N][M];',
  'sort(a.begin(), a.end());',
  'while(lo < hi) {',
  'dfs(node, parent);',
  'return dp[n][w];',
  'priority_queue<int> pq;',
];

export default function CompetitiveSection() {
  return (
    <section id="competitive" className="relative py-24 px-4 overflow-hidden">
      {/* Floating code snippets */}
      {codeSnippets.map((snippet, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.15 }}
          viewport={{ once: true }}
          className="absolute text-[#00d4ff] font-mono text-sm pointer-events-none select-none"
          style={{
            left: `${10 + (i * 15) % 80}%`,
            top: `${15 + (i * 20) % 70}%`,
            transform: `rotate(${-10 + i * 5}deg)`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {snippet}
        </motion.div>
      ))}

      <SectionHeading
        title="Hall of Algorithms"
        subtitle="Where logic meets competition — a journey through 1000+ problems solved"
      />

      {/* Central counter */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <div className="inline-flex flex-col items-center p-8 rounded-2xl bg-[rgba(13,17,23,0.6)] backdrop-blur-xl border border-[rgba(0,212,255,0.15)]">
          <div className="text-6xl md:text-8xl font-bold font-orbitron gradient-text">
            <AnimatedCounter target={competitiveProgramming.totalSolved} suffix="+" duration={2.5} />
          </div>
          <div className="text-lg text-[#8899aa] mt-2 font-mono">Problems Solved</div>
        </div>
      </motion.div>

      {/* Platform cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {competitiveProgramming.platforms.map((platform, index) => (
          <HolographicPanel key={platform.name} title={platform.name} delay={index * 0.15}>
            <div className="p-6 pt-2">
              <a
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: platform.color + '20' }}>
                    <Code className="w-5 h-5" style={{ color: platform.color }} />
                  </div>
                  <div>
                    <div className="font-bold text-[#f0f0ff]">{platform.name}</div>
                    <div className="text-xs text-[#667788] font-mono">@{platform.handle}</div>
                  </div>
                </div>

                <div className="space-y-3">
                  {Object.entries(platform.stats).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center">
                      <span className="text-xs text-[#8899aa] capitalize">{key}</span>
                      <span className="text-sm font-mono font-bold" style={{ color: platform.color }}>{value}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-[rgba(255,255,255,0.05)] text-xs text-[#667788] group-hover:text-[#00d4ff] transition-colors flex items-center gap-1">
                  Visit Profile →
                </div>
              </a>
            </div>
          </HolographicPanel>
        ))}
      </div>

      {/* Achievements */}
      <div className="max-w-5xl mx-auto">
        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm font-mono uppercase tracking-[0.3em] text-[#00d4ff] mb-8"
        >
          Achievements
        </motion.h3>
        <div className="flex flex-wrap justify-center gap-4">
          {competitiveProgramming.achievements.map((achievement, index) => (
            <motion.div
              key={achievement}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(255, 215, 0, 0.3)' }}
              className="px-4 py-2 rounded-full bg-[rgba(255,215,0,0.05)] border border-[rgba(255,215,0,0.2)] text-sm text-[#ffd700] font-mono flex items-center gap-2"
            >
              <Trophy className="w-3 h-3" />
              {achievement}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
