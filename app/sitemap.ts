import type { MetadataRoute } from 'next';
import { routes, siteUrl } from '@/lib/site-config';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: `${siteUrl}/`, lastModified, changeFrequency: 'weekly', priority: 1 },
    {
      url: `${siteUrl}${routes.services}`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}${routes.maintenancePlans}`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}${routes.contact}`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.7,
    },
  ];
}
