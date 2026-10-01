import { posts } from '@/lib/content';
import SectionLabel from './SectionLabel';

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', { month: 'short', day: '2-digit', timeZone: 'UTC' });

/** Renders nothing until the first post exists, so the page never shows an empty section. */
export default function WritingSection() {
  if (posts.length === 0) return null;

  return (
    <section className="mt-9 sm:mt-11">
      <SectionLabel>Writing</SectionLabel>
      <ul className="mt-3">
        {posts.map((post) => (
          <li key={post.href} className="border-b border-hair py-3 text-sm">
            <a href={post.href} className="underline-offset-4 hover:underline">
              {post.title}
            </a>
            <span className="ml-2.5 font-[family-name:var(--font-jetbrains-mono)] text-[11px] text-faint">
              {formatDate(post.date)}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
