import { contact, intro } from '@/lib/content';
import ProductMark from './ProductMark';
import SocialLinks from './SocialLinks';

export default function Rail() {
  return (
    <aside className="rail-lift flex flex-col border-b border-hair px-5 pb-6 pt-7 sm:sticky sm:top-0 sm:self-start sm:border-b-0 sm:border-r sm:px-8 sm:pb-9 sm:pt-11">
      <div className="flex items-center gap-2.5">
        <ProductMark mark="kloudySky" className="hero-mark block h-[26px] w-[26px] shrink-0" />
        <span className="text-[15px] font-semibold tracking-[-0.01em]">{intro.name}</span>
      </div>

      <p className="mt-1.5 font-[family-name:var(--font-jetbrains-mono)] text-[10px] uppercase tracking-[0.14em] text-faint">
        {intro.location}
      </p>

      <h1 className="mt-6 text-[18px] font-medium leading-[1.45] tracking-[-0.018em] sm:mt-7 sm:text-[19px]">
        {intro.thesis}
      </h1>

      <p className="mt-4 text-[13px] leading-[1.65] text-muted">{intro.sub}</p>

      <div className="min-h-[24px] flex-1 sm:min-h-[36px]" />

      <p className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] uppercase tracking-[0.14em] text-faint">
        {contact.followLabel}
      </p>

      <SocialLinks />

      <a
        href={`mailto:${contact.email}`}
        className="mt-4 font-[family-name:var(--font-jetbrains-mono)] text-[12.5px] text-faint transition-colors hover:text-fg"
      >
        {contact.email}
      </a>
    </aside>
  );
}
