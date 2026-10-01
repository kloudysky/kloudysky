type MarkProps = { className?: string };

/** Canonical Flyleaf mark, from typewriter/docs/design/flyleaf-logo. Three lines of verse, the last breaks free. */
export default function FlyleafMark({ className }: MarkProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} role="img" aria-label="Flyleaf">
      <path
        d="M19 44 H45 M19 35 H40 M19 26 H32 L47 13"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
