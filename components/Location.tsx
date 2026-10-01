import { LOCATION_FACTS, SITE } from '@/lib/data';

export default function Location() {
  const { lat, lng } = SITE.geo;
  return (
    <section id="location" aria-labelledby="location-title" className="wrap sec grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] items-stretch gap-[clamp(28px,5vw,64px)]">
      <div className="flex flex-col gap-5">
        <span className="eyebrow text-muted">Location</span>
        <h2 id="location-title" className="m-0 font-serif text-[clamp(34px,4vw,58px)] font-light leading-[1.05]">
          Gopanpally.
          <br />
          Nature next door, <em>the city on call.</em>
        </h2>
        <address className="m-0 not-italic">
          <p className="m-0 max-w-[42ch] text-pretty text-[15px] leading-[1.7] text-muted">
            Vertex Autograph, {SITE.address.locality}, {SITE.address.city}, {SITE.address.region} {SITE.address.postalCode} — beside the
            University of Hyderabad&apos;s 2,300-acre green sanctuary and fronting a 150-ft wide main road, with strategic proximity to the IT
            corridor.
          </p>
        </address>
        <dl className="m-0 flex flex-col border-t border-violet/20">
          {LOCATION_FACTS.map((l) => (
            <div key={l.k} className="flex justify-between gap-4 border-b border-violet/15 py-3.5 text-[13px]">
              <dt className="text-[11px] uppercase tracking-[.14em] text-muted">{l.k}</dt>
              <dd className="m-0 text-right">{l.v}</dd>
            </div>
          ))}
        </dl>
        <span className="text-[11px] text-muted">Drive times are approximate and traffic-dependent.</span>
      </div>
      <div className="flex flex-col border border-violet/20 bg-sand p-2.5">
        <iframe
          title="Vertex Autograph location map — Gopanpally, Hyderabad"
          src={`https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`}
          className="block min-h-[420px] w-full flex-1 border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
        <div className="flex flex-wrap justify-between gap-2.5 px-1.5 pb-1 pt-3.5 text-[11px] uppercase tracking-[.16em] text-muted">
          <span>Gopanpally · Hyderabad</span>
          <a href={SITE.mapUrl} target="_blank" rel="noopener">
            Open exact location ↗
          </a>
        </div>
      </div>
    </section>
  );
}
