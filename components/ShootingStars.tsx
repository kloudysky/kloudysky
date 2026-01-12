"use client";

import { useEffect, useRef } from 'react';
import { currentTheme } from '@/lib/themes';

export default function ShootingStars() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const stars: {
      x: number;
      y: number;
      length: number;
      speed: number;
      opacity: number;
      angle: number;
      active: boolean;
      trail: { x: number; y: number; opacity: number }[];
    }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const isDark = currentTheme.name === 'dark' || currentTheme.name === 'midnight' || currentTheme.name === 'sunset';
    const starColor = isDark ? '255, 255, 255' : '58, 58, 60';

    const createStar = () => {
      // Random chance to create a star (rare)
      if (Math.random() > 0.003) return; // ~0.3% chance per frame

      const angle = Math.PI / 4 + (Math.random() - 0.5) * 0.3; // Mostly diagonal
      stars.push({
        x: Math.random() * canvas.width * 0.8,
        y: Math.random() * canvas.height * 0.4,
        length: Math.random() * 80 + 40,
        speed: Math.random() * 8 + 6,
        opacity: Math.random() * 0.4 + 0.2,
        angle,
        active: true,
        trail: [],
      });
    };

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      createStar();

      for (let i = stars.length - 1; i >= 0; i--) {
        const star = stars[i];

        if (!star.active) {
          stars.splice(i, 1);
          continue;
        }

        // Update position
        star.x += Math.cos(star.angle) * star.speed;
        star.y += Math.sin(star.angle) * star.speed;

        // Add to trail
        star.trail.unshift({ x: star.x, y: star.y, opacity: star.opacity });
        if (star.trail.length > star.length / 2) {
          star.trail.pop();
        }

        // Draw trail
        for (let j = 0; j < star.trail.length; j++) {
          const point = star.trail[j];
          const trailOpacity = point.opacity * (1 - j / star.trail.length);
          const size = 2 * (1 - j / star.trail.length);

          ctx.beginPath();
          ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${starColor}, ${trailOpacity})`;
          ctx.fill();
        }

        // Deactivate if off screen
        if (star.x > canvas.width + 100 || star.y > canvas.height + 100) {
          star.active = false;
        }
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
      style={{ zIndex: 6 }}
    />
  );
}
