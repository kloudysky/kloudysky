import { closing } from '@/lib/content';

export default function ClosingVerse() {
  return (
    <section className="mt-10 sm:mt-12">
      <p className="max-w-[60ch] text-[14.5px] leading-[1.72] text-muted">{closing.body}</p>
      <p className="mt-5 text-[15.5px] leading-[1.6]">{closing.signoff}</p>
    </section>
  );
}
