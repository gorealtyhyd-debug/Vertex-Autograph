import { FAQS } from '@/lib/data';
import EnquireButton from './EnquireButton';

export default function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="wrap grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] items-start gap-[clamp(28px,5vw,64px)] border-t border-violet/15 bg-sand py-[clamp(56px,8vw,110px)]">
      <div className="flex flex-col gap-4 md:sticky md:top-[110px]">
        <span className="eyebrow text-muted">FAQ</span>
        <h2 id="faq-title" className="m-0 font-serif text-[clamp(34px,4vw,58px)] font-light leading-[1.05]">Questions buyers ask.</h2>
        <EnquireButton context="Site visit" className="btn-dark mt-2 self-start">Book a site visit</EnquireButton>
      </div>
      <div className="flex flex-col border-t border-violet/30">
        {FAQS.map((f, i) => (
          <details key={f.q} open={i === 0} className="group border-b border-violet/20">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5 font-serif text-[clamp(20px,1.8vw,24px)] leading-[1.25] text-violet [&::-webkit-details-marker]:hidden">
              <span>{f.q}</span>
              <span className="flex-none font-sans text-lg group-open:hidden">+</span>
              <span className="hidden flex-none font-sans text-lg group-open:inline">–</span>
            </summary>
            <p className="m-0 pb-5 pr-10 text-pretty text-sm leading-[1.75] text-muted">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
