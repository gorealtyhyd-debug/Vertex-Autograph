'use client';

import Image from 'next/image';
import { useState } from 'react';
import { HOTSPOTS } from '@/lib/data';
import { useEnquiry } from './EnquiryProvider';

export default function MasterPlan() {
  const [hot, setHot] = useState(2);
  const { showImage } = useEnquiry();
  const toggle = (i: number) => setHot((h) => (h === i ? -1 : i));

  return (
    <section id="masterplan" aria-labelledby="mp-title" className="wrap sec relative overflow-hidden bg-violet text-paper">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_30%_50%,rgba(185,163,139,.14)_0%,rgba(44,31,51,0)_70%)]" />
      <div className="relative flex flex-wrap items-end justify-between gap-5">
        <div className="flex flex-col gap-4">
          <span className="eyebrow text-gold">Master plan</span>
          <h2 id="mp-title" className="m-0 font-serif text-[clamp(40px,5vw,78px)] font-light leading-[.98]">
            One iconic tower.
            <br />
            <em className="text-gold">Two private wings.</em>
          </h2>
        </div>
        <p className="m-0 max-w-[40ch] text-sm leading-[1.75] text-paper/80">
          Wing A and Wing B rise around landscaped courts with exclusive lift access to every residence. Tap a marker to explore the site.
        </p>
      </div>

      <div className="relative mt-[clamp(30px,4vw,56px)] flex flex-wrap items-start gap-[clamp(24px,3vw,44px)]">
        <figure className="m-0 min-w-0 flex-[2_1_560px] bg-white p-[clamp(8px,1.4vw,18px)] shadow-[0_40px_90px_-40px_rgba(0,0,0,.6)]">
          <div className="relative aspect-[1280/770] w-full">
            <Image src="/assets/images/site-plan.jpeg" alt="Vertex Autograph site plan — Wing A, Wing B, 150-ft road, driveway and green buffer" fill sizes="(min-width:1024px) 60vw, 100vw" className="object-contain" />
            {HOTSPOTS.map((h, i) => {
              const on = hot === i;
              return (
                <button
                  key={h.title}
                  type="button"
                  onClick={() => toggle(i)}
                  aria-label={h.title}
                  aria-pressed={on}
                  style={{ left: `${h.x}%`, top: `${h.y}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white text-xs font-medium shadow-[0_6px_16px_rgba(30,20,36,.35)] transition-all ${
                    on ? 'h-[34px] w-[34px] bg-gold text-deep ring-[6px] ring-gold/45' : 'h-7 w-7 bg-violet text-paper'
                  }`}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
          <figcaption className="flex flex-wrap items-center justify-between gap-3 px-1 pb-0.5 pt-3 text-[11px] uppercase tracking-[.16em] text-muted">
            <span>Site plan · Not to scale</span>
            <button type="button" onClick={() => showImage('/assets/images/site-plan.jpeg', 'Master site plan')} className="text-[11px] uppercase tracking-[.16em] text-violet">
              Enlarge ↗
            </button>
          </figcaption>
        </figure>

        <ul className="m-0 flex min-w-0 flex-[1_1_300px] list-none flex-col border-t border-paper/20 p-0">
          {HOTSPOTS.map((h, i) => {
            const on = hot === i;
            return (
              <li key={h.title} className="border-b border-paper/15">
                <button type="button" onClick={() => toggle(i)} aria-expanded={on} className="flex w-full items-center gap-4 py-4 text-left text-paper">
                  <span className={`flex h-[30px] w-[30px] flex-none items-center justify-center rounded-full border border-gold text-xs ${on ? 'bg-gold text-deep' : 'bg-violet text-paper'}`}>{i + 1}</span>
                  <span className="flex-1 font-serif text-[clamp(20px,1.8vw,24px)] leading-[1.2]">{h.title}</span>
                  <span className="text-lg text-gold">{on ? '–' : '+'}</span>
                </button>
                <p className={`m-0 pb-5 pl-[46px] text-sm leading-[1.7] text-paper/80 ${on ? '' : 'hidden'}`}>{h.text}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
