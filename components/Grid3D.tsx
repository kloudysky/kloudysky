"use client";

import { useEffect, useRef } from 'react';

export default function Grid3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    let animationId: number;
    let offset = 0;

    const draw = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      ctx.clearRect(0, 0, width, height);

      // Horizon at upper-middle - KloudySky sits above this like sun/moon
      const horizonY = height * 0.35;
      const vanishingX = width / 2;
      const gridSpacing = 60;

      // Subtle horizon glow
      const glow = ctx.createLinearGradient(0, horizonY - 20, 0, horizonY + 20);
      glow.addColorStop(0, 'rgba(100, 100, 100, 0)');
      glow.addColorStop(0.5, 'rgba(100, 100, 100, 0.15)');
      glow.addColorStop(1, 'rgba(100, 100, 100, 0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, horizonY - 20, width, 40);

      // Draw CURVED horizontal lines (arcing DOWN like horizon)
      for (let i = 0; i < 30; i++) {
        const z = i * gridSpacing + (offset % gridSpacing);
        const perspectiveScale = 400 / (400 + z);

        const y = horizonY + (height - horizonY) * (1 - perspectiveScale);

        // Fade out in bottom 20% of screen
        const fadeStart = height * 0.75;
        if (y >= height || perspectiveScale < 0.02 || y > fadeStart) continue;

        const lineWidth = width * perspectiveScale * 0.9;
        let alpha = Math.min(0.5, perspectiveScale * 0.6);

        // Curvature DOWN (negative) like Earth's horizon
        const curvature = (1 - perspectiveScale) * -35;

        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.lineWidth = 1.2;

        ctx.beginPath();
        ctx.moveTo(vanishingX - lineWidth, y);
        // Quadratic curve DOWNWARD for horizon effect
        ctx.quadraticCurveTo(
          vanishingX,
          y + curvature,
          vanishingX + lineWidth,
          y
        );
        ctx.stroke();
      }

      // Draw CURVED vertical lines converging to vanishing point (spherical)
      const numVertical = 18;
      const fadeStart = height * 0.75; // Stop before bottom 25%

      for (let i = -numVertical; i <= numVertical; i++) {
        if (i === 0) continue;

        const xAtBottom = vanishingX + (i * gridSpacing);

        // Curve outward more at edges for spherical effect
        const distFromCenter = Math.abs(i) / numVertical;
        const curvature = distFromCenter * width * 0.08;
        const curveDir = i > 0 ? 1 : -1;

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.lineWidth = 1;

        ctx.beginPath();
        ctx.moveTo(vanishingX, horizonY);
        // Quadratic curve for spherical effect - end at fadeStart, not height
        ctx.quadraticCurveTo(
          vanishingX + (curveDir * curvature),
          (horizonY + fadeStart) / 2,
          xAtBottom * (fadeStart / height),
          fadeStart
        );
        ctx.stroke();
      }

      offset += 0.5;
      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute bottom-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: 10 }}
    />
  );
}
