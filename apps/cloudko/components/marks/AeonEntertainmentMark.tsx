type MarkProps = { className?: string };

/** Parent brand ring, from aeon-entertainment-landing-page/public/favicon.svg. */
export default function AeonEntertainmentMark({ className }: MarkProps) {
  return (
    <svg viewBox="0 0 100 100" className={className} role="img" aria-label="Aeon Entertainment">
      <defs>
      <linearGradient id="ae-grad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor="#ffffff"/>
      <stop offset=".5" stopColor="#c8d0dc"/>
      <stop offset="1" stopColor="#9aa4b2"/>
      </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="50" fill="#0b0d12"/>
      <circle cx="50" cy="50" r="29" fill="none" stroke="url(#ae-grad)" strokeWidth="6"/>
      <circle cx="50" cy="50" r="6" fill="#ffffff"/>
    </svg>
  );
}
