import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/data';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE.name} — Gopanpally, Hyderabad`,
    short_name: SITE.name,
    description: SITE.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#F6F2EC',
    theme_color: '#2C1F33',
    icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' }],
  };
}
