'use client';

import Image from 'next/image';
import { useState } from 'react';
import { FLOOR_RECTS, PRICES, UNITS, cr, fmt, planImg, unitId, unitType, wingPlan, type Wing } from '@/lib/data';
import { useEnquiry } from './EnquiryProvider';

export default function ResidenceFinder() {
  const [wing, setWing] = useState<Wing>('A');
  const [idx, setIdx] = useState(0);
  const { open, showImage } = useEnquiry();
  const list = UNITS.filter((u) => u.wing === wing);
  const u = list[idx];
  const id = unitId(u);

  return (
    <section id="finder" aria-labelledby="finder-title" className="wrap bg-sand py-[clamp(56px,8vw,110px)] text-violet">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3.5">
            <span className="h-px w-[46px] bg-violet" />
            <span className="eyebrow text-muted">Residence finder</span>
          </div>
          <h2 id="finder-title" className="m-0 font-serif text-[clamp(36px,4.4vw,66px)] font-light leading-none">
            Pick your home <em>on the floor plate.</em>
          </h2>
        </div>
        <div className="flex flex-col items-end gap-3">
          <div role="tablist" aria-label="Choose wing" className="flex gap-1 rounded-full border border-violet/30 bg-paper p-1">
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
          <span className="text-[11px] uppercase tracking-[.16em] text-muted">
            {wing === 'A' ? 'Five 4 BHK homes per floor' : 'Two 3 BHK + three 4 BHK per floor'}
          </span>
        </div>
      </div>

      <div className="mt-[clamp(32px,4vw,52px)] flex flex-wrap items-stretch gap-[clamp(24px,3vw,44px)]">
        <div className="flex min-w-0 flex-[1.6_1_520px] flex-col gap-3.5 border border-violet/15 bg-white p-[clamp(14px,2vw,28px)] shadow-[0_40px_80px_-50px_rgba(44,31,51,.55)]">
          <div className="flex flex-wrap items-center justify-between gap-3 text-[10px] uppercase tracking-[.24em] text-muted">
            <span>Typical floor · Wing {wing}</span>
            <span className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 bg-gold" />
              Selected
              <span className="ml-2.5 h-2.5 w-2.5 border border-violet" />
              Tap a home
            </span>
          </div>
          <div className={`relative mx-auto w-full ${wing === 'A' ? 'aspect-[2800/3324] max-w-[620px]' : 'aspect-[2800/1888]'}`}>
            <Image src={wingPlan(wing)} alt={`Vertex Autograph Wing ${wing} typical floor plan`} fill sizes="(min-width:1024px) 60vw, 100vw" className="object-contain" />
            {list.map((x, i) => {
              const [l, t, w, h] = FLOOR_RECTS[wing][i];
              const on = i === idx;
              return (
                <button
                  key={unitId(x)}
                  type="button"
                  onClick={() => setIdx(i)}
                  aria-label={`Unit ${unitId(x)}, ${x.bhk}, ${fmt(x.sft)} sq.ft`}
                  aria-pressed={on}
                  style={{ left: `${l}%`, top: `${t}%`, width: `${w}%`, height: `${h}%` }}
                  className={`absolute flex items-center justify-center transition-colors hover:bg-gold/30 ${on ? 'border-2 border-gold bg-gold/40' : 'border border-dashed border-violet/45 bg-violet/5'}`}
                >
                  <span className={`flex flex-col items-center gap-0.5 px-3 py-2 shadow-[0_10px_24px_-10px_rgba(30,20,36,.6)] ${on ? 'bg-gold text-deep' : 'bg-violet text-paper'}`}>
                    <span className="font-serif text-[clamp(20px,2vw,28px)] leading-none">{unitId(x)}</span>
                    <span className="whitespace-nowrap text-[9px] uppercase tracking-[.14em]">{fmt(x.sft)} sq.ft</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <article aria-live="polite" className="flex min-w-0 flex-[1_1_340px] flex-col bg-violet text-paper">
          <div className="flex flex-wrap items-start justify-between gap-3.5 px-[clamp(24px,3vw,40px)] pt-[clamp(24px,3vw,40px)]">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] uppercase tracking-[.26em] text-gold">Wing {wing} · Unit</span>
              <h3 className="m-0 font-serif text-[clamp(64px,7vw,104px)] font-light leading-[.82]">{id}</h3>
              <span className="font-serif text-[26px] leading-[1.1] text-champagne">{u.bhk}</span>
            </div>
            <span className="whitespace-nowrap border border-gold px-3 py-2 text-[10px] uppercase tracking-[.2em] text-gold">{u.face} facing</span>
          </div>
          <dl className="mx-[clamp(24px,3vw,40px)] mt-6 flex flex-col border-t border-gold/35">
            {[
              ['Saleable area', `${fmt(u.sft)} sq.ft`, ''],
              [`Base at OTP · ₹${fmt(PRICES.otp)}`, cr(u.sft * PRICES.otp), ''],
              [`Base at launch · ₹${fmt(PRICES.launch)}`, cr(u.sft * PRICES.launch), 'text-paper/70'],
            ].map(([k, v, c]) => (
              <div key={k} className="flex items-baseline justify-between gap-3 border-b border-gold/20 py-3.5">
                <dt className="text-[10px] uppercase tracking-[.22em] text-gold">{k}</dt>
                <dd className={`m-0 font-serif text-[26px] ${c}`}>{v}</dd>
              </div>
            ))}
            <div className="-mx-3.5 flex items-baseline justify-between gap-3 bg-gold/15 px-3.5 py-3.5">
              <dt className="text-[10px] uppercase tracking-[.22em] text-champagne">You keep</dt>
              <dd className="m-0 font-serif text-[30px] text-gold">{cr(u.sft * (PRICES.launch - PRICES.otp))}</dd>
            </div>
          </dl>
          <div className="flex flex-wrap gap-2 px-[clamp(24px,3vw,40px)] pt-5">
            {list.map((x, i) => (
              <button
                key={unitId(x)}
                type="button"
                onClick={() => setIdx(i)}
                className={`whitespace-nowrap rounded-full border px-3.5 py-2 text-xs transition-colors ${i === idx ? 'border-gold bg-gold text-deep' : 'border-paper/30 text-paper'}`}
              >
                {unitId(x)} · {fmt(x.sft)}
              </button>
            ))}
          </div>
          <div className="mt-auto grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-2.5 px-[clamp(24px,3vw,40px)] pb-[clamp(24px,3vw,40px)] pt-6">
            <button
              type="button"
              onClick={() => showImage(planImg(u), `Wing ${wing} · Unit ${id} — ${u.bhk}, ${fmt(u.sft)} sq.ft, ${u.face} facing`)}
              className="btn-line-light !px-4 !text-[11px] !tracking-[.16em]"
            >
              View unit plan
            </button>
            <button type="button" onClick={() => open(`Wing ${wing} · Unit ${id} · ${fmt(u.sft)} sq.ft`, unitType(u))} className="btn-gold !px-4 !text-[11px] !tracking-[.16em]">
              Enquire for {id}
            </button>
          </div>
        </article>
      </div>
      <p className="m-0 mt-3.5 text-[11px] text-muted">Indicative base value (area × rate). Floor, facing &amp; PLC charges extra.</p>
    </section>
  );
}
