type MarkProps = { className?: string };

/** Canonical Aeon Karaoke spiral, copied from aeon-karaoke/docs/brand/assets. Its brand doc says never recolour it. */
export default function AeonKaraokeMark({ className }: MarkProps) {
  return (
    <svg viewBox="0 0 1024 1024" className={className} role="img" aria-label="Aeon Karaoke">
      <clipPath id="ak-disc"><circle cx="512" cy="512" r="512"/></clipPath>
      <clipPath id="ak-blue"><circle cx="512" cy="512" r="189"/></clipPath>
      <g clipPath="url(#ak-disc)">
      <path d="M 0 512 a 512 512 0 1 0 1024 0 a 512 512 0 1 0 -1024 0 Z" fill="#FFCC00" fillRule="evenodd"/>
      <path d="M 760.9 263.1 A 352 352 0 1 0 263.1 760.9 l 1697.06 1697.06 l 497.8 -497.8 Z" fill="#33CC66" fillRule="evenodd"/>
      <path d="M 160 512 a 352 352 0 1 0 704 0 a 352 352 0 1 0 -704 0 Z M 215 512 a 297 297 0 1 0 594 0 a 297 297 0 1 0 -594 0 Z" fill="#FFFFFF" fillRule="evenodd"/>
      <path d="M 215 512 a 297 297 0 1 0 594 0 a 297 297 0 1 0 -594 0 Z M 268 512 a 244 244 0 1 0 488 0 a 244 244 0 1 0 -488 0 Z" fill="#33CC66" fillRule="evenodd"/>
      <path d="M 684.53 339.47 A 244 244 0 1 0 339.47 684.53 l 1697.06 1697.06 l 345.07 -345.07 Z" fill="#009933" fillRule="evenodd"/>
      <path d="M 864 512 A 352 352 0 0 0 160 512 L 215 512 A 297 297 0 0 1 809 512 Z" fill="#FFFFFF" fillRule="evenodd"/>
      <path d="M 53 512 A 459 459 0 1 0 511.2 53 L 511.3 109 A 403 403 0 1 1 109 512 Z" fill="#FFFFFF" fillRule="evenodd"/>
      <path d="M 760.9 263.1 A 352 352 0 0 0 566.55 164.25 L 511.3 109 A 403 403 0 0 1 899.65 401.85 Z" fill="#FF6633" fillRule="evenodd"/>
      <path d="M 263.1 760.9 A 352 352 0 0 1 164.38 567.38 L 109 512 A 403 403 0 0 0 401.85 899.65 Z" fill="#FF6633" fillRule="evenodd"/>
      <path d="M 347.85 996.97 A 512 512 0 0 0 996.97 347.85 L 836.56 187.44 A 459 459 0 0 1 187.44 836.56 Z" fill="#FF6633" fillRule="evenodd"/>
      <path d="M 268 512 a 244 244 0 1 0 488 0 a 244 244 0 1 0 -488 0 Z M 323 512 a 189 189 0 1 0 378 0 a 189 189 0 1 0 -378 0 Z" fill="#FFFFFF" fillRule="evenodd"/>
      <path d="M 323 512 a 189 189 0 1 0 378 0 a 189 189 0 1 0 -378 0 Z" fill="#6666FF" fillRule="evenodd"/>
      <path d="M 375.5 512 A 136.5 136.5 0 0 1 608.52 415.48 l 1697.06 1697.06 l -233.02 96.52 Z" fill="#330099" fillRule="evenodd" clipPath="url(#ak-blue)"/>
      <path d="M 648.5 512 A 136.5 136.5 0 0 0 375.5 512 L 430 512 A 82 82 0 0 1 594 512 Z" fill="#FFFFFF" fillRule="evenodd"/>
      </g>
    </svg>
  );
}
