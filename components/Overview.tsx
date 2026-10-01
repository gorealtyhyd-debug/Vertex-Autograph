import Image from 'next/image';
import { HIGHLIGHTS } from '@/lib/data';
import EnquireButton from './EnquireButton';

export default function Overview() {
  return (
    <section id="overview" aria-labelledby="overview-title" className="wrap sec flex flex-col gap-[clamp(36px,5vw,64px)]">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] items-end gap-[clamp(24px,4vw,64px)]">
        <h2 id="overview-title" className="m-0 font-serif text-[clamp(38px,5vw,76px)] font-light leading-[1.02] tracking-[-.01em]">
          A high-rise address
          <br />
          framed by <em>2,300 acres</em> of green.
        </h2>
        <p className="m-0 max-w-[46ch] text-pretty text-[clamp(15px,1.15vw,18px)] leading-[1.75] text-muted">
          Vertex Homes presents Vertex Autograph, an exclusive high-rise luxury address in Gopanpally where expansive green vistas meet
          seamless urban connectivity — a rare lifestyle surrounded by nature, minutes from the IT corridor.
        </p>
      </div>

      <ul className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,250px),1fr))] gap-[clamp(24px,3vw,48px)] p-0">
        {HIGHLIGHTS.map((h) => (
          <li key={h.title} className="flex flex-col gap-3 border-t border-violet/30 pt-5">
            <span className="diamond" />
            <h3 className="m-0 font-serif text-[clamp(26px,2.4vw,32px)] font-normal leading-[1.1]">{h.title}</h3>
            <p className="m-0 max-w-[34ch] text-sm leading-[1.7] text-muted">{h.body}</p>
          </li>
        ))}
      </ul>

      <div className="relative flex min-h-[clamp(280px,34vw,440px)] items-end overflow-hidden">
        <Image src="/assets/images/park.jpg" alt="Tree-lined green expanse near the HCU sanctuary, Gopanpally" fill sizes="100vw" className="object-cover object-[50%_60%]" />
        <div className="absolute inset-0 bg-gradient-to-t from-deep/90 to-deep/5" />
        <div className="relative flex w-full flex-wrap items-end justify-between gap-5 p-[clamp(22px,3vw,44px)]">
          <div className="flex max-w-[48ch] flex-col gap-2">
            <span className="text-[11px] uppercase tracking-[.3em] text-gold">Next to the HCU sanctuary</span>
            <p className="m-0 font-serif text-[clamp(28px,3vw,44px)] leading-[1.08] text-paper">
              Uninterrupted green expanse views from every corner residence.
            </p>
          </div>
          <EnquireButton context="Brochure request" className="btn-line-light hover:!border-gold hover:!bg-gold hover:!text-deep">
            Request the brochure
          </EnquireButton>
        </div>
      </div>
    </section>
  );
}
