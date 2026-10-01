'use client';

import { useState } from 'react';
import { PRICES, STAGES, UNITS, cr, fmt, inr, unitId, unitType } from '@/lib/data';
import { useEnquiry } from './EnquiryProvider';

export default function Pricing() {
  const [stage, setStage] = useState(0);
  const [ui, setUi] = useState(0);
  const { open } = useEnquiry();
  const st = STAGES[stage];
  const u = UNITS[ui];
  const base = u.sft * st.rate;
  const save = (PRICES.launch - st.rate) * u.sft;

  const rows: { k: string; s: string; v: string }[] = [{ k: 'Base price', s: `₹${fmt(st.rate)} × ${fmt(u.sft)} sq.ft`, v: inr(base) }];
  if (st.key === 'OTP') {
    rows.push({ k: 'Floor charges', s: 'Per floor level', v: 'As applicable' });
    rows.push({ k: 'East-facing charges', s: u.face === 'East' ? 'This residence is East facing' : `${u.face} facing`, v: u.face === 'East' ? 'As applicable' : 'Not applicable' });
  } else rows.push({ k: 'PLC', s: 'Preferential location charges', v: 'As per price' });
  if (st.key === 'EOI') rows.push({ k: 'Booking amount', s: 'EOI registration', v: '₹5,00,000' });
  rows.push({ k: 'Advantage vs launch', s: `Compared to ₹${fmt(PRICES.launch)} / sq.ft`, v: save > 0 ? inr(save) : '—' });

  return (
    <section id="pricing" aria-labelledby="pricing-title" className="wrap sec bg-violet text-paper">
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <span className="eyebrow text-gold">Current offerings</span>
          <h2 id="pricing-title" className="m-0 mt-4 font-serif text-[clamp(34px,4vw,60px)] font-light leading-[1.05]">
            Sign early, <em className="text-gold">keep the difference.</em>
          </h2>
        </div>
        <span className="text-[11px] uppercase tracking-[.2em] text-gold">Limited launch window</span>
      </div>

      <div role="tablist" aria-label="Price stage" className="mt-12 grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-0.5 border border-gold/30 bg-gold/30">
        {STAGES.map((t, i) => (
          <button
            key={t.key}
            role="tab"
            aria-selected={i === stage}
            type="button"
            onClick={() => setStage(i)}
            className={`flex flex-col gap-2.5 p-[26px] text-left transition-colors ${i === stage ? 'bg-gold text-deep' : 'bg-violet text-paper'}`}
          >
            <span className="flex justify-between gap-2.5 text-[10px] uppercase tracking-[.26em] opacity-85">
              <span>{t.label}</span>
              <span>{t.flag}</span>
            </span>
            <span className="font-serif text-[clamp(40px,4vw,54px)] font-light leading-none">
              ₹{fmt(t.rate)}
              <span className="ml-2 font-sans text-xs tracking-[.14em]">/ SQ.FT</span>
            </span>
            <span className="text-[13px] opacity-85">{t.note}</span>
          </button>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-5">
        <div className="flex flex-col gap-6 border border-paper/30 bg-paper/5 p-[clamp(26px,3vw,40px)]">
          <div className="flex flex-col gap-2.5">
            <span className="text-[10px] uppercase tracking-[.22em] text-gold">Residence</span>
            <div className="flex flex-wrap gap-2">
              {UNITS.map((x, i) => (
                <button
                  key={unitId(x)}
                  type="button"
                  onClick={() => setUi(i)}
                  className={`whitespace-nowrap rounded-full border border-paper/40 px-4 py-2 text-xs ${i === ui ? 'bg-paper text-violet' : 'text-paper'}`}
                >
                  {unitId(x)} · {fmt(x.sft)}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] uppercase tracking-[.22em] text-gold">Selected</span>
            <span className="text-base">
              Wing {u.wing} · Unit {unitId(u)} · {u.bhk} · {fmt(u.sft)} sq.ft · {u.face} facing
            </span>
          </div>
          <div className="mt-auto flex flex-col gap-2 border-t border-paper/25 pt-5">
            <span className="text-[10px] uppercase tracking-[.22em] text-gold">Indicative base value · {st.key}</span>
            <output className="text-[clamp(44px,5vw,68px)] font-light leading-[.95]">{cr(base)}</output>
            <span className="text-[13px] text-champagne">{save > 0 ? `You keep ${cr(save)} vs the launch price` : 'Public launch price'}</span>
          </div>
        </div>

        <div className="flex flex-col gap-4 bg-paper p-[clamp(26px,3vw,40px)] text-violet">
          <span className="text-[11px] uppercase tracking-[.28em] text-muted">Cost outline</span>
          <dl className="m-0 flex flex-col border-t border-violet/20">
            {rows.map((r) => (
              <div key={r.k} className="flex justify-between gap-3.5 border-b border-violet/10 py-3">
                <dt className="flex flex-col gap-0.5">
                  <span className="text-[13px]">{r.k}</span>
                  <span className="text-[11px] text-muted">{r.s}</span>
                </dt>
                <dd className="m-0 whitespace-nowrap text-right text-[17px] font-light">{r.v}</dd>
              </div>
            ))}
          </dl>
          <span className="text-[11px] leading-relaxed text-muted">Indicative only. Excludes GST, registration, amenities &amp; other statutory charges.</span>
          <button type="button" onClick={() => open(`${st.key} · Unit ${unitId(u)} · cost sheet`, unitType(u), st.key)} className="btn-dark mt-auto self-start">
            Request cost sheet
          </button>
        </div>
      </div>
    </section>
  );
}
