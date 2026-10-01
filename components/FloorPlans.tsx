'use client';

import Image from 'next/image';
import { useState } from 'react';
import { UNITS, fmt, planImg, unitId, unitType, wingPlan, type Wing } from '@/lib/data';
import { useEnquiry } from './EnquiryProvider';

export default function FloorPlans() {
  const [wing, setWing] = useState<Wing>('A');
  const [idx, setIdx] = useState(0);
  const { open, showImage } = useEnquiry();
  const list = UNITS.filter((u) => u.wing === wing);
  const u = list[idx];
  const id = unitId(u);
  const planNo = String((wing === 'A' ? 0 : 5) + u.no).padStart(2, '0');
  const title = `Wing ${wing} · Unit ${id} — ${u.bhk}, ${fmt(u.sft)} sq.ft, ${u.face} facing`;

  return (
    <section id="plans" aria-labelledby="plans-title" className="wrap sec bg-paper">
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div className="flex flex-col gap-4">
          <span className="eyebrow text-muted">Floor plans</span>
          <h2 id="plans-title" className="h2">
            Two wings,
            <br />
            <em>ten</em> corner residences.
          </h2>
        </div>
        <p className="m-0 max-w-[36ch] text-sm leading-[1.7] text-muted">Choose a wing, then a residence. Every drawing is the dimensioned typical-floor plan.</p>
      </div>

      <div className="mt-[clamp(36px,4vw,56px)] flex flex-wrap items-start gap-[clamp(20px,3vw,40px)]">
        <div className="flex min-w-0 flex-[1_1_300px] flex-col gap-4">
          <div role="tablist" aria-label="Choose wing" className="flex gap-1 self-start rounded-full border border-violet/20 p-1">
            {(['A', 'B'] as Wing[]).map((w) => (
              <button
                key={w}
                role="tab"
                aria-selected={wing === w}
                type="button"
                onClick={() => {
                  setWing(w);
                  setIdx(0);
                }}
                className={`rounded-full px-6 py-2.5 text-[11px] uppercase tracking-[.2em] transition-colors ${wing === w ? 'bg-violet text-paper' : 'text-violet'}`}
              >
                Wing {w}
              </button>
            ))}
          </div>
          <ul className="m-0 flex list-none flex-col border-t border-violet/25 p-0">
            {list.map((x, i) => {
              const on = i === idx;
              return (
                <li key={unitId(x)}>
                  <button
                    type="button"
                    onClick={() => setIdx(i)}
                    aria-pressed={on}
                    className={`grid w-full grid-cols-[58px_minmax(0,1fr)_18px] items-center gap-3.5 border-b border-violet/15 px-4 py-4 text-left transition-colors ${on ? 'bg-violet text-paper' : 'text-violet'}`}
                  >
                    <span className="font-serif text-[42px] font-light leading-[.9]">{unitId(x)}</span>
                    <span className="flex min-w-0 flex-col gap-1">
                      <span className="text-[10px] uppercase tracking-[.24em] opacity-80">{x.bhk}</span>
                      <span className="text-[17px] font-light">{fmt(x.sft)} sq.ft · {x.face}</span>
                    </span>
                    <span className={`text-sm ${on ? 'opacity-100' : 'opacity-30'}`}>→</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <figure className="m-0 flex min-w-0 flex-[2.4_1_560px] flex-col border border-violet/15 bg-white shadow-[0_40px_80px_-50px_rgba(44,31,51,.5)]">
          <div className="flex flex-wrap items-center justify-between gap-3.5 border-b border-violet/10 px-5 py-4">
            <h3 className="m-0 font-serif text-[22px] font-normal">Wing {wing} · Unit {id}</h3>
            <span className="text-[10px] uppercase tracking-[.26em] text-muted">Plan {planNo} of 10</span>
          </div>
          <button type="button" onClick={() => showImage(planImg(u), title)} className="relative block aspect-[4/3] w-full cursor-zoom-in bg-white">
            <Image src={planImg(u)} alt={`Floor plan of ${title}`} fill sizes="(min-width:1024px) 60vw, 100vw" className="object-contain p-[clamp(10px,2vw,28px)]" />
          </button>
          <dl className="m-0 grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] border-t border-violet/10 bg-paper">
            {[
              ['Residence', `Unit ${id}`],
              ['Configuration', u.bhk],
              ['Saleable area', `${fmt(u.sft)} sq.ft`],
              ['Facing', u.face],
            ].map(([k, v]) => (
              <div key={k} className="flex flex-col gap-1.5 border-r border-violet/10 px-5 py-4">
                <dt className="text-[9px] uppercase tracking-[.26em] text-muted">{k}</dt>
                <dd className="m-0 font-serif text-[26px] leading-none">{v}</dd>
              </div>
            ))}
          </dl>
          <figcaption className="flex flex-wrap items-center justify-between gap-3.5 border-t border-violet/10 px-5 py-4">
            <button type="button" onClick={() => showImage(wingPlan(wing), `Typical floor plan — Wing ${wing}`)} className="text-xs text-muted underline underline-offset-4">
              View full typical floor · Wing {wing}
            </button>
            <div className="flex flex-wrap gap-2.5">
              <button type="button" onClick={() => showImage(planImg(u), title)} className="btn-line-dark !px-5 !py-3 !text-[11px] !tracking-[.18em]">
                Enlarge
              </button>
              <button type="button" onClick={() => open(`Wing ${wing} · Unit ${id} · cost sheet`, unitType(u))} className="btn-dark !px-6 !py-3 !text-[11px] !tracking-[.18em]">
                Get cost sheet
              </button>
            </div>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
