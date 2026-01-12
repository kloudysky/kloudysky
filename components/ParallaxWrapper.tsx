"use client";

import { useEffect, useState, ReactNode } from 'react';

interface ParallaxWrapperProps {
  children: ReactNode;
  intensity?: number;
  className?: string;
}

export default function ParallaxWrapper({ children, intensity = 1, className = '' }: ParallaxWrapperProps) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      // Calculate offset from center (-1 to 1)
      const normalizedX = (e.clientX - centerX) / centerX;
      const normalizedY = (e.clientY - centerY) / centerY;

      // Apply smooth easing
      setOffset({
        x: normalizedX * 20 * intensity,
        y: normalizedY * 15 * intensity,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [intensity]);

  return (
    <div
      className={className}
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      }}
    >
      {children}
    </div>
  );
}
