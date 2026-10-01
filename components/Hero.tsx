import Image from 'next/image';
import EnquireButton from './EnquireButton';

const STATS = [
  ['3 & 4 BHK', 'Luxury residences'],
  ['2235–3140', 'Sq.ft living scale'],
  ['150 ft', 'Main road facing'],
  ['8 min', 'To Wipro Circle'],
];

export default function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative flex min-h-[min(92vh,880px)] items-end overflow-hidden bg-deep">
      <Image
        src="/assets/images/hero-dusk.jpg"
        alt="High-rise skyline at dusk — West Hyderabad, home of Vertex Autograph"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[50%_55%]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-deep/90 via-deep/55 to-deep/25" />
      <div className="wrap relative flex w-full animate-rise flex-col gap-[clamp(32px,4.5vw,56px)] pb-[clamp(28px,4vw,48px)] pt-[clamp(120px,14vw,170px)] text-paper">
        <div className="flex max-w-[820px] flex-col gap-6">
          <div className="flex items-center gap-3.5">
            <span className="block h-px w-[46px] bg-gold" />
            <span className="eyebrow text-champagne">Gopanpally, Hyderabad · Launching soon</span>
          </div>
          <h1 id="hero-title" className="m-0 font-serif text-[clamp(48px,7vw,108px)] font-light leading-[.94] text-paper">
            <span className="sr-only">Vertex Autograph — </span>High-rise luxury,
            <br />
            <em className="text-gold">signed</em> by the green.
          </h1>
          <p className="m-0 max-w-[56ch] text-pretty text-[clamp(15px,1.2vw,19px)] leading-[1.7] text-paper/90">
            An iconic tower of 3 &amp; 4 BHK residences beside the 2,300-acre green sanctuary of HCU — fronting a 150-ft wide main road,
            just 8 minutes from Wipro Circle, Gachibowli.
          </p>
          <div className="flex flex-wrap gap-3.5">
            <EnquireButton />
            <a href="#plans" className="btn-line-light">Floor plans</a>
            <a href="#pricing" className="btn-line-light">Offers</a>
          </div>
        </div>
        <dl className="m-0 grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] border-y border-b-gold/20 border-t-gold/45 bg-deep/35 backdrop-blur">
          {STATS.map(([v, k], i) => (
            <div key={k} className={`flex flex-wrap items-baseline gap-3.5 px-[clamp(16px,2vw,28px)] py-5 ${i < 3 ? 'border-r border-gold/20' : ''}`}>
              <dd className="m-0 whitespace-nowrap font-serif text-[clamp(34px,3vw,44px)] font-light leading-none">{v}</dd>
              <dt className="text-[10px] uppercase tracking-[.22em] text-champagne">{k}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
