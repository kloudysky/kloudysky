'use client';

import { useEffect, useRef } from 'react';

/** Phosphor's cloud path (MIT), used as the mask the dot field is punched around. */
const CLOUD_PATH =
  'M160,40A88.09,88.09,0,0,0,81.29,88.67,64,64,0,1,0,72,216h88a88,88,0,0,0,0-176Zm0,160H72a48,48,0,0,1,0-96c1.1,0,2.2,0,3.29.11A88,88,0,0,0,72,128a8,8,0,0,0,16,0,72,72,0,1,1,72,72Z';

const GRID = 96;
/** Linear-derived interaction constants: pointer radius, max displacement, easing. */
const POINTER_RADIUS = 100;
const MAX_DISPLACE = 40;
const EASE = 0.12;
const SHOCKWAVE = { speed: 225, width: 37, strength: 20, duration: 675 } as const;
/** Pull-heavy spiral: mostly gathering, slight curl. */
const SPIN = 0.55;
const PULL = 0.95;
/** Glow inside the cloud. Radius stays well under the cloud's half-extent or the
 *  silhouette washes out into the surrounding field and reads as an outline. */
const GLOW_RADIUS = 0.18;
const CORE_RADIUS = 0.058;

const BAYER = [
  [0, 32, 8, 40, 2, 34, 10, 42], [48, 16, 56, 24, 50, 18, 58, 26],
  [12, 44, 4, 36, 14, 46, 6, 38], [60, 28, 52, 20, 62, 30, 54, 22],
  [3, 35, 11, 43, 1, 33, 9, 41], [51, 19, 59, 27, 49, 17, 57, 25],
  [15, 47, 7, 39, 13, 45, 5, 37], [63, 31, 55, 23, 61, 29, 53, 21],
];

type Field = { mask: Uint8Array; cx: number; cy: number };

/** Rasterise the cloud at grid resolution and read it back, so the mask can never
 *  drift from the offline render the icons were generated from. */
function buildField(): Field | null {
  const off = document.createElement('canvas');
  off.width = GRID;
  off.height = GRID;
  const ctx = off.getContext('2d');
  if (!ctx) return null;

  const k = (GRID / 256) * 0.8;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.translate((GRID - 256 * k) / 2, (GRID - 256 * k) / 2 + GRID * 0.05);
  ctx.scale(k, k);
  ctx.fillStyle = '#fff';
  ctx.fill(new Path2D(CLOUD_PATH));

  const pixels = ctx.getImageData(0, 0, GRID, GRID).data;
  const mask = new Uint8Array(GRID * GRID);
  let sx = 0, sy = 0, count = 0;
  for (let i = 0; i < GRID * GRID; i++) {
    if (pixels[i * 4 + 3] > 127) {
      mask[i] = 1;
      sx += i % GRID;
      sy += Math.floor(i / GRID);
      count++;
    }
  }
  return count ? { mask, cx: sx / count, cy: sy / count } : null;
}

const CORNER = Math.round(GRID * 0.22);
const inTile = (cx: number, cy: number) => {
  if ((CORNER <= cx && cx < GRID - CORNER) || (CORNER <= cy && cy < GRID - CORNER)) return true;
  const ax = cx < CORNER ? CORNER : GRID - CORNER - 1;
  const ay = cy < CORNER ? CORNER : GRID - CORNER - 1;
  return (cx - ax) ** 2 + (cy - ay) ** 2 <= CORNER * CORNER;
};

export default function CloudMark({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const field = buildField();
    if (!field) return;

    let w = 0, h = 0, cell = 0, ox = 0, oy = 0, dot = 0;
    let fx: number[] = [], fy: number[] = [], fdx: number[] = [], fdy: number[] = [], fb: number[] = [];
    let kx: number[] = [], ky: number[] = [], kdx: number[] = [], kdy: number[] = [], kb: number[] = [], kv: number[] = [];
    let px = -9999, py = -9999, active = false, charge = 0, raf: number | null = null;
    let waves: { x: number; y: number; t: number; k: number }[] = [];

    const setup = () => {
      const rect = canvas.getBoundingClientRect();
      w = Math.max(1, Math.round(rect.width));
      h = Math.max(1, Math.round(rect.height));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cell = Math.min(w, h) / GRID;
      ox = (w - GRID * cell) / 2;
      oy = (h - GRID * cell) / 2;
      dot = cell * 0.5;
      fx = []; fy = []; fdx = []; fdy = []; fb = [];
      kx = []; ky = []; kdx = []; kdy = []; kb = []; kv = [];

      for (let cy = 0; cy < GRID; cy++) {
        for (let cx = 0; cx < GRID; cx++) {
          if (!inTile(cx, cy)) continue;
          const threshold = (BAYER[cy & 7][cx & 7] + 0.5) / 64;
          const x = ox + cx * cell;
          const y = oy + cy * cell;

          if (!field.mask[cy * GRID + cx]) {
            if (1 > threshold) { fx.push(x); fy.push(y); fdx.push(0); fdy.push(0); fb.push(1); }
            continue;
          }
          const d = Math.hypot(cx - field.cx, cy - field.cy);
          let value: number;
          if (d < GRID * CORE_RADIUS) value = 1;
          else {
            const t = d / (GRID * GLOW_RADIUS);
            value = Math.max(0, Math.min(1, 1 - t * t));
          }
          kx.push(x); ky.push(y); kdx.push(0); kdy.push(0); kb.push(1); kv.push(value / threshold);
        }
      }
    };

    const paint = () => {
      ctx.clearRect(0, 0, w, h);
      const bins = new Map<number, [number, number][]>();
      const push = (b: number, x: number, y: number) => {
        const key = Math.round(b * 16) / 16;
        const bin = bins.get(key);
        if (bin) bin.push([x, y]); else bins.set(key, [[x, y]]);
      };
      for (let i = 0; i < fx.length; i++) push(fb[i], fx[i] + fdx[i], fy[i] + fdy[i]);
      const gain = 1 + charge * 1.7;
      for (let i = 0; i < kx.length; i++) {
        if (kv[i] * gain > 1) push(kb[i], kx[i] + kdx[i], ky[i] + kdy[i]);
      }
      bins.forEach((points, alpha) => {
        ctx.fillStyle = `rgba(237,237,237,${alpha})`;
        for (const [x, y] of points) ctx.fillRect(x, y, dot, dot);
      });
    };

    const advance = (
      X: number[], Y: number[], DX: number[], DY: number[], B: number[], now: number, scale: number,
    ) => {
      const spin = SPIN * (0.3 + charge * 1.3);
      const pull = PULL * (0.3 + charge * 1.3);
      let moving = false;
      for (let i = 0; i < X.length; i++) {
        let tx = 0, ty = 0;
        if (active) {
          const dx = X[i] - px, dy = Y[i] - py;
          const d = Math.hypot(dx, dy);
          const r = POINTER_RADIUS * scale;
          if (d < r && d > 0.01) {
            const f = ((1 - d / r) * MAX_DISPLACE * scale) / d;
            tx += (-dy * spin - dx * pull) * f;
            ty += (dx * spin - dy * pull) * f;
          }
        }
        for (const wave of waves) {
          const age = now - wave.t;
          if (age > SHOCKWAVE.duration) continue;
          const ring = (age / 1000) * SHOCKWAVE.speed * scale * wave.k;
          const dx = X[i] - wave.x, dy = Y[i] - wave.y;
          const d = Math.hypot(dx, dy);
          const offset = Math.abs(d - ring);
          if (offset < SHOCKWAVE.width * scale && d > 0.01) {
            const q =
              ((1 - offset / (SHOCKWAVE.width * scale)) * (1 - age / SHOCKWAVE.duration) *
                SHOCKWAVE.strength * scale * wave.k) / d;
            tx += dx * q; ty += dy * q;
          }
        }
        DX[i] += (tx - DX[i]) * EASE;
        DY[i] += (ty - DY[i]) * EASE;
        const magnitude = Math.abs(DX[i]) + Math.abs(DY[i]);
        B[i] = Math.max(0.25, Math.min(1, 1 - magnitude * 0.02));
        if (magnitude > 0.05) moving = true;
      }
      return moving;
    };

    const frame = (now: number) => {
      raf = null;
      const scale = Math.min(w, h) / 280;
      charge = active ? Math.min(1, charge + 0.011) : Math.max(0, charge - 0.028);
      const a = advance(fx, fy, fdx, fdy, fb, now, scale);
      const b = advance(kx, ky, kdx, kdy, kb, now, scale);
      waves = waves.filter((wave) => now - wave.t <= SHOCKWAVE.duration);
      paint();
      if (active || a || b || waves.length || charge > 0.001) raf = requestAnimationFrame(frame);
    };
    const wake = () => { if (raf === null) raf = requestAnimationFrame(frame); };

    setup();
    paint();

    const observer = new ResizeObserver(() => { setup(); paint(); });
    observer.observe(canvas);

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      const rect = canvas.getBoundingClientRect();
      px = e.clientX - rect.left; py = e.clientY - rect.top; active = true; wake();
    };
    const onLeave = () => { active = false; wake(); };
    const onUp = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      waves.push({
        x: e.clientX - rect.left, y: e.clientY - rect.top,
        t: performance.now(), k: 1 + charge * 2.4,
      });
      charge = 0;
      wake();
    };
    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerleave', onLeave);
    canvas.addEventListener('pointerup', onUp);

    return () => {
      if (raf !== null) cancelAnimationFrame(raf);
      observer.disconnect();
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerleave', onLeave);
      canvas.removeEventListener('pointerup', onUp);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={className} />;
}
