import { PROGRESS } from '@/lib/data';

export default function Progress() {
  return (
    <section id="progress" aria-labelledby="progress-title" className="wrap border-b border-violet/10 bg-paper py-[clamp(56px,8vw,110px)]">
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div className="flex flex-col gap-4">
          <span className="eyebrow text-muted">Project status</span>
          <h2 id="progress-title" className="m-0 font-serif text-[clamp(36px,4.4vw,66px)] font-light leading-none">
            Approved. Underway. <em>Launching soon.</em>
          </h2>
        </div>
        <p className="m-0 max-w-[36ch] text-sm leading-[1.7] text-muted">Buy with confidence — approvals are in hand and work has begun on site.</p>
      </div>
      <ol className="m-0 mt-[clamp(40px,5vw,64px)] grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-[clamp(20px,2.4vw,32px)] p-0">
        {PROGRESS.map((p, i) => (
          <li key={p.title} className="flex flex-col gap-3.5">
            <div className="flex items-center gap-3">
              {p.state === 'done' && <span className="flex h-[34px] w-[34px] flex-none items-center justify-center rounded-full bg-violet text-sm text-gold">✓</span>}
              {p.state === 'live' && (
                <span className="relative flex h-[34px] w-[34px] flex-none items-center justify-center rounded-full bg-gold">
                  <span className="absolute -inset-1.5 animate-ring rounded-full border border-gold motion-reduce:animate-none" />
                  <span className="h-2 w-2 rounded-full bg-deep" />
                </span>
              )}
              {p.state === 'next' && (
                <span className="flex h-[34px] w-[34px] flex-none items-center justify-center rounded-full border border-dashed border-violet/50 text-xs text-muted">0{i + 1}</span>
              )}
              <span className={`h-0.5 flex-1 ${p.state === 'done' ? 'bg-violet' : p.state === 'live' ? 'bg-gradient-to-r from-gold to-violet/20' : 'bg-violet/10'}`} />
            </div>
            <span className="text-[10px] uppercase tracking-[.26em] text-muted">{p.label}</span>
            <h3 className="m-0 font-serif text-[28px] font-normal leading-[1.1]">{p.title}</h3>
            <p className="m-0 text-[13px] leading-[1.65] text-muted">{p.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
