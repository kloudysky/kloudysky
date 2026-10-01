'use client';

import { useEffect, useRef } from 'react';
import { emailReversed } from '@/lib/content';

/**
 * Builds the mailto after mount so the address never ships in the markup.
 * Without JavaScript the anchor has no href and is inert.
 */
export default function EmailLink({ className }: { className?: string }) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const anchor = ref.current;
    if (!anchor) return;
    const address = [...emailReversed].reverse().join('');
    anchor.href = `mailto:${address}`;
    anchor.title = address;
  }, []);

  return (
    <a ref={ref} className={className}>
      Email
    </a>
  );
}
