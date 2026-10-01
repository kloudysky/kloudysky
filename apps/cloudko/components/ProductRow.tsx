import type { Product } from '@/lib/content';
import ProductMark from './ProductMark';

type ProductRowProps = {
  product: Product;
  /** Drives the entrance stagger via the --i custom property. */
  index: number;
};

export default function ProductRow({ product, index }: ProductRowProps) {
  return (
    <li className="reveal" style={{ '--i': index } as React.CSSProperties}>
      <a
        href={product.href}
        className="group grid grid-cols-[28px_1fr] items-baseline gap-x-3 gap-y-1 border-b border-hair py-4 transition-[padding-left,background-color] duration-300 ease-[var(--ease)] hover:bg-white/[0.02] hover:pl-2.5 sm:grid-cols-[26px_1fr_auto] sm:gap-x-4"
      >
        <ProductMark
          mark={product.mark}
          accent={product.accent}
          className="row-span-4 mt-1 block h-[19px] w-[19px] transition-transform duration-300 ease-[var(--ease)] group-hover:scale-110 sm:row-span-3"
        />

        <span className="flex flex-wrap items-baseline gap-x-2.5 text-[15.5px] font-semibold tracking-[-0.014em]">
          {product.name}
          <span className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] font-normal text-faint transition-colors duration-300 group-hover:text-muted">
            {product.label}
          </span>
          <span
            aria-hidden
            className="-translate-x-1.5 text-xs text-faint opacity-0 transition-[opacity,transform] duration-300 ease-[var(--ease)] group-hover:translate-x-0 group-hover:opacity-100"
          >
            →
          </span>
        </span>

        <span className="col-start-2 mt-2 whitespace-nowrap sm:col-start-3 sm:row-span-3 sm:mt-0 sm:self-center sm:pl-4 sm:text-right">
          <span
            className={
              product.metricSize === 'lg'
                ? 'text-lg font-semibold tabular-nums tracking-[-0.02em] sm:block'
                : 'text-[12.5px] font-medium text-muted sm:block'
            }
          >
            {product.metric}
          </span>
          <span className="ml-2 font-[family-name:var(--font-jetbrains-mono)] text-[9.5px] uppercase tracking-[0.1em] text-faint sm:ml-0 sm:mt-1 sm:block">
            {product.metricLabel}
          </span>
        </span>

        <span className="col-start-2 max-w-[54ch] text-[13.5px] leading-[1.58] text-muted">
          {product.description}
        </span>
        <span className="col-start-2 mt-1.5 font-[family-name:var(--font-jetbrains-mono)] text-[10px] uppercase tracking-[0.06em] text-faint">
          {product.stack.join(' · ')}
        </span>
      </a>
    </li>
  );
}
