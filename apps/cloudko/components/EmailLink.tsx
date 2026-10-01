'use client';

import { useEffect, useRef } from 'react';
import { emailReversed } from '@/lib/content';
import { socialIcons } from './social';

const EmailIcon = socialIcons.email;

/**
 * Builds the mailto after mount so the address never ships in the markup, and
 * un-reverses it at runtime so it never appears intact in the bundle either.
 * Without JavaScript the anchor has no href and is inert, which is the trade for
 * keeping the address out of the HTML entirely.
 */
export default function EmailLink({ className }: { className?: string }) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const address = [...emailReversed].reverse().join('');
    const anchor = ref.current;
    if (!anchor) return;
    anchor.href = `mailto:${address}`;
    anchor.title = address;
  }, []);

  return (
    <a ref={ref} aria-label="Email" className={className}>
      <EmailIcon className="h-[15px] w-auto shrink-0" />
    </a>
  );
}
