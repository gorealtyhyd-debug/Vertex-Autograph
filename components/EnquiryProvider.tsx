'use client';

import Image from 'next/image';
import { submitLeadToPrivyr } from '@/lib/lead';
import { createContext, useCallback, useContext, useEffect, useState, type FormEvent, type ReactNode } from 'react';

type Ctx = {
  open: (context: string, unit?: string, offer?: string) => void;
  showImage: (src: string, title: string) => void;
};

const UNIT_LABELS: Record<string, string> = {
  '3': '3 BHK · 2,235 – 2,480 sq.ft',
  '4': '4 BHK · 2,660 – 2,950 sq.ft',
  '4P': '4 BHK + Powder room · 3,030 – 3,140 sq.ft',
  '-': 'Not decided yet',
};
const OFFER_LABELS: Record<string, string> = {
  OTP: 'OTP · ₹6,499 / sq.ft (limited period)',
  EOI: 'EOI · ₹7,999 / sq.ft · ₹5 L booking',
  Launch: 'Launch · ₹8,899 / sq.ft',
  '-': 'Advise me',
};

const EnquiryCtx = createContext<Ctx>({ open: () => {}, showImage: () => {} });
export const useEnquiry = () => useContext(EnquiryCtx);

const field =
  'w-full border border-violet/30 bg-paper px-3.5 py-3 font-sans text-[15px] normal-case tracking-normal text-violet outline-none focus:border-violet';
const label = 'flex flex-col gap-2 text-[10px] uppercase tracking-[.22em] text-muted';

export default function EnquiryProvider({ children }: { children: ReactNode }) {
  const [form, setForm] = useState<null | { context: string; unit: string; offer: string }>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [err, setErr] = useState('');
  const [lb, setLb] = useState<null | { src: string; title: string }>(null);

  const open = useCallback((context: string, unit = '-', offer = 'OTP') => {
    setForm({ context, unit, offer });
    setStatus('idle');
    setErr('');
  }, []);
  const showImage = useCallback((src: string, title: string) => setLb({ src, title }), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setForm(null);
        setLb(null);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = form || lb ? 'hidden' : '';
  }, [form, lb]);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get('name') || '').trim();
    const phone = String(fd.get('phone') || '').replace(/\D/g, '').slice(-10);
    if (!name) return setErr('Please enter your name.');
    if (phone.length < 10) return setErr('Please enter a valid 10-digit mobile number.');
    setStatus('sending');
    setErr('');
    const result = await submitLeadToPrivyr({
      name,
      phone: `+91${phone}`,
      email: String(fd.get('email') || ''),
      unitType: UNIT_LABELS[String(fd.get('residence') || '-')],
      offer: OFFER_LABELS[String(fd.get('offer') || '-')],
      enquiryFor: form?.context,
      source: 'Vertex Autograph Website',
    });
    if (result.success) setStatus('sent');
    else {
      setStatus('idle');
      setErr(result.message);
    }
  }

  return (
    <EnquiryCtx.Provider value={{ open, showImage }}>
      {children}

      {lb && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lb.title}
          onClick={() => setLb(null)}
          className="fixed inset-0 z-[80] flex cursor-zoom-out flex-col items-center justify-center gap-3 bg-deep/85 p-[clamp(14px,4vw,48px)] backdrop-blur-sm"
        >
          <div className="flex w-full max-w-[1400px] items-center justify-between gap-4 text-paper">
            <span className="font-serif text-[22px]">{lb.title}</span>
            <span className="text-[11px] uppercase tracking-[.2em] text-gold">Close ✕</span>
          </div>
          <div className="w-full max-w-[1400px] animate-rise-fast bg-white p-3.5">
            <Image src={lb.src} alt={lb.title} width={2400} height={1800} sizes="100vw" className="h-auto max-h-[80vh] w-full object-contain" />
          </div>
        </div>
      )}

      {form && (
        <div role="dialog" aria-modal="true" aria-labelledby="enq-title" className="fixed inset-0 z-[90] flex items-center justify-center bg-deep/60 p-[clamp(14px,4vw,40px)] backdrop-blur-sm">
          <div className="relative max-h-[92vh] w-full max-w-[520px] animate-rise-fast overflow-y-auto border border-violet/25 bg-paper p-[clamp(24px,4vw,40px)]">
            <button
              type="button"
              onClick={() => setForm(null)}
              aria-label="Close"
              className="absolute right-3.5 top-3.5 h-[38px] w-[38px] rounded-full border border-violet/30 text-base leading-none text-violet hover:bg-violet hover:text-paper"
            >
              ✕
            </button>
            <div className="mb-6 flex items-center gap-4 border-b border-violet/20 pb-5">
              <span className="flex h-[54px] w-[54px] flex-none items-center justify-center bg-violet pb-[3px] font-serif text-[34px] italic leading-none text-gold">V</span>
              <div className="flex flex-col gap-1">
                <span id="enq-title" className="font-serif text-[26px] uppercase leading-none tracking-[.14em]">Vertex Autograph</span>
                <span className="text-[9px] uppercase tracking-[.3em] text-muted">{form.context}</span>
              </div>
            </div>

            {status === 'sent' ? (
              <div className="flex flex-col gap-4">
                <p className="m-0 border border-violet/25 bg-sand p-5 text-sm leading-relaxed">
                  Thank you — our relationship team will call you shortly with launch pricing, availability and a site-visit slot.
                </p>
                <button type="button" onClick={() => setForm(null)} className="btn-dark self-start">Close</button>
              </div>
            ) : (
              <form onSubmit={submit} className="flex flex-col gap-4" noValidate>
                <label className={label}>
                  Name
                  <input name="name" type="text" required autoComplete="name" placeholder="Your full name" className={field} />
                </label>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <label className={label}>
                    Number
                    <input name="phone" type="tel" required autoComplete="tel" inputMode="tel" placeholder="+91 00000 00000" className={field} />
                  </label>
                  <label className={label}>
                    Mail
                    <input name="email" type="email" autoComplete="email" placeholder="you@example.com" className={field} />
                  </label>
                </div>
                <label className={label}>
                  Residence
                  <select name="residence" defaultValue={form.unit} className={field}>
                    <option value="3">3 BHK · 2,235 – 2,480 sq.ft</option>
                    <option value="4">4 BHK · 2,660 – 2,950 sq.ft</option>
                    <option value="4P">4 BHK + Powder room · 3,030 – 3,140 sq.ft</option>
                    <option value="-">Not decided yet</option>
                  </select>
                </label>
                <label className={label}>
                  Offer
                  <select name="offer" defaultValue={form.offer} className={field}>
                    <option value="OTP">OTP · ₹6,499 / sq.ft (limited period)</option>
                    <option value="EOI">EOI · ₹7,999 / sq.ft · ₹5 L booking</option>
                    <option value="Launch">Launch · ₹8,899 / sq.ft</option>
                    <option value="-">Advise me</option>
                  </select>
                </label>
                {err && <span role="alert" className="text-[13px] text-[#8A2F3C]">{err}</span>}
                <button type="submit" disabled={status === 'sending'} className="btn-dark mt-2 disabled:opacity-60">
                  {status === 'sending' ? 'Sending…' : 'Submit enquiry'}
                </button>
                <span className="text-[11px] leading-relaxed text-muted">
                  By submitting you agree to be contacted about Vertex Autograph via call, SMS or WhatsApp.
                </span>
              </form>
            )}
          </div>
        </div>
      )}
    </EnquiryCtx.Provider>
  );
}
