import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Jost } from 'next/font/google';
import './globals.css';
import { SITE } from '@/lib/data';
import EnquiryProvider from '@/components/EnquiryProvider';

const serif = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});
const sans = Jost({ subsets: ['latin'], weight: ['300', '400', '500'], variable: '--font-sans', display: 'swap' });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#2C1F33',
};

const { lat, lng } = SITE.geo;

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: SITE.title, template: `%s | ${SITE.name}` },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    'Vertex Autograph',
    'Vertex Homes',
    'Vertex Autograph Gopanpally',
    'luxury apartments Gopanpally',
    '3 BHK Gopanpally',
    '4 BHK Gopanpally',
    'high-rise apartments Gachibowli',
    'flats near Wipro Circle',
    'apartments near HCU Hyderabad',
    'new launch Hyderabad 2026',
    'GHMC approved apartments Hyderabad',
    'luxury flats West Hyderabad',
  ],
  authors: [{ name: SITE.developer }],
  creator: SITE.developer,
  publisher: SITE.developer,
  alternates: { canonical: '/', languages: { 'en-IN': '/' } },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: '/',
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
    images: [{ url: SITE.ogImage, width: 1200, height: 630, alt: 'Vertex Autograph — luxury 3 & 4 BHK high-rise in Gopanpally, Hyderabad' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.title,
    description: SITE.description,
    images: [SITE.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  category: 'Real Estate',
  formatDetection: { telephone: true, address: true },
  other: {
    'geo.region': SITE.address.regionCode,
    'geo.placename': `${SITE.address.locality}, ${SITE.address.city}`,
    'geo.position': `${lat};${lng}`,
    ICBM: `${lat}, ${lng}`,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-paper focus:px-4 focus:py-2">
          Skip to content
        </a>
        <EnquiryProvider>{children}</EnquiryProvider>
      </body>
    </html>
  );
}
