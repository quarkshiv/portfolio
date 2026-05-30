'use client';

import { useState, useEffect, useCallback, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navItems } from '@/lib/data';
import {
  Menu,
  X,
  ArrowUpRight,
  User,
  Briefcase,
  Layers,
  FolderKanban,
  Trophy,
  Users,
  Mail,
} from 'lucide-react';

// Map icon string keys from data.ts to Lucide components
const iconMap: Record<string, ReactNode> = {
  user: <User className="w-3.5 h-3.5" />,
  briefcase: <Briefcase className="w-3.5 h-3.5" />,
  layers: <Layers className="w-3.5 h-3.5" />,
  'folder-kanban': <FolderKanban className="w-3.5 h-3.5" />,
  trophy: <Trophy className="w-3.5 h-3.5" />,
  users: <Users className="w-3.5 h-3.5" />,
  mail: <Mail className="w-3.5 h-3.5" />,
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#home');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        {/* Outer wrapper for padding that shrinks on scroll */}
        <div
          className={`transition-all duration-700 ease-out ${
            scrolled ? 'pt-2 pb-2' : 'pt-4 pb-3'
          }`}
        >
          <div className="max-w-6xl mx-auto px-4 lg:px-6">
            {/* ══════════════════════════════════════════════
                Main pill container — the floating bar
            ══════════════════════════════════════════════ */}
            <div
              className={`relative flex items-center justify-between rounded-2xl transition-all duration-700 ${
                scrolled ? 'px-4 py-2' : 'px-5 py-2.5'
              }`}
              style={{
                background: scrolled
                  ? 'linear-gradient(135deg, rgba(5, 5, 18, 0.82) 0%, rgba(10, 8, 28, 0.78) 50%, rgba(5, 5, 18, 0.82) 100%)'
                  : 'linear-gradient(135deg, rgba(5, 5, 18, 0.55) 0%, rgba(10, 8, 28, 0.45) 50%, rgba(5, 5, 18, 0.55) 100%)',
                backdropFilter: 'blur(24px) saturate(1.5)',
                WebkitBackdropFilter: 'blur(24px) saturate(1.5)',
                border: '1px solid rgba(0, 212, 255, 0.08)',
                boxShadow: scrolled
                  ? '0 8px 40px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(0, 212, 255, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.03)'
                  : '0 4px 24px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.02)',
              }}
            >
              {/* Animated top border glow */}
              <div
                className="absolute top-0 left-[10%] right-[10%] h-px rounded-full pointer-events-none"
                style={{
                  background:
                    'linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.35), rgba(139, 92, 246, 0.25), transparent)',
                }}
              />

              {/* Subtle bottom border line */}
              <div
                className="absolute bottom-0 left-[15%] right-[15%] h-px rounded-full pointer-events-none"
                style={{
                  background:
                    'linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.08), transparent)',
                }}
              />

              {/* ─── Logo ─── */}
              <motion.a
                href="#home"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="relative group flex items-center gap-2.5 flex-shrink-0"
              >
                {/* Logo glow ring (on hover) */}
                <span
                  className="absolute -inset-2 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-md pointer-events-none"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(0, 212, 255, 0.12), transparent 70%)',
                  }}
                />

                {/* Logo mark */}
                <div className="relative">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(0,212,255,0.15)]"
                    style={{
                      background:
                        'linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(139, 92, 246, 0.07))',
                      border: '1px solid rgba(0, 212, 255, 0.12)',
                    }}
                  >
                    <span
                      className="text-base font-bold gradient-text"
                      style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                      SS
                    </span>
                  </div>
                </div>

                {/* Logo text */}
                <div className="hidden sm:flex flex-col leading-none">
                  <span
                    className="text-[13px] font-semibold tracking-wide text-[#e0e4ef]"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Shivansh
                  </span>
                  <span
                    className="text-[9px] font-medium tracking-[0.18em] uppercase mt-0.5"
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      background:
                        'linear-gradient(90deg, rgba(0,212,255,0.55), rgba(139,92,246,0.45))',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    Portfolio
                  </span>
                </div>
              </motion.a>

              {/* ─── Desktop Navigation ─── */}
              <div className="hidden lg:flex items-center justify-center flex-1 mx-6">
                <div
                  className="flex items-center gap-0.5 px-1.5 py-1 rounded-xl"
                  style={{
                    background: 'rgba(255, 255, 255, 0.015)',
                    border: '1px solid rgba(255, 255, 255, 0.035)',
                  }}
                >
                  {navItems.map((item) => {
                    const isActive = activeSection === item.href;
                    const isHovered = hoveredItem === item.href;

                    return (
                      <motion.a
                        key={item.href}
                        href={item.href}
                        onMouseEnter={() => setHoveredItem(item.href)}
                        onMouseLeave={() => setHoveredItem(null)}
                        whileTap={{ scale: 0.96 }}
                        className="relative px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors duration-300"
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: '12.5px',
                          fontWeight: isActive ? 600 : 450,
                          letterSpacing: '0.025em',
                          color: isActive
                            ? '#ffffff'
                            : isHovered
                              ? '#d0d4e4'
                              : 'rgba(155, 165, 185, 0.85)',
                        }}
                      >
                        {/* Animated active / hover background pill */}
                        {isActive && (
                          <motion.span
                            layoutId="activeNavPill"
                            className="absolute inset-0 rounded-lg pointer-events-none"
                            style={{
                              background:
                                'linear-gradient(135deg, rgba(0, 212, 255, 0.12), rgba(139, 92, 246, 0.07))',
                              border: '1px solid rgba(0, 212, 255, 0.15)',
                              boxShadow:
                                '0 0 18px rgba(0, 212, 255, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.04)',
                            }}
                            transition={{
                              type: 'spring',
                              stiffness: 400,
                              damping: 30,
                            }}
                          />
                        )}

                        {/* Icon */}
                        <span
                          className="relative z-10 transition-colors duration-300"
                          style={{
                            color: isActive
                              ? '#00d4ff'
                              : isHovered
                                ? 'rgba(0, 212, 255, 0.5)'
                                : 'rgba(155, 165, 185, 0.4)',
                          }}
                        >
                          {iconMap[item.icon]}
                        </span>

                        {/* Label */}
                        <span className="relative z-10">{item.label}</span>

                        {/* Active dot — glowing bottom indicator */}
                        {isActive && (
                          <motion.span
                            layoutId="activeNavDot"
                            className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-[2px] rounded-full pointer-events-none"
                            style={{
                              background:
                                'linear-gradient(90deg, transparent, #00d4ff, transparent)',
                              boxShadow: '0 0 8px rgba(0, 212, 255, 0.5)',
                            }}
                            transition={{
                              type: 'spring',
                              stiffness: 400,
                              damping: 30,
                            }}
                          />
                        )}

                        {/* Hover glow underline (non-active items) */}
                        {!isActive && (
                          <motion.span
                            className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px rounded-full pointer-events-none"
                            initial={{ width: 0, opacity: 0 }}
                            animate={
                              isHovered
                                ? { width: '60%', opacity: 0.5 }
                                : { width: 0, opacity: 0 }
                            }
                            transition={{ duration: 0.25 }}
                            style={{
                              background:
                                'linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.4), transparent)',
                            }}
                          />
                        )}
                      </motion.a>
                    );
                  })}
                </div>
              </div>

              {/* ─── Résumé CTA (desktop) ─── */}
              <div className="hidden lg:block flex-shrink-0">
                <motion.a
                  href="https://drive.google.com/file/d/1RcAJoXzO4wDM87CbvroDFuJ2XgKfS23f/view?usp=drive_link"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.04, y: -1 }}
                  whileTap={{ scale: 0.96 }}
                  className="relative flex items-center gap-2 px-4 py-2 rounded-xl text-[12.5px] overflow-hidden group"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600,
                    letterSpacing: '0.035em',
                    color: '#f0f0ff',
                    border: '1px solid rgba(0, 212, 255, 0.15)',
                    background:
                      'linear-gradient(135deg, rgba(0, 212, 255, 0.06), rgba(139, 92, 246, 0.04))',
                  }}
                >
                  <span className="relative z-10">Résumé</span>
                  <ArrowUpRight className="relative z-10 w-3.5 h-3.5 text-[rgba(0,212,255,0.6)] group-hover:text-[#00d4ff] group-hover:translate-x-[1px] group-hover:-translate-y-[1px] transition-all duration-300" />
                  {/* Hover shimmer fill */}
                  <span
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                    style={{
                      background:
                        'linear-gradient(135deg, rgba(0, 212, 255, 0.12), rgba(139, 92, 246, 0.08))',
                    }}
                  />
                  {/* Glow ring */}
                  <span
                    className="absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      boxShadow:
                        '0 0 20px rgba(0, 212, 255, 0.1), 0 0 40px rgba(139, 92, 246, 0.05)',
                    }}
                  />
                </motion.a>
              </div>

              {/* ─── Mobile toggle ─── */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden relative w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300 cursor-pointer"
                style={{
                  background: mobileOpen
                    ? 'linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(139, 92, 246, 0.06))'
                    : 'rgba(255, 255, 255, 0.03)',
                  border: mobileOpen
                    ? '1px solid rgba(0, 212, 255, 0.2)'
                    : '1px solid rgba(255, 255, 255, 0.05)',
                }}
              >
                <AnimatePresence mode="wait">
                  {mobileOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-5 h-5 text-[#00d4ff]" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-5 h-5 text-[#a0aabe]" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* ══════════════════════════════════════════════
          Mobile menu — premium full-screen overlay
      ══════════════════════════════════════════════ */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-40 pt-24 px-6"
            style={{
              background:
                'linear-gradient(180deg, rgba(2, 2, 14, 0.98) 0%, rgba(5, 3, 20, 0.97) 100%)',
              backdropFilter: 'blur(24px)',
            }}
          >
            {/* Decorative gradient orbs */}
            <div
              className="absolute top-16 right-8 w-64 h-64 rounded-full blur-3xl opacity-10 pointer-events-none"
              style={{
                background:
                  'radial-gradient(circle, rgba(0,212,255,0.4), transparent 70%)',
              }}
            />
            <div
              className="absolute bottom-24 left-6 w-48 h-48 rounded-full blur-3xl opacity-8 pointer-events-none"
              style={{
                background:
                  'radial-gradient(circle, rgba(139,92,246,0.35), transparent 70%)',
              }}
            />

            <div className="relative flex flex-col gap-1 max-w-md mx-auto">
              {navItems.map((item, index) => {
                const isActive = activeSection === item.href;
                return (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    initial={{ opacity: 0, x: -24, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                    transition={{
                      delay: index * 0.06,
                      duration: 0.4,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    onClick={() => setMobileOpen(false)}
                    className="relative flex items-center gap-4 py-3.5 px-5 rounded-xl transition-all duration-300"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '1.1rem',
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
                    {/* Icon */}
                    <span
                      className="flex items-center justify-center w-8 h-8 rounded-lg transition-colors duration-300"
                      style={{
                        color: isActive
                          ? '#00d4ff'
                          : 'rgba(155, 165, 185, 0.4)',
                        background: isActive
                          ? 'rgba(0, 212, 255, 0.08)'
                          : 'rgba(255, 255, 255, 0.02)',
                        border: `1px solid ${isActive ? 'rgba(0, 212, 255, 0.15)' : 'rgba(255, 255, 255, 0.04)'}`,
                      }}
                    >
                      {iconMap[item.icon]}
                    </span>

                    {/* Section number + label */}
                    <div className="flex items-center gap-3">
                      <span
                        className="text-[10px] tracking-wider"
                        style={{
                          color: isActive
                            ? 'rgba(0, 212, 255, 0.5)'
                            : 'rgba(160, 170, 190, 0.2)',
                          fontFamily: "'JetBrains Mono', monospace",
                          fontWeight: 500,
                        }}
                      >
                        0{index + 1}
                      </span>
                      <span>{item.label}</span>
                    </div>

                    {/* Active glow */}
                    {isActive && (
                      <motion.span
                        layoutId="mobileActiveGlow"
                        className="absolute right-4 w-1.5 h-1.5 rounded-full"
                        style={{
                          background: '#00d4ff',
                          boxShadow: '0 0 8px rgba(0, 212, 255, 0.6)',
                        }}
                      />
                    )}
                  </motion.a>
                );
              })}

              {/* Separator */}
              <div
                className="my-4 mx-5 h-px"
                style={{
                  background:
                    'linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.12), transparent)',
                }}
              />

              {/* Mobile Résumé button */}
              <motion.a
                href="https://drive.google.com/file/d/1RcAJoXzO4wDM87CbvroDFuJ2XgKfS23f/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -24, filter: 'blur(8px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                transition={{
                  delay: navItems.length * 0.06 + 0.1,
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl text-sm group"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  letterSpacing: '0.03em',
                  color: '#f0f0ff',
                  border: '1px solid rgba(0, 212, 255, 0.18)',
                  background:
                    'linear-gradient(135deg, rgba(0, 212, 255, 0.08), rgba(139, 92, 246, 0.05))',
                }}
              >
                Résumé
                <ArrowUpRight className="w-4 h-4 text-[rgba(0,212,255,0.6)]" />
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
