import { alsoBuilt } from '@/lib/content';
import SectionLabel from './SectionLabel';

export default function AlsoBuilt() {
  return (
    <section className="mt-9 sm:mt-11">
      <SectionLabel>Also built</SectionLabel>
      <p className="mt-3 max-w-[58ch] text-[13.5px] leading-[1.65] text-muted">{alsoBuilt.summary}</p>
      <p className="mt-2.5 font-[family-name:var(--font-jetbrains-mono)] text-[10.5px] leading-[2] tracking-[0.05em] text-faint">
        {alsoBuilt.names.join(' · ')}
      </p>
    </section>
  );
}
