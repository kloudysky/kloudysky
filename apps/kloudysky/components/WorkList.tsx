import { products } from '@/lib/content';
import WorkRow from './WorkRow';

const FIRST_ROW_DELAY_MS = 950;
const ROW_STAGGER_MS = 60;

export default function WorkList() {
  return (
    <section aria-label="Work" className="work pb-14">
      {products.map((product, index) => (
        <WorkRow key={product.name} product={product} delayMs={FIRST_ROW_DELAY_MS + index * ROW_STAGGER_MS} />
      ))}
    </section>
  );
}
