import { companies } from '@/lib/content';
import AlsoBuilt from './AlsoBuilt';
import ClosingVerse from './ClosingVerse';
import ProductRow from './ProductRow';
import SectionLabel from './SectionLabel';
import WritingSection from './WritingSection';

export default function Feed() {
  let revealIndex = 0;

  return (
    <div className="min-w-0 px-5 pb-8 pt-7 sm:px-10 sm:pb-11 sm:pt-11">
      {companies.map((company, companyIndex) => (
        <section key={company.name} className={companyIndex > 0 ? 'mt-9 sm:mt-11' : undefined}>
          <div className="reveal" style={{ '--i': revealIndex++ } as React.CSSProperties}>
            <SectionLabel mark={company.mark} role={company.role}>
              {company.name}
            </SectionLabel>
          </div>
          <ul>
            {company.products.map((product) => (
              <ProductRow key={product.name} product={product} index={revealIndex++} />
            ))}
          </ul>
        </section>
      ))}
      <WritingSection />
      <div className="reveal" style={{ '--i': revealIndex++ } as React.CSSProperties}>
        <ClosingVerse />
      </div>
      <div className="reveal" style={{ '--i': revealIndex++ } as React.CSSProperties}>
        <AlsoBuilt />
      </div>
    </div>
  );
}
