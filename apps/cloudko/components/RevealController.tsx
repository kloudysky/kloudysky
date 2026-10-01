'use client';

import { useEffect } from 'react';

/**
 * Arms every `.reveal` and `.rail-lift` on the page with a one-shot entrance.
 * Each element is unobserved as soon as it fires, so scrolling back past it costs nothing.
 * Mounted once; every other component on the page stays a server component.
 */
export default function RevealController() {
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>('.reveal, .rail-lift');

    if (!('IntersectionObserver' in window)) {
      targets.forEach((node) => node.classList.add('in'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.15 },
    );

    targets.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return null;
}
