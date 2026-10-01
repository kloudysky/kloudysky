'use client';

import { useEffect, useRef } from 'react';

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/<>[]{}#*+=';
const DURATION_MS = 520;

type Props = {
  text: string;
  className?: string;
  /** Holds the first run back so it lines up with the element's entrance. */
  delayMs?: number;
};

/**
 * Resolves the text left to right out of random glyphs, once on mount and again
 * whenever the nearest `[data-decode-replay]` ancestor is hovered. Use it on
 * monospace text only, where swapping glyphs cannot shift the layout. The real
 * text is in the markup, so it reads correctly before and without JavaScript.
 */
export default function DecodeText({ text, className, delayMs = 0 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let raf: number | null = null;
    const run = () => {
      if (raf !== null) cancelAnimationFrame(raf);
      const start = performance.now();
      const frame = (now: number) => {
        const resolved = Math.floor(((now - start) / DURATION_MS) * text.length);
        if (resolved >= text.length) {
          node.textContent = text;
          raf = null;
          return;
        }
        node.textContent = [...text]
          .map((char, index) =>
            index < resolved || char === ' ' ? char : GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
          )
          .join('');
        raf = requestAnimationFrame(frame);
      };
      raf = requestAnimationFrame(frame);
    };

    const timer = setTimeout(run, delayMs);
    const trigger = node.closest('[data-decode-replay]');
    trigger?.addEventListener('pointerenter', run);

    return () => {
      clearTimeout(timer);
      if (raf !== null) cancelAnimationFrame(raf);
      trigger?.removeEventListener('pointerenter', run);
      node.textContent = text;
    };
  }, [text, delayMs]);

  return (
    <span ref={ref} aria-label={text} className={className}>
      {text}
    </span>
  );
}
