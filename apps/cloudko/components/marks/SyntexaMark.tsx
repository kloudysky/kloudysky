type MarkProps = { className?: string };

/** Syntexa coral double spiral, from syntexa/brand/mark-color.svg. */
export default function SyntexaMark({ className }: MarkProps) {
  return (
    <svg viewBox="0 0 200 200" className={className} role="img" aria-label="Syntexa">
      <g transform="scale(-1,1) translate(-200,0)"><g transform="rotate(112,100,100)">
      <path d="M 120 16 C 165 20, 195 60, 190 105 C 186 140, 160 165, 130 160 C 105 156, 95 135, 105 115 C 112 100, 130 95, 142 105 C 150 112, 148 125, 138 132 C 158 128, 172 110, 175 88 C 178 60, 158 35, 130 28 C 125 27, 120 27, 115 28 Z" fill="#FF6B6B"/>
      <path d="M 80 184 C 35 180, 5 140, 10 95 C 14 60, 40 35, 70 40 C 95 44, 105 65, 95 85 C 88 100, 70 105, 58 95 C 50 88, 52 75, 62 68 C 42 72, 28 90, 25 112 C 22 140, 42 165, 70 172 C 75 173, 80 173, 85 172 Z" fill="#FFB4B4"/>
      </g></g>
    </svg>
  );
}
