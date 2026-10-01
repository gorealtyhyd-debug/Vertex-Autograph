const ITEMS = ['GHMC approved', 'Excavation underway', 'Wing A · Wing B', '3 & 4 BHK · 2235 – 3140 sq.ft', '150-ft road facing', "Beside HCU's 2,300 acres"];

export default function Marquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div aria-hidden="true" className="overflow-hidden whitespace-nowrap bg-violet py-4 text-paper">
      <div className="inline-flex animate-marquee gap-12 text-[11px] uppercase tracking-[.3em] motion-reduce:animate-none">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-12">
            <span>{t}</span>
            <span className="text-gold">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
