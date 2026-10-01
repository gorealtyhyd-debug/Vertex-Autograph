import EnquireButton from './EnquireButton';

const BARS = [
  { h: '73%', k: 'OTP · Now', p: '₹6,499', n: ['27% below launch', '+ Floor & East-facing charges'], cls: 'bg-gold text-deep', kc: '', nc: '' },
  { h: '90%', k: 'EOI', p: '₹7,999', n: ['10% below launch', 'PLC · ₹5 L booking'], cls: 'border border-b-0 border-gold/70 bg-gold/10', kc: 'text-gold', nc: 'text-paper/85' },
  { h: '100%', k: 'Launch', p: '₹8,899', n: ['Public launch price', 'PLC'], cls: 'border border-b-0 border-dashed border-paper/35', kc: 'text-paper/70', nc: 'text-paper/70' },
];

export default function Advantage() {
  return (
    <section id="advantage" aria-labelledby="adv-title" className="wrap relative overflow-hidden bg-violet py-[clamp(64px,9vw,130px)] text-paper">
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-[4vw] -right-[3vw] whitespace-nowrap font-serif text-[clamp(140px,22vw,340px)] font-light italic leading-none text-gold/[.07]">
        Autograph
      </div>
      <div className="relative flex flex-wrap items-end gap-[clamp(36px,5vw,80px)]">
        <div className="flex min-w-0 flex-[1_1_360px] flex-col gap-5">
          <div className="flex items-center gap-3.5">
            <span className="h-px w-[46px] bg-gold" />
            <span className="eyebrow text-gold">Hurry · Limited launch window</span>
          </div>
          <h2 id="adv-title" className="m-0 font-serif text-[clamp(42px,5.6vw,86px)] font-light leading-[.98]">
            Secure the <em className="text-gold">early advantage.</em>
          </h2>
          <p className="m-0 max-w-[42ch] text-pretty text-[15px] leading-[1.75] text-paper/80">
            The price rises at every stage. OTP buyers save ₹2,400 on every sq.ft compared with the launch price — before this limited window closes.
          </p>
          <div className="mt-1.5 flex flex-wrap gap-3.5">
            <EnquireButton context="OTP · Limited-period offer" offer="OTP">Lock OTP price</EnquireButton>
            <EnquireButton context="EOI registration" offer="EOI" className="btn-line-light">Register EOI</EnquireButton>
          </div>
        </div>
        <div className="grid h-[clamp(320px,34vw,440px)] min-w-0 flex-[1.2_1_440px] grid-cols-3 items-end gap-[clamp(10px,1.6vw,20px)] border-b border-gold/50">
          {BARS.map((b) => (
            <div key={b.k} style={{ height: b.h }} className={`flex flex-col p-[clamp(14px,1.6vw,22px)] ${b.cls}`}>
              <span className={`text-[10px] uppercase tracking-[.24em] ${b.kc}`}>{b.k}</span>
              <span className="mt-2 font-serif text-[clamp(30px,3vw,44px)] leading-none">{b.p}</span>
              <span className={`mt-auto text-xs leading-[1.4] ${b.nc}`}>
                {b.n[0]}
                <br />
                {b.n[1]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
