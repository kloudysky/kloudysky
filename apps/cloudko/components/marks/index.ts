import AeonEntertainmentMark from './AeonEntertainmentMark';
import AeonKaraokeMark from './AeonKaraokeMark';
import BelovaeMark from './BelovaeMark';
import CloxMark from './CloxMark';
import FlyleafMark from './FlyleafMark';
import OpenintelMark from './OpenintelMark';
import SyntexaMark from './SyntexaMark';

/**
 * Registry of every brand mark on the site. Keys are what `lib/content` refers to,
 * so adding a product means adding a component here and nothing else.
 */
export const marks = {
  aeonEntertainment: AeonEntertainmentMark,
  aeonKaraoke: AeonKaraokeMark,
  belovae: BelovaeMark,
  clox: CloxMark,
  flyleaf: FlyleafMark,
  openintel: OpenintelMark,
  syntexa: SyntexaMark,
} as const;

export type MarkKey = keyof typeof marks;
