'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navItems } from '@/lib/data';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#home');

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 50);

    // Scroll-spy: detect which section is currently in view
    const sections = navItems.map((item) => item.href.replace('#', ''));
    for (let i = sections.length - 1; i >= 0; i--) {
      const el = document.getElementById(sections[i]);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 120) {
          setActiveSection(`#${sections[i]}`);
          break;
        }
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled ? 'py-2' : 'py-3'
        }`}
      >
        {/* Navbar background layer with premium glassmorphism */}
        <div
          className={`absolute inset-0 transition-all duration-700 ${
            scrolled
              ? 'backdrop-blur-2xl'
              : 'bg-transparent'
          }`}
          style={scrolled ? {
            background: 'linear-gradient(135deg, rgba(5, 5, 15, 0.88) 0%, rgba(10, 8, 24, 0.85) 50%, rgba(5, 5, 15, 0.88) 100%)',
            borderBottom: '1px solid rgba(0, 212, 255, 0.08)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5), 0 1px 0 rgba(0, 212, 255, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.02)',
          } : {}}
        />

        {/* Top accent line — subtle gradient strip */}
        {scrolled && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-0 left-0 right-0 h-px"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.4), rgba(139, 92, 246, 0.3), transparent)',
            }}
          />
        )}

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
          {/* Logo — premium monogram with glow ring */}
          <motion.a
            href="#home"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
            className="relative group flex items-center gap-3"
          >
            {/* Logo mark */}
            <div className="relative">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500"
                style={{
                  background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.12), rgba(139, 92, 246, 0.08))',
                  border: '1px solid rgba(0, 212, 255, 0.15)',
                  boxShadow: '0 0 20px rgba(0, 212, 255, 0.06)',
                }}
              >
                <span
                  className="text-lg font-bold gradient-text"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  SS
                </span>
              </div>
              {/* Glow ring on hover */}
              <span
                className="absolute -inset-1 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm"
                style={{
                  background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.2), rgba(139, 92, 246, 0.15))',
                }}
              />
            </div>
            {/* Logo text */}
            <div className="hidden sm:flex flex-col">
              <span
                className="text-[13px] font-semibold tracking-wide text-[#e0e4ef]"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Shivansh
              </span>
              <span
                className="text-[10px] font-medium tracking-[0.15em] uppercase text-[rgba(0,212,255,0.5)]"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Portfolio
              </span>
            </div>
          </motion.a>

          {/* Desktop nav — floating pill container */}
          <div className="hidden md:flex items-center">
            <div
              className="flex items-center gap-0.5 px-2 py-1.5 rounded-2xl transition-all duration-500"
              style={{
                background: scrolled
                  ? 'rgba(255, 255, 255, 0.025)'
                  : 'rgba(255, 255, 255, 0.015)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                boxShadow: scrolled
                  ? 'inset 0 1px 0 rgba(255, 255, 255, 0.03), 0 2px 8px rgba(0, 0, 0, 0.2)'
                  : 'none',
              }}
            >
              {navItems.map((item) => {
                const isActive = activeSection === item.href;
                return (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="relative px-4 py-2 rounded-xl transition-all duration-300"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '13px',
                      fontWeight: isActive ? 600 : 450,
                      letterSpacing: '0.02em',
                      color: isActive ? '#ffffff' : 'rgba(160, 170, 190, 0.85)',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        (e.currentTarget as HTMLAnchorElement).style.color = '#e0e4ef';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(160, 170, 190, 0.85)';
                      }
                    }}
                  >
                    {/* Active pill background */}
                    {isActive && (
                      <motion.span
                        layoutId="navPill"
                        className="absolute inset-0 rounded-xl"
                        style={{
                          background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.12), rgba(139, 92, 246, 0.08))',
                          border: '1px solid rgba(0, 212, 255, 0.18)',
                          boxShadow: '0 0 16px rgba(0, 212, 255, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.04)',
                        }}
                        transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                      />
                    )}

                    {/* Label */}
                    <span className="relative z-10">{item.label}</span>

                    {/* Active dot indicator */}
                    {isActive && (
                      <motion.span
                        layoutId="navDot"
                        className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                        style={{
                          background: '#00d4ff',
                          boxShadow: '0 0 8px rgba(0, 212, 255, 0.6)',
                        }}
                        transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                      />
                    )}

                    {/* Hover glow underline */}
                    <motion.span
                      className="absolute bottom-0.5 left-1/2 -translate-x-1/2 h-px rounded-full"
                      initial={{ width: 0, opacity: 0 }}
                      whileHover={{ width: '50%', opacity: 0.6 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        background: 'linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.5), transparent)',
                      }}
                    />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Resume CTA button — desktop only */}
          <div className="hidden md:block">
            <motion.a
              href="https://drive.google.com/file/d/1RcAJoXzO4wDM87CbvroDFuJ2XgKfS23f/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
              className="relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] overflow-hidden group"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                letterSpacing: '0.03em',
                color: '#f0f0ff',
                border: '1px solid rgba(0, 212, 255, 0.2)',
                background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.08), rgba(139, 92, 246, 0.06))',
              }}
            >
              <span className="relative z-10">Résumé</span>
              <ArrowUpRight className="relative z-10 w-3.5 h-3.5 text-[rgba(0,212,255,0.7)] group-hover:text-[#00d4ff] transition-colors duration-300" />
              {/* Hover fill */}
              <span
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500"
                style={{
                  background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.15), rgba(139, 92, 246, 0.1))',
                }}
              />
              {/* Glow on hover */}
              <span
                className="absolute -inset-1 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ boxShadow: '0 0 24px rgba(0, 212, 255, 0.12), 0 0 48px rgba(139, 92, 246, 0.06)' }}
              />
            </motion.a>
          </div>

          {/* Mobile toggle */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden relative w-11 h-11 flex items-center justify-center rounded-xl transition-all duration-300 cursor-pointer"
            style={{
              background: mobileOpen
                ? 'linear-gradient(135deg, rgba(0, 212, 255, 0.12), rgba(139, 92, 246, 0.08))'
                : 'rgba(255, 255, 255, 0.03)',
              border: mobileOpen
                ? '1px solid rgba(0, 212, 255, 0.2)'
                : '1px solid rgba(255, 255, 255, 0.06)',
            }}
          >
            {mobileOpen ? (
              <X className="w-5 h-5 text-[#00d4ff]" />
            ) : (
              <Menu className="w-5 h-5 text-[#a0aabe]" />
            )}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile menu — full-screen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 backdrop-blur-2xl pt-28 px-8"
            style={{
              background: 'linear-gradient(180deg, rgba(2, 2, 12, 0.98) 0%, rgba(5, 3, 18, 0.97) 100%)',
            }}
          >
            {/* Decorative gradient orbs */}
            <div
              className="absolute top-20 right-10 w-72 h-72 rounded-full blur-3xl opacity-15 pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.35), transparent 70%)' }}
            />
            <div
              className="absolute bottom-32 left-10 w-56 h-56 rounded-full blur-3xl opacity-10 pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.35), transparent 70%)' }}
            />

            <div className="relative flex flex-col gap-1">
              {navItems.map((item, index) => {
                const isActive = activeSection === item.href;
                return (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                    onClick={() => setMobileOpen(false)}
                    className="relative flex items-center gap-4 py-4 px-5 rounded-xl transition-all duration-300"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '1.2rem',
                      fontWeight: isActive ? 600 : 450,
                      letterSpacing: '0.02em',
                      color: isActive ? '#ffffff' : 'rgba(160, 170, 190, 0.8)',
                      background: isActive
                        ? 'linear-gradient(135deg, rgba(0, 212, 255, 0.08), rgba(139, 92, 246, 0.04))'
                        : 'transparent',
                      borderLeft: isActive
                        ? '2px solid rgba(0, 212, 255, 0.5)'
                        : '2px solid transparent',
                    }}
                  >
                    {/* Section number */}
                    <span
                      className="text-[11px] tracking-wider"
                      style={{
                        color: isActive ? 'rgba(0, 212, 255, 0.5)' : 'rgba(160, 170, 190, 0.25)',
                        fontFamily: "'JetBrains Mono', monospace",
                        fontWeight: 500,
                      }}
                    >
                      0{index + 1}
                    </span>
                    {item.label}
                  </motion.a>
                );
              })}

              {/* Mobile resume button */}
              <motion.a
                href="https://drive.google.com/file/d/1RcAJoXzO4wDM87CbvroDFuJ2XgKfS23f/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="mt-6 flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl text-sm"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  letterSpacing: '0.03em',
                  color: '#f0f0ff',
                  border: '1px solid rgba(0, 212, 255, 0.2)',
                  background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.08), rgba(139, 92, 246, 0.06))',
                }}
              >
                Résumé
                <ArrowUpRight className="w-4 h-4 text-[rgba(0,212,255,0.7)]" />
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
