'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { AMENITIES, AMENITY_TAGS } from '@/lib/data';

export default function Amenities() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = AMENITIES.length;
  const cur = AMENITIES[i];

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((x) => (x + 1) % n), 5000);
    return () => clearInterval(t);
  }, [paused, n]);

  return (
    <section id="amenities" aria-labelledby="amenities-title" className="wrap bg-violet py-[clamp(56px,8vw,110px)] text-paper">
      <span className="text-[10px] uppercase tracking-[.34em] text-gold">Amenities</span>
      <div className="mt-3.5 flex flex-wrap items-end justify-between gap-4">
        <h2 id="amenities-title" className="m-0 font-serif text-[clamp(38px,4.6vw,68px)] font-light leading-[1.02]">
          A private clubhouse, <em className="text-gold">above the stilt</em>
        </h2>
        <span className="text-[11px] tracking-[.2em] text-paper/75">
          <span className="text-paper">0{i + 1}</span> / 0{n}
        </span>
      </div>

      <div
        className="relative mt-[clamp(22px,3vw,36px)] h-[clamp(420px,46vw,660px)] w-full overflow-hidden bg-deep"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        aria-roledescription="carousel"
      >
        {AMENITIES.map((a, k) => (
          <Image
            key={a.img}
            src={a.img}
            alt={`${a.name} at Vertex Autograph (representative image)`}
            fill
            sizes="100vw"
            className={`object-cover transition-[opacity,transform] duration-1000 ${k === i ? 'scale-[1.04] opacity-100' : 'scale-100 opacity-0'}`}
            style={{ transitionDuration: k === i ? '1000ms, 6000ms' : '1000ms' }}
          />
        ))}
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(30,20,36,.9)_0%,rgba(30,20,36,.28)_45%,rgba(30,20,36,0)_70%)]" />
        {[
          ['left-5', '←', 'Previous amenity', -1],
          ['right-5', '→', 'Next amenity', 1],
        ].map(([pos, ch, label, d]) => (
          <button
            key={label as string}
            type="button"
            aria-label={label as string}
            onClick={() => setI((x) => (x + n + (d as number)) % n)}
            className={`absolute ${pos} top-1/2 h-11 w-11 -translate-y-1/2 rounded-full border border-paper/60 bg-deep/45 text-base text-paper transition-colors hover:border-gold hover:bg-gold hover:text-deep`}
          >
            {ch}
          </button>
        ))}
        <div aria-live="polite" className="absolute bottom-[clamp(20px,3.4vw,44px)] left-[clamp(20px,3.4vw,40px)] right-[clamp(20px,3.4vw,40px)] flex max-w-[560px] flex-col items-start gap-3">
          <span className="whitespace-nowrap border border-gold/80 px-3 py-[7px] text-[9px] uppercase tracking-[.24em] text-champagne">{cur.tag}</span>
          <h3 className="m-0 font-serif text-[clamp(34px,4vw,58px)] font-light leading-none">{cur.name}</h3>
          <p className="m-0 text-sm leading-[1.65] text-paper/90">{cur.body}</p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2.5">
        {AMENITIES.map((a, k) => (
          <button
            key={a.img}
            type="button"
            aria-label={a.name}
            onClick={() => setI(k)}
            className={`relative h-[60px] w-[96px] overflow-hidden border bg-deep transition ${k === i ? 'border-gold opacity-100' : 'border-paper/20 opacity-55'}`}
          >
            <Image src={a.img} alt="" fill sizes="96px" className="object-cover" />
          </button>
        ))}
      </div>

      <h3 className="sr-only">Full amenity list</h3>
      <ul className="m-0 mt-[clamp(28px,3vw,40px)] flex list-none flex-wrap gap-2.5 p-0">
        {AMENITY_TAGS.map((t) => (
          <li key={t} className="whitespace-nowrap rounded-full border border-paper/30 px-4 py-2 text-[11px] tracking-[.04em]">
            {t}
          </li>
        ))}
      </ul>
      <p className="m-0 mt-5 text-[11px] tracking-[.06em] text-paper/60">Images are representative. Final amenity list shared with the brochure.</p>
    </section>
  );
}
