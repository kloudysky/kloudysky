export type Product = {
  readonly name: string;
  readonly href: string;
  readonly description: string;
  readonly status: string;
  /** Colour of the dot that marks the row on hover. */
  readonly accent: string;
};

export const studio = {
  name: 'KloudySky',
  kind: 'Software development studio',
  city: 'Austin, TX',
  timeZone: 'America/Chicago',
  summary:
    'A software development studio in Austin, Texas. It builds and runs the products of Aeon Entertainment, Inc. and Syntexa LLC.',
  founder: { name: 'Cloud Ko', href: 'https://cloudko.dev' },
  github: 'https://github.com/Kloudy-Sky',
} as const;

export const products = [
  {
    name: 'Aeon Karaoke',
    href: 'https://aeonkaraoke.com',
    description: 'Karaoke for a room singing together.',
    status: 'Waitlist',
    accent: '#ffffff',
  },
  {
    name: 'Flyleaf',
    href: 'https://flyleaf.ink',
    description: 'A writing partner that reads your draft and leaves the writing to you.',
    status: 'Live',
    accent: '#c96a54',
  },
  {
    name: 'Clox',
    href: 'https://clox.app',
    description: 'Invoicing for freelancers, paid out in sixty seconds.',
    status: 'Launching',
    accent: '#5ee9a0',
  },
  {
    name: 'Syntexa',
    href: 'https://syntexa.chat',
    description: 'A coach for the conversation you have been putting off.',
    status: 'iOS, Android',
    accent: '#ffffff',
  },
  {
    name: 'openintel',
    href: 'https://github.com/Kloudy-Sky/openintel',
    description: 'Search in one SQLite file, with no servers.',
    status: 'Open source',
    accent: '#e8834a',
  },
  {
    name: 'Belovae',
    href: 'https://belovae.com',
    description: 'A dating coach.',
    status: 'In development',
    accent: '#f472b6',
  },
] satisfies readonly Product[];

/**
 * Stored reversed, and reversed back at runtime, so no email-shaped string
 * survives in the markup or the bundle. A minifier folds split parts back
 * together but will not evaluate a runtime reverse. Do not "simplify" this.
 */
export const emailReversed = 'oi.yksyduolk@mada';
