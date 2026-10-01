import { studio } from '@/lib/content';
import EmailLink from './EmailLink';

export default function SiteFooter() {
  return (
    <footer
      className="rise mt-auto flex flex-wrap gap-x-6 gap-y-2 pb-8 font-mono text-[11px] uppercase tracking-[0.14em] text-faint"
      style={{ animationDelay: '1400ms' }}
    >
      <span>
        Founded by{' '}
        <a href={studio.founder.href} className="link text-white">
          {studio.founder.name}
        </a>
      </span>
      <a href={studio.github} target="_blank" rel="noopener noreferrer" className="link text-white">
        GitHub
      </a>
      <EmailLink className="link text-white" />
    </footer>
  );
}
