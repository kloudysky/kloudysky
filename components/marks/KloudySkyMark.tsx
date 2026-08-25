type MarkProps = { className?: string };

/** Drawn to match Flyleaf's monoline language. A horizon with something rising over it. */
export default function KloudySkyMark({ className }: MarkProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} role="img" aria-label="KloudySky">
      <path
        pathLength={1}
        d="M13 43 H51 M22 43 a10 10 0 0 1 20 0"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
