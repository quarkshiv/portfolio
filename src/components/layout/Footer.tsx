'use client';

import { motion } from 'framer-motion';
import { socialLinks } from '@/lib/data';
import { Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/ui/Icons';

export default function Footer() {
  return (
    <footer className="relative py-12 px-4 border-t border-[rgba(0,212,255,0.08)]">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <div className="text-lg font-orbitron font-bold gradient-text">Shivansh Shukla</div>
          <div className="text-xs text-[#667788] mt-1 font-mono">© {new Date().getFullYear()}</div>
        </div>

        <div className="flex items-center gap-4">
          {[
            { icon: <GithubIcon className="w-4 h-4" />, href: socialLinks.github },
            { icon: <LinkedinIcon className="w-4 h-4" />, href: socialLinks.linkedin },
            { icon: <Mail className="w-4 h-4" />, href: socialLinks.email },
          ].map((social, i) => (
            <motion.a
              key={i}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, y: -2 }}
              className="w-9 h-9 rounded-full flex items-center justify-center bg-[rgba(0,212,255,0.05)] border border-[rgba(0,212,255,0.1)] text-[#8899aa] hover:text-[#00d4ff] hover:border-[rgba(0,212,255,0.3)] transition-colors"
            >
              {social.icon}
            </motion.a>
          ))}
        </div>
      </div>
    </footer>
  );
}
