"use client";

import { useEffect, useRef } from 'react';
import { currentTheme } from '@/lib/themes';

export default function Grid3DThree() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const draw = () => {
      time += 0.02;

      const width = window.innerWidth;
      const height = window.innerHeight;
      const dpr = window.devicePixelRatio || 1;

      // Fix pixelation with device pixel ratio
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Arc like a horizon
      const horizonY = height * 0.55;
      const curveScale = 0.45; // Adjust this to scale ALL curvature (lower = flatter)
      const curveAmount = 150 * curveScale;
      // Theme colors
      const gridColor = currentTheme.gridColor;
      const gridColorRgb = currentTheme.gridColorRgb;

      // Breathing glow effect
      const breathe = 0.85 + 0.15 * Math.sin(time * 0.5);

      // Draw glow using shadow blur (smooth, follows curve)
      const glowIntensity = currentTheme.glowIntensity;
      ctx.save();
      ctx.shadowColor = currentTheme.glowColor;
      ctx.shadowBlur = 100 * breathe;
      ctx.shadowOffsetY = -25;
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 3.5;

      ctx.beginPath();
      ctx.moveTo(0, horizonY);
      ctx.quadraticCurveTo(width / 2, horizonY - curveAmount, width, horizonY);
      ctx.stroke();
      ctx.stroke();
      ctx.restore();

      // Horizon line on top (crisp)
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 1;

      ctx.beginPath();
      ctx.moveTo(0, horizonY);
      ctx.quadraticCurveTo(width / 2, horizonY - curveAmount, width, horizonY);
      ctx.stroke();

      // Grid lines below horizon (spherical, fading)
      const gridLines = [
        { yOffset: 12, curveBase: 140, opacity: 0.25 },
        { yOffset: 26, curveBase: 125, opacity: 0.2 },
        { yOffset: 42, curveBase: 110, opacity: 0.15 },
        { yOffset: 60, curveBase: 95, opacity: 0.1 },
        { yOffset: 80, curveBase: 78, opacity: 0.06 },
        { yOffset: 102, curveBase: 60, opacity: 0.03 },
      ];

      for (const line of gridLines) {
        const y = horizonY + line.yOffset;
        const curve = line.curveBase * curveScale;
        ctx.strokeStyle = `rgba(${gridColorRgb}, ${line.opacity})`;
        ctx.lineWidth = 1.5;

        ctx.beginPath();
        ctx.moveTo(0, y);
        // Curves less as it goes down (flattening toward bottom of sphere)
        ctx.quadraticCurveTo(width / 2, y - curve, width, y);
        ctx.stroke();
      }

      // Vertical lines (longitude lines on sphere)
      const numVerticals = 5;
      const gridDepth = 75; // How far down the grid goes

      for (let i = -numVerticals; i <= numVerticals; i++) {
        const ratio = i / numVerticals; // -1 to 1

        // X position - evenly distributed
        const x = width / 2 + ratio * (width * 0.48);

        // Get Y on horizon curve using actual Bezier formula
        const bezierT = x / width;
        const horizonAtX = horizonY - curveAmount * 2 * bezierT * (1 - bezierT);
        const startY = horizonAtX + 3; // Start just below horizon line

        // End Y - follows the bottom grid line curve
        const endY = horizonY + gridDepth - (85 * curveScale) * 2 * bezierT * (1 - bezierT);

        // Gradient fade downward (subtle)
        const grad = ctx.createLinearGradient(x, startY, x, endY);
        grad.addColorStop(0, `rgba(${gridColorRgb}, 0.2)`);
        grad.addColorStop(0.7, `rgba(${gridColorRgb}, 0.12)`);
        grad.addColorStop(1, `rgba(${gridColorRgb}, 0.04)`);

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1;

        // Flat land with pinched/lifted middle - more bow, less convergence
        const converge = ratio * -1; // Minimal convergence (flatter)
        const bowAmount = ratio * 55; // More outward bow in middle (pinched/lifted)
        const endX = x + converge;

        ctx.beginPath();
        ctx.moveTo(x, startY);
        // Control point higher up to create lifted middle effect
        ctx.quadraticCurveTo(x + bowAmount, startY + (endY - startY) * 0.3, endX, endY);
        ctx.stroke();
      }
    };

    const animate = () => {
      draw();
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 10 }}
    />
  );
}
