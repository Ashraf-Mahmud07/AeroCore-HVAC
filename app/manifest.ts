import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site-config';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} — ${siteConfig.tagline}`,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    id: '/',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#f2f2f3',
    theme_color: '#1d2d3d',
    lang: 'en-US',
    dir: 'ltr',
    categories: ['business', 'utilities'],
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      {
        src: '/icons/icon-maskable-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    screenshots: [
      {
        src: '/icons/screenshot-wide.png',
        sizes: '1280x720',
        type: 'image/png',
        form_factor: 'wide',
      },
      {
        src: '/icons/screenshot-narrow.png',
        sizes: '720x1280',
        type: 'image/png',
        form_factor: 'narrow',
      },
    ],
  };
}
