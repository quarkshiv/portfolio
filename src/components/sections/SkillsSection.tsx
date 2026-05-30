'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import { skillClusters } from '@/lib/data';

interface StarNode {
  x: number;
  y: number;
  name: string;
  level: number;
  color: string;
  cluster: string;
  radius: number;
}

export default function SkillsSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredStar, setHoveredStar] = useState<StarNode | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const starsRef = useRef<StarNode[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animRef = useRef<number>(0);

  const generateStars = useCallback((width: number, height: number) => {
    const stars: StarNode[] = [];
    const centerX = width / 2;
    const centerY = height / 2;
    const clusterPositions = [
      { x: centerX - width * 0.25, y: centerY - height * 0.2 },
      { x: centerX + width * 0.25, y: centerY - height * 0.15 },
      { x: centerX - width * 0.2, y: centerY + height * 0.2 },
      { x: centerX + width * 0.2, y: centerY + height * 0.25 },
    ];

    skillClusters.forEach((cluster, ci) => {
      const pos = clusterPositions[ci];
      cluster.skills.forEach((skill, si) => {
        const angle = (si / cluster.skills.length) * Math.PI * 2 + ci;
        const dist = 40 + si * 30;
        stars.push({
          x: pos.x + Math.cos(angle) * dist,
          y: pos.y + Math.sin(angle) * dist,
          name: skill.name,
          level: skill.level,
          color: cluster.color,
          cluster: cluster.name,
          radius: 3 + (skill.level / 100) * 5,
        });
      });
    });
    return stars;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      starsRef.current = generateStars(rect.width, rect.height);
    };
    resize();
    window.addEventListener('resize', resize);

    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    canvas.addEventListener('mousemove', handleMouse);

    let time = 0;
    const animate = () => {
      time += 0.01;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const stars = starsRef.current;

      // Draw connections within clusters
      skillClusters.forEach((cluster) => {
        const clusterStars = stars.filter(s => s.cluster === cluster.name);
        ctx.strokeStyle = cluster.color + '25';
        ctx.lineWidth = 1;
        for (let i = 0; i < clusterStars.length; i++) {
          for (let j = i + 1; j < clusterStars.length; j++) {
            const dx = clusterStars[i].x - clusterStars[j].x;
            const dy = clusterStars[i].y - clusterStars[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 150) {
              ctx.beginPath();
              ctx.moveTo(clusterStars[i].x, clusterStars[i].y);
              ctx.lineTo(clusterStars[j].x, clusterStars[j].y);
              ctx.stroke();
            }
          }
        }
      });

      // Draw stars
      let foundHoverRef: StarNode | null = null;
      stars.forEach((star) => {
        const pulse = Math.sin(time * 2 + star.level) * 0.3 + 1;
        const dx = mouseRef.current.x - star.x;
        const dy = mouseRef.current.y - star.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const isHover = dist < star.radius * 4;
        const drawRadius = star.radius * pulse * (isHover ? 1.5 : 1);

        if (isHover) foundHoverRef = star;

        // Glow
        const gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, drawRadius * 4);
        gradient.addColorStop(0, star.color + '40');
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(star.x, star.y, drawRadius * 4, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.fillStyle = star.color;
        ctx.beginPath();
        ctx.arc(star.x, star.y, drawRadius, 0, Math.PI * 2);
        ctx.fill();

        // Label
        ctx.fillStyle = star.color + 'aa';
        ctx.font = `${isHover ? '13px' : '11px'} 'Inter', sans-serif`;
        ctx.textAlign = 'center';
        ctx.fillText(star.name, star.x, star.y + drawRadius + 16);
      });

      const hovered = foundHoverRef as StarNode | null;
      if (hovered) {
        setHoveredStar(hovered);
        setTooltipPos({ x: hovered.x, y: hovered.y - 50 });
      } else {
        setHoveredStar(null);
      }

      animRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouse);
      cancelAnimationFrame(animRef.current);
    };
  }, [generateStars]);

  return (
    <section id="skills" className="relative py-24 px-6 lg:px-8">
      <SectionHeading
        title="Skills Constellation"
        subtitle="Navigate through my universe of technologies — each star a skill, each cluster a domain"
      />

      <div ref={containerRef} className="relative max-w-7xl mx-auto h-[500px] md:h-[600px]">
        <canvas
          ref={canvasRef}
          className="w-full h-full cursor-crosshair"
        />

        {/* Tooltip */}
        {hoveredStar && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute pointer-events-none z-20 px-4 py-3 rounded-lg bg-[rgba(10,10,30,0.9)] backdrop-blur-xl border border-[rgba(0,212,255,0.3)]"
            style={{ left: tooltipPos.x, top: tooltipPos.y, transform: 'translate(-50%, -100%)' }}
          >
            <div className="text-sm font-bold" style={{ color: hoveredStar.color }}>{hoveredStar.name}</div>
            <div className="text-xs text-[#8899aa] mt-1">{hoveredStar.cluster}</div>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex-1 h-1.5 rounded-full bg-[rgba(255,255,255,0.1)]">
                <div className="h-full rounded-full" style={{ width: `${hoveredStar.level}%`, background: hoveredStar.color }} />
              </div>
              <span className="text-xs font-mono" style={{ color: hoveredStar.color }}>{hoveredStar.level}%</span>
            </div>
          </motion.div>
        )}

        {/* Cluster labels */}
        <div className="absolute bottom-4 left-0 right-0 flex flex-wrap justify-center gap-6">
          {skillClusters.map((cluster) => (
            <div key={cluster.name} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full animate-pulse" style={{ background: cluster.color }} />
              <span className="text-xs font-mono text-[#8899aa]">{cluster.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
