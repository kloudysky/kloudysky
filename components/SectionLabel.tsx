import ProductMark from './ProductMark';
import type { MarkKey } from './marks';

type SectionLabelProps = {
  children: React.ReactNode;
  mark?: MarkKey | null;
  role?: string;
};

export default function SectionLabel({ children, mark, role }: SectionLabelProps) {
  return (
    <h2 className="flex items-center gap-3 font-[family-name:var(--font-jetbrains-mono)] text-[10px] uppercase tracking-[0.15em] text-faint">
      {mark && <ProductMark mark={mark} className="block h-[15px] w-[15px] shrink-0" />}
      {children}
      {role && <span className="opacity-70">{role}</span>}
      <span aria-hidden className="h-px flex-1 bg-hair" />
    </h2>
  );
}
