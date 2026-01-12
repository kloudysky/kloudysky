"use client";

import { useEffect, useRef } from 'react';
import { currentTheme } from '@/lib/themes';

export default function FloatingParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const stars: {
      x: number;
      y: number;
      size: number;
      baseOpacity: number;
      pulse: number;
      pulseSpeed: number;
    }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Create twinkling stars (static positions)
    const starCount = 40;
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.3,
        baseOpacity: Math.random() * 0.12 + 0.03, // Very subtle
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.015 + 0.005, // Slow twinkle
      });
    }

    const isDark = currentTheme.name === 'dark' || currentTheme.name === 'midnight' || currentTheme.name === 'sunset';
    const starColor = isDark ? '255, 255, 255' : '58, 58, 60';

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const star of stars) {
        // Update twinkle
        star.pulse += star.pulseSpeed;

        // Twinkling opacity (fades in and out)
        const twinkle = 0.3 + 0.7 * Math.sin(star.pulse) ** 2;
        const opacity = star.baseOpacity * twinkle;

        // Draw star
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${starColor}, ${opacity})`;
        ctx.fill();
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 5 }}
    />
  );
}
