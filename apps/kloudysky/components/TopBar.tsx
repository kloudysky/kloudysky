import { studio } from '@/lib/content';
import DecodeText from './DecodeText';
import LocalTime from './LocalTime';

export default function TopBar() {
  return (
    <header className="rise flex items-baseline justify-between gap-4 whitespace-nowrap pt-6 font-mono text-[10px] uppercase tracking-[0.1em] text-faint sm:text-[11px] sm:tracking-[0.14em]">
      <DecodeText text={studio.kind} />
      <span className="shrink-0">
        {studio.city} <LocalTime timeZone={studio.timeZone} />
      </span>
    </header>
  );
}
