import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/data';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: `${SITE.url}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
      images: [`${SITE.url}/assets/images/hero-dusk.jpg`, `${SITE.url}/assets/images/site-plan.jpeg`, `${SITE.url}/assets/images/wing-a-plan.png`, `${SITE.url}/assets/images/wing-b-plan.png`],
    },
  ];
}
