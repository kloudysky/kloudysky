type MarkProps = { className?: string };

/** Drawn to match Flyleaf's monoline language. Two retrieval curves fusing into one, after reciprocal rank fusion. */
export default function OpenintelMark({ className }: MarkProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} role="img" aria-label="openintel">
      <path
        d="M15 19 Q34 32 49 32 M15 45 Q34 32 49 32"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
