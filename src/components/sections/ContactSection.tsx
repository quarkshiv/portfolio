'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import { socialLinks, personalInfo } from '@/lib/data';
import { Send, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from '@/components/ui/Icons';

const socialIcons = [
  { icon: <GithubIcon className="w-5 h-5" />, href: socialLinks.github, label: 'GitHub', color: '#f0f0ff' },
  { icon: <LinkedinIcon className="w-5 h-5" />, href: socialLinks.linkedin, label: 'LinkedIn', color: '#0077b5' },
  { icon: <Mail className="w-5 h-5" />, href: socialLinks.email, label: 'Email', color: '#00d4ff' },
  { icon: <InstagramIcon className="w-5 h-5" />, href: socialLinks.instagram, label: 'Instagram', color: '#e4405f' },
];

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate send
    setIsSent(true);
    setTimeout(() => setIsSent(false), 3000);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="relative py-24 px-4">
      <SectionHeading
        title="Contact Terminal"
        subtitle="Establish communication — transmit your message across the cosmos"
      />

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact form */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-[#8899aa] mb-2 block">Identification</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your name"
                required
                className="w-full bg-[rgba(13,17,23,0.6)] backdrop-blur-xl border border-[rgba(0,212,255,0.12)] rounded-xl px-5 py-3.5 text-[#f0f0ff] placeholder-[#4a5568] focus:outline-none focus:border-[rgba(0,212,255,0.4)] focus:shadow-[0_0_20px_rgba(0,212,255,0.1)] transition-all"
              />
            </div>
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-[#8899aa] mb-2 block">Frequency</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your@email.com"
                required
                className="w-full bg-[rgba(13,17,23,0.6)] backdrop-blur-xl border border-[rgba(0,212,255,0.12)] rounded-xl px-5 py-3.5 text-[#f0f0ff] placeholder-[#4a5568] focus:outline-none focus:border-[rgba(0,212,255,0.4)] focus:shadow-[0_0_20px_rgba(0,212,255,0.1)] transition-all"
              />
            </div>
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-[#8899aa] mb-2 block">Transmission</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Your message..."
                required
                rows={5}
                className="w-full bg-[rgba(13,17,23,0.6)] backdrop-blur-xl border border-[rgba(0,212,255,0.12)] rounded-xl px-5 py-3.5 text-[#f0f0ff] placeholder-[#4a5568] focus:outline-none focus:border-[rgba(0,212,255,0.4)] focus:shadow-[0_0_20px_rgba(0,212,255,0.1)] transition-all resize-none"
              />
            </div>

            <Button
              variant="primary"
              size="lg"
              icon={<Send className="w-5 h-5" />}
              onClick={() => {}}
            >
              {isSent ? '✓ Transmitted!' : 'Transmit Message'}
            </Button>
          </form>
        </motion.div>

        {/* Info side */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col justify-center"
        >
          <div className="mb-8">
            <h3 className="text-2xl font-bold font-orbitron text-[#f0f0ff] mb-4">Let&apos;s Connect</h3>
            <p className="text-[#8899aa] leading-relaxed">
              Whether you want to collaborate, discuss algorithms, or just say hello — 
              my communication channels are always open across the cosmos.
            </p>
          </div>

          <div className="mb-8">
            <div className="text-xs font-mono uppercase tracking-wider text-[#00d4ff] mb-4">Direct Frequency</div>
            <a href={socialLinks.email} className="text-[#f0f0ff] hover:text-[#00d4ff] transition-colors font-mono">
              {personalInfo.email}
            </a>
          </div>

          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-[#00d4ff] mb-4">Signal Networks</div>
            <div className="flex gap-4">
              {socialIcons.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 rounded-xl flex items-center justify-center bg-[rgba(13,17,23,0.6)] border border-[rgba(0,212,255,0.12)] hover:border-[rgba(0,212,255,0.3)] transition-colors"
                  style={{ color: social.color }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Fun fact */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-8 p-4 rounded-xl bg-[rgba(0,212,255,0.03)] border border-[rgba(0,212,255,0.1)]"
          >
            <span className="text-xs font-mono text-[#8899aa]">⚡ Fun fact: </span>
            <span className="text-sm text-[#c0c0c0]">{personalInfo.funFact}</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
