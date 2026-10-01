import Image from 'next/image';
import { WHY } from '@/lib/data';

export default function WhyGopanpally() {
  return (
    <section id="why" aria-labelledby="why-title" className="relative overflow-hidden bg-deep text-paper">
      <Image src="/assets/images/forest.jpg" alt="Dense green canopy of the University of Hyderabad (HCU) campus" fill sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(30,20,36,.94)_0%,rgba(30,20,36,.78)_45%,rgba(30,20,36,.45)_100%)]" />
      <div className="wrap relative flex flex-wrap items-center gap-[clamp(36px,5vw,80px)] py-[clamp(64px,9vw,130px)]">
        <div className="flex min-w-0 flex-[1_1_380px] flex-col gap-4">
          <div className="flex items-center gap-3.5">
            <span className="h-px w-[46px] bg-gold" />
            <span className="eyebrow text-gold">Why Gopanpally</span>
          </div>
          <h2 id="why-title" className="m-0 font-light">
            <span className="block font-serif text-[clamp(110px,16vw,230px)] leading-[.82] tracking-[-.02em]">2,300</span>
            <span className="mt-4 block max-w-[18ch] font-serif text-[clamp(26px,2.6vw,38px)] leading-[1.15]">
              acres of <em className="text-gold">HCU green sanctuary</em>, right next door.
            </span>
          </h2>
          <p className="m-0 max-w-[44ch] text-pretty text-[15px] leading-[1.75] text-paper/80">
            A rare lifestyle surrounded by nature — while staying just 8 minutes from Wipro Circle, Gachibowli.
          </p>
        </div>
        <ul className="m-0 grid min-w-0 flex-[1.2_1_440px] list-none grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-0.5 border border-gold/35 bg-gold/35 p-0">
          {WHY.map((w, i) => (
            <li key={w.title} className="flex min-h-[210px] flex-col gap-3.5 bg-deep/70 p-[clamp(22px,2.6vw,34px)] backdrop-blur-md transition-colors hover:bg-violet/90">
              <span className="font-serif text-xl italic text-gold">0{i + 1}</span>
              <h3 className="m-0 font-serif text-[28px] font-normal leading-[1.1]">{w.title}</h3>
              <p className="m-0 mt-auto text-[13px] leading-[1.65] text-paper/80">{w.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
