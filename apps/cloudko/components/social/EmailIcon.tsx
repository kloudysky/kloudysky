type IconProps = { className?: string };

/** Envelope from github.com/phosphor-icons/core (MIT). Near-white to sit with X and GitHub. */
export default function EmailIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 256 256" className={className} aria-hidden="true" focusable="false">
      <path fill="#ededed" d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48Zm-8,144H40V74.19l82.59,75.71a8,8,0,0,0,10.82,0L216,74.19V192Z"/>
    </svg>
  );
}
