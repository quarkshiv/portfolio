'use client';

import { useState, useEffect } from 'react';

interface TypewriterTextProps {
  texts: string[];
  speed?: number;
  deleteSpeed?: number;
  pauseTime?: number;
  className?: string;
}

export default function TypewriterText({ 
  texts, speed = 80, deleteSpeed = 40, pauseTime = 2000, className = '' 
}: TypewriterTextProps) {
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) {
      const timeout = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseTime);
      return () => clearTimeout(timeout);
    }

    const currentText = texts[textIndex];
    
    if (!isDeleting && charIndex === currentText.length) {
      setIsPaused(true);
      return;
    }

    if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setTextIndex((prev) => (prev + 1) % texts.length);
      return;
    }

    const timeout = setTimeout(() => {
      setCharIndex(prev => isDeleting ? prev - 1 : prev + 1);
    }, isDeleting ? deleteSpeed : speed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, isPaused, textIndex, texts, speed, deleteSpeed, pauseTime]);

  return (
    <span className={className}>
      {texts[textIndex].substring(0, charIndex)}
      <span className="animate-pulse text-[#00d4ff]">|</span>
    </span>
  );
}
