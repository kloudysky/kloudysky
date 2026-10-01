import { marks, type MarkKey } from './marks';

type ProductMarkProps = {
  mark: MarkKey;
  /** Tints single-colour marks via currentColor. Full-colour marks ignore it. */
  accent?: string | null;
  className?: string;
};

export default function ProductMark({ mark, accent, className }: ProductMarkProps) {
  const Mark = marks[mark];
  return (
    <span className={className} style={accent ? { color: accent } : undefined}>
      <Mark className="h-full w-full" />
    </span>
  );
}
