'use client';

import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import WireframeSphere from '@/components/canvas/WireframeSphere';
import TypewriterText from '@/components/ui/TypewriterText';
import Button from '@/components/ui/Button';
import { personalInfo, socialLinks, roles } from '@/lib/data';
import { ExternalLink, ChevronDown, Rocket } from 'lucide-react';
import { GithubIcon } from '@/components/ui/Icons';

export default function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Cosmic Sphere Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] md:w-[800px] md:h-[800px] opacity-40">
          <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
            <Suspense fallback={null}>
              <WireframeSphere />
              <ambientLight intensity={0.3} />
            </Suspense>
          </Canvas>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6"
        >
          <span
            className="inline-block px-5 py-2.5 rounded-full text-sm text-[#e0e8ff] tracking-wide"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.06), rgba(139, 92, 246, 0.04))',
              border: '1px solid rgba(0, 212, 255, 0.15)',
              boxShadow: '0 0 20px rgba(0, 212, 255, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.03)',
            }}
          >
            <span className="text-[rgba(0,212,255,0.7)]">✦</span>{' '}
            {personalInfo.tagline}{' '}
            <span className="text-[rgba(139,92,246,0.7)]">✦</span>
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold font-orbitron mb-6 leading-tight"
        >
          <span className="text-[#f0f0ff]">Hi, I&apos;m</span>
          <br />
          <span className="gradient-text">{personalInfo.name}</span>
        </motion.h1>

        {/* Typewriter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-xl md:text-2xl lg:text-3xl text-[#8899aa] mb-10 h-10"
        >
          <TypewriterText texts={roles} speed={70} deleteSpeed={35} pauseTime={2000} />
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Button href="#journey" variant="primary" size="lg" icon={<Rocket className="w-5 h-5" />}>
            Explore Universe
          </Button>
          <Button href={personalInfo.resume} variant="secondary" size="lg" icon={<ExternalLink className="w-5 h-5" />}>
            View Resume
          </Button>
          <Button href={socialLinks.github} variant="secondary" size="lg" icon={<GithubIcon className="w-5 h-5" />}>
            GitHub
          </Button>
          <Button href={socialLinks.leetcode} variant="ghost" size="lg">
            LeetCode
          </Button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 text-[#8899aa] cursor-pointer"
          onClick={() => document.getElementById('journey')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <span className="text-xs font-mono uppercase tracking-widest">Scroll to Explore</span>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
