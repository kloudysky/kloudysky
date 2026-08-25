import BlueskyIcon from './BlueskyIcon';
import GitHubIcon from './GitHubIcon';
import LinkedInIcon from './LinkedInIcon';
import XIcon from './XIcon';

/** Social logos, keyed by what `lib/content` refers to. */
export const socialIcons = {
  x: XIcon,
  bluesky: BlueskyIcon,
  github: GitHubIcon,
  linkedin: LinkedInIcon,
} as const;

export type SocialIconKey = keyof typeof socialIcons;
