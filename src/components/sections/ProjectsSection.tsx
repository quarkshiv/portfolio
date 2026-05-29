'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import { projects } from '@/lib/data';
import { ExternalLink, X } from 'lucide-react';
import { GithubIcon } from '@/components/ui/Icons';

function ProjectPlanet({ project, index, onClick }: { 
  project: typeof projects[0]; index: number; onClick: () => void 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      whileHover={{ scale: 1.05, y: -10 }}
      onClick={onClick}
      className="relative cursor-pointer group"
    >
      {/* Planet glow */}
      <div
        className="absolute inset-0 rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"
        style={{ background: project.color }}
      />

      <div
        className="relative bg-[rgba(13,17,23,0.7)] backdrop-blur-xl border border-[rgba(0,212,255,0.12)] rounded-3xl p-8 overflow-hidden"
        style={{ boxShadow: `0 0 40px ${project.color}15` }}
      >
        {/* Top glow */}
        <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: `linear-gradient(to right, transparent, ${project.color}, transparent)`, opacity: 0.5 }} />

        {/* Orbit rings (decorative) */}
        <div className="absolute top-4 right-4 w-24 h-24 opacity-20">
          <div className="absolute inset-0 rounded-full border animate-orbit" style={{ borderColor: project.color + '40' }} />
          <div className="absolute inset-2 rounded-full border animate-orbit-reverse" style={{ borderColor: project.color + '30' }} />
          <div className="absolute inset-4 rounded-full border animate-orbit-slow" style={{ borderColor: project.color + '20' }} />
          <div className="absolute inset-[40%] rounded-full" style={{ background: project.color + '30' }} />
        </div>

        {/* Content */}
        <h3 className="text-2xl font-bold font-orbitron mb-3" style={{ color: project.color }}>
          {project.title}
        </h3>
        <p className="text-[#8899aa] text-sm leading-relaxed mb-6 max-w-md">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-xs font-mono rounded-full border"
              style={{ borderColor: project.color + '40', color: project.color }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-4">
          {project.metrics.map((metric) => (
            <div key={metric.label} className="text-center">
              <div className="text-lg font-bold font-mono" style={{ color: project.color }}>
                {metric.value}
              </div>
              <div className="text-xs text-[#667788]">{metric.label}</div>
            </div>
          ))}
        </div>

        {/* Hover indicator */}
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-[#667788] group-hover:text-[#00d4ff] transition-colors">
          <span>Click to explore</span>
          <ExternalLink className="w-3 h-3" />
        </div>
      </div>
    </motion.div>
  );
}

function ProjectModal({ project, onClose }: { project: typeof projects[0]; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[rgba(0,0,8,0.9)] backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, rotateX: 10 }}
        animate={{ scale: 1, opacity: 1, rotateX: 0 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: 'spring', damping: 25 }}
        className="relative max-w-2xl w-full bg-[rgba(13,17,23,0.95)] backdrop-blur-2xl border border-[rgba(0,212,255,0.2)] rounded-2xl p-8 overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
        style={{ boxShadow: `0 0 60px ${project.color}20` }}
      >
        {/* Close button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-[#8899aa] hover:text-white transition-colors cursor-pointer">
          <X className="w-6 h-6" />
        </button>

        {/* Top glow */}
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(to right, transparent, ${project.color}, transparent)` }} />

        <h2 className="text-3xl font-bold font-orbitron mb-4" style={{ color: project.color }}>
          {project.title}
        </h2>
        <p className="text-[#8899aa] leading-relaxed mb-8">{project.description}</p>

        {/* Features */}
        <div className="mb-8">
          <h3 className="text-sm font-mono uppercase tracking-wider text-[#00d4ff] mb-4">Key Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {project.features.map((feature) => (
              <div key={feature} className="flex items-center gap-3 text-sm text-[#c0c0c0]">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: project.color }} />
                {feature}
              </div>
            ))}
          </div>
        </div>

        {/* Tech orbit */}
        <div className="mb-8">
          <h3 className="text-sm font-mono uppercase tracking-wider text-[#00d4ff] mb-4">Tech Stack</h3>
          <div className="flex flex-wrap gap-3">
            {project.tech.map((tech) => (
              <span key={tech} className="px-4 py-2 text-sm font-mono rounded-full bg-[rgba(0,212,255,0.05)] border border-[rgba(0,212,255,0.2)] text-[#00d4ff]">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-6 mb-8 p-6 rounded-xl bg-[rgba(0,212,255,0.03)] border border-[rgba(0,212,255,0.1)]">
          {project.metrics.map((metric) => (
            <div key={metric.label} className="text-center">
              <div className="text-2xl font-bold font-mono" style={{ color: project.color }}>{metric.value}</div>
              <div className="text-xs text-[#667788] mt-1">{metric.label}</div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <Button href={project.github} variant="primary" icon={<GithubIcon className="w-4 h-4" />}>
            View Code
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  return (
    <section id="projects" className="relative py-24 px-4">
      <SectionHeading
        title="Projects Galaxy"
        subtitle="Explore the planets of creation — each one a universe of engineering"
      />

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <ProjectPlanet
            key={project.title}
            project={project}
            index={index}
            onClick={() => setSelectedProject(project)}
          />
        ))}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
