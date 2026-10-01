type MarkProps = { className?: string };

/** Drawn to match Flyleaf's monoline language. Clox has no logo of its own yet. */
export default function CloxMark({ className }: MarkProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} role="img" aria-label="Clox">
      <path
        d="M32 15 a17 17 0 1 0 0.01 0 Z M32 22 v10 h9"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
