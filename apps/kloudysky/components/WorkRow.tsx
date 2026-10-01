import type { Product } from '@/lib/content';
import DecodeText from './DecodeText';

type Props = {
  product: Product;
  delayMs: number;
};

/** One product. Hovering marks it with its accent dot and replays the status decode. */
export default function WorkRow({ product, delayMs }: Props) {
  return (
    <a
      href={product.href}
      target="_blank"
      rel="noopener noreferrer"
      data-decode-replay
      className="work-row rise relative grid grid-cols-[1fr_auto] items-baseline gap-x-6 py-[9px] outline-none sm:grid-cols-[170px_1fr_auto]"
      style={{ animationDelay: `${delayMs}ms` }}
    >
      <span
        aria-hidden
        className="work-dot absolute left-0 top-[18px] h-[6px] w-[6px]"
        style={{ background: product.accent }}
      />
      <span className="work-name text-[15px] font-medium tracking-[-0.01em]">{product.name}</span>
      <span className="order-last col-span-2 text-[14px] text-muted sm:order-none sm:col-span-1">
        {product.description}
      </span>
      <DecodeText
        text={product.status}
        delayMs={delayMs}
        className="text-right font-mono text-[11px] uppercase tracking-[0.12em] text-faint"
      />
    </a>
  );
}
