import Link from 'next/link';

export const metadata = { title: 'Page not found', robots: { index: false } };

export default function NotFound() {
  return (
    <main className="wrap flex min-h-screen flex-col items-start justify-center gap-6 bg-deep text-paper">
      <span className="eyebrow text-gold">404</span>
      <h1 className="m-0 font-serif text-[clamp(44px,6vw,88px)] font-light leading-none">
        This page isn&apos;t <em className="text-gold">here.</em>
      </h1>
      <p className="m-0 max-w-[44ch] text-paper/80">Explore Vertex Autograph — luxury 3 &amp; 4 BHK residences in Gopanpally, Hyderabad.</p>
      <Link href="/" className="btn-gold">Back to home</Link>
    </main>
  );
}
