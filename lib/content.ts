import type { MarkKey } from '@/components/marks';
import type { SocialIconKey } from '@/components/social';

export type Product = {
  readonly name: string;
  readonly label: string;
  readonly href: string;
  readonly description: string;
  readonly stack: readonly string[];
  readonly metric: string;
  readonly metricLabel: string;
  /** Large for headline traction, small for status that should not shout. */
  readonly metricSize: 'lg' | 'sm';
  readonly mark: MarkKey;
  /** Tint for single-colour marks. Null leaves full-colour marks untouched. */
  readonly accent: string | null;
};

export type Company = {
  readonly name: string;
  readonly role: string;
  readonly mark: MarkKey | null;
  readonly products: readonly Product[];
};

export type Post = {
  readonly title: string;
  readonly date: string;
  readonly href: string;
};

export const intro = {
  name: 'Cloud Ko',
  location: 'Austin, Texas',
  thesis: 'Engineering is what I do. Not what I stay alive for.',
  sub: "I'm an engineer at Amazon and father of 2 doppelgängers. Just trying to contribute a verse to the world.",
} as const;

/** Closes the page, after the products have already spoken for themselves. */
export const closing = {
  body: 'Building services for writing, for a room singing together, and for love. The other three pay for those.',
  signoff: 'The powerful play goes on. These are my contributing verses.',
} as const;

export const companies = [
  {
    name: 'Aeon Entertainment',
    role: 'Founder & CEO',
    mark: 'aeonEntertainment',
    products: [
      {
        name: 'Aeon Karaoke',
        label: 'aeonkaraoke.com',
        href: 'https://aeonkaraoke.com',
        description: 'Everyone sounds good, so nobody has to sit out. That was the whole idea.',
        stack: ['TypeScript', 'Python', 'Convex', 'WebRTC'],
        metric: '100+',
        metricLabel: 'waitlist',
        metricSize: 'lg',
        mark: 'aeonKaraoke',
        accent: null,
      },
    ],
  },
  {
    name: 'Syntexa LLC',
    role: 'Founder',
    mark: null,
    products: [
      {
        name: 'Flyleaf',
        label: 'flyleaf.ink',
        href: 'https://flyleaf.ink',
        description: "A writing partner that has read the thing. It won't write it for you.",
        stack: ['TypeScript', 'Rust', 'Tauri', 'Convex'],
        metric: 'Live',
        metricLabel: 'paying',
        metricSize: 'lg',
        mark: 'flyleaf',
        accent: '#c96a54',
      },
      {
        name: 'Clox',
        label: 'clox.app',
        href: 'https://clox.app',
        description: 'Freelancers get paid in sixty seconds and we never touch a cent of it.',
        stack: ['TypeScript', 'Convex', 'Stripe Connect'],
        metric: 'Oct 1',
        metricLabel: 'launching',
        metricSize: 'lg',
        mark: 'clox',
        accent: '#5ee9a0',
      },
      {
        name: 'Syntexa',
        label: 'syntexa.chat',
        href: 'https://syntexa.chat',
        description: "For the conversation you've been putting off. It wants you to stop needing it.",
        stack: ['React Native', 'Expo', 'Convex', 'RevenueCat'],
        metric: 'iOS · Android',
        metricLabel: 'both stores',
        metricSize: 'sm',
        mark: 'syntexa',
        accent: null,
      },
      {
        name: 'openintel',
        label: 'github',
        href: 'https://github.com/Kloudy-Sky/openintel',
        description: 'One SQLite file, no servers, and it finds what you meant.',
        stack: ['Rust', 'hexagonal', 'zero infrastructure'],
        metric: 'Public',
        metricLabel: 'open source',
        metricSize: 'sm',
        mark: 'openintel',
        accent: '#e8834a',
      },
      {
        name: 'Belovae',
        label: 'belovae.com',
        href: 'https://belovae.com',
        description: 'A dating coach whose job is to become unnecessary.',
        stack: ['TypeScript', 'Bedrock', 'Clerk'],
        metric: 'Building',
        metricLabel: '2026',
        metricSize: 'sm',
        mark: 'belovae',
        accent: '#f472b6',
      },
    ],
  },
] satisfies readonly Company[];

/** Empty until the first post ships. The writing section hides itself while this is empty. */
export const posts: readonly Post[] = [];

export const alsoBuilt = {
  summary: 'Seven more are shut down. Experimenting is fun and not everything needs to make money.',
  names: ['note2bill', 'cibello', 'keptivo', 'PropelOps', 'bard', 'signal', 'rhythm'],
} as const;

export const contact = {
  followLabel: 'Come find me',
  email: 'adam@kloudysky.io',
  socials: [
    { name: 'X', href: 'https://x.com/cloud_ko_', icon: 'x' },
    { name: 'Bluesky', href: 'https://bsky.app/profile/kloudysky.io', icon: 'bluesky' },
    { name: 'GitHub', href: 'https://github.com/kloudysky', icon: 'github' },
    { name: 'LinkedIn', href: 'https://linkedin.com/in/kloudysky', icon: 'linkedin' },
  ],
} satisfies {
  readonly followLabel: string;
  readonly email: string;
  readonly socials: readonly { name: string; href: string; icon: SocialIconKey }[];
};
