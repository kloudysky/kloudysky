'use client';

import { useEffect, useState } from 'react';

/** The studio's wall clock. Renders after mount and ticks once a minute, on the minute. */
export default function LocalTime({ timeZone }: { timeZone: string }) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const format = new Intl.DateTimeFormat('en-US', { timeZone, hour: '2-digit', minute: '2-digit', hourCycle: 'h23' });
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      setTime(format.format(new Date()));
      timer = setTimeout(tick, 60_000 - (Date.now() % 60_000));
    };
    tick();
    return () => clearTimeout(timer);
  }, [timeZone]);

  return <time className="tabular-nums text-white">{time}</time>;
}
