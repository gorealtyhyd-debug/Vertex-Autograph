import EnquireButton from './EnquireButton';

const NAV = [
  ['#overview', 'Overview'],
  ['#masterplan', 'Master plan'],
  ['#plans', 'Plans'],
  ['#amenities', 'Amenities'],
  ['#pricing', 'Offers'],
  ['#location', 'Location'],
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between gap-6 border-b border-violet/15 bg-paper/90 px-[clamp(16px,4vw,64px)] py-3.5 backdrop-blur-md">
      <a href="#top" className="flex min-w-0 items-center gap-3.5" aria-label="Vertex Autograph — home">
        <span className="flex h-[46px] w-[46px] flex-none items-center justify-center bg-violet pb-[3px] font-serif text-[30px] italic leading-none text-gold">V</span>
        <span className="flex min-w-0 flex-col gap-0.5">
          <span className="truncate font-serif text-lg uppercase leading-none tracking-[.16em] sm:text-2xl">Vertex Autograph</span>
          <span className="text-[9px] uppercase tracking-[.3em] text-muted">Gopanpally · Hyderabad</span>
        </span>
      </a>
      <nav aria-label="Primary" className="flex items-center gap-[clamp(12px,1.8vw,30px)] text-xs uppercase tracking-[.16em]">
        <ul className="m-0 hidden list-none items-center gap-[clamp(12px,1.8vw,30px)] p-0 xl:flex">
          {NAV.map(([href, label]) => (
            <li key={href}>
              <a href={href}>{label}</a>
            </li>
          ))}
        </ul>
        <EnquireButton className="btn-dark !px-5 !py-3 !tracking-[.16em]" />
      </nav>
    </header>
  );
}
