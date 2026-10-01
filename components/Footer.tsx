import { SITE } from '@/lib/data';

export default function Footer() {
  return (
    <footer className="wrap flex flex-col gap-7 bg-deep pb-10 pt-[clamp(36px,5vw,60px)] text-paper">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] items-start gap-[clamp(20px,4vw,56px)]">
        <div className="flex flex-col gap-2.5">
          <span className="font-serif text-[30px] uppercase leading-none tracking-[.14em]">Vertex Autograph</span>
          <span className="text-[11px] uppercase tracking-[.2em] text-gold">By {SITE.developer}</span>
          <span className="text-[11px] uppercase tracking-[.2em] text-paper/70">
            {SITE.address.locality}, {SITE.address.city}
          </span>
        </div>
        <p className="m-0 max-w-[58ch] text-pretty text-[13px] leading-[1.75] text-paper/70">{SITE.disclaimer}</p>
      </div>
      <div className="flex flex-wrap justify-between gap-4 border-t border-paper/15 pt-5 text-[11px] uppercase tracking-[.18em] text-paper/60">
        <span>© {new Date().getFullYear()} Vertex Homes</span>
        <span>All images, plans and areas indicative</span>
      </div>
    </footer>
  );
}
