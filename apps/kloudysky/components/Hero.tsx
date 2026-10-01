import CloudMark from '@kloudysky/cloud-mark';
import { studio } from '@/lib/content';

const LETTER_STAGGER_MS = 35;
const WORDMARK_DELAY_MS = 450;

export default function Hero() {
  return (
    <section className="flex flex-col items-center pb-14 pt-10 text-center sm:pt-14">
      {/*
        mark.png is a CSS background, so without JavaScript the still mark shows.
        pan-y keeps the page scrollable when a touch starts on the mark.
      */}
      <div className="mark-fallback relative aspect-square w-[min(84vw,50svh,460px)] cursor-crosshair touch-pan-y select-none bg-[url('/mark.png')] bg-contain bg-no-repeat">
        <CloudMark entrance className="absolute inset-0 h-full w-full" />
      </div>

      <h1 aria-label={studio.name} className="mt-8 text-[44px] font-semibold leading-none tracking-[-0.04em] sm:text-[56px]">
        {[...studio.name].map((letter, index) => (
          <span
            key={index}
            aria-hidden
            className="letter"
            style={{ animationDelay: `${WORDMARK_DELAY_MS + index * LETTER_STAGGER_MS}ms` }}
          >
            {letter}
          </span>
        ))}
      </h1>

      <p className="rise mt-5 max-w-[46ch] text-[15px] leading-[1.6] text-muted" style={{ animationDelay: '800ms' }}>
        {studio.summary}
      </p>
    </section>
  );
}
