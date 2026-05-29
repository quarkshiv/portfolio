'use client';

import dynamic from 'next/dynamic';
import Navbar from '@/components/layout/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import TimelineSection from '@/components/sections/TimelineSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import CompetitiveSection from '@/components/sections/CompetitiveSection';
import LeadershipSection from '@/components/sections/LeadershipSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/layout/Footer';
import ShootingStars from '@/components/ui/ShootingStar';
import CursorTrail from '@/components/ui/CursorTrail';

// Dynamic import for Three.js scene (no SSR)
const BackgroundScene = dynamic(() => import('@/components/canvas/BackgroundScene'), {
  ssr: false,
});

// Dynamic import for AI Assistant (no SSR)
const AIAssistant = dynamic(() => import('@/components/sections/AIAssistant'), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Background Universe */}
      <BackgroundScene />

      {/* Global Effects */}
      <ShootingStars />
      <CursorTrail />

      {/* Navigation */}
      <Navbar />

      {/* Sections */}
      <HeroSection />

      <div className="relative z-10">
        <TimelineSection />
        <SkillsSection />
        <ProjectsSection />
        <CompetitiveSection />
        <LeadershipSection />
        <ContactSection />
      </div>

      {/* Footer */}
      <Footer />

      {/* AI Assistant */}
      <AIAssistant />
    </main>
  );
}
