'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface CosmicButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  icon?: ReactNode;
}

export default function CosmicButton({ 
  children, href, onClick, variant = 'primary', size = 'md', className = '', icon 
}: CosmicButtonProps) {
  const baseClasses = 'relative inline-flex items-center justify-center gap-2 font-medium rounded-full transition-all duration-300 cursor-pointer overflow-hidden group';
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const variantClasses = {
    primary: 'bg-gradient-to-r from-[#00d4ff] to-[#8b5cf6] text-white hover:shadow-[0_0_30px_rgba(0,212,255,0.4)]',
    secondary: 'bg-[rgba(0,212,255,0.1)] border border-[rgba(0,212,255,0.3)] text-[#00d4ff] hover:bg-[rgba(0,212,255,0.2)] hover:shadow-[0_0_20px_rgba(0,212,255,0.2)]',
    ghost: 'text-[#c0c0c0] hover:text-[#00d4ff] hover:bg-[rgba(0,212,255,0.05)]',
  };

  const content = (
    <>
      {/* Animated glow overlay */}
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
      {icon && <span className="relative z-10">{icon}</span>}
      <span className="relative z-10">{children}</span>
    </>
  );

  const allClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  if (href) {
    return (
      <motion.a
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        className={allClasses}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      className={allClasses}
    >
      {content}
    </motion.button>
  );
}
