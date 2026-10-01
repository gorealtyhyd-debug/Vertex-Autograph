import Image from 'next/image';
import { RENDERS } from '@/lib/data';

export default function Gallery() {
  return (
    <section aria-label="Lifestyle gallery" className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-0.5 bg-violet/20">
      {RENDERS.map((r) => (
        <figure key={r.img} className="group relative m-0 aspect-[4/3] overflow-hidden bg-gold">
          <Image src={r.img} alt={r.alt} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
          <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-deep/85 to-transparent px-4 py-4 text-[11px] uppercase tracking-[.22em] text-paper">
            {r.label}
          </figcaption>
        </figure>
      ))}
    </section>
  );
}
