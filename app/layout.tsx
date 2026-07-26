import type { Metadata, Viewport } from 'next';
import { Barlow, Barlow_Condensed } from 'next/font/google';
import { JsonLd } from '@/components/shared/JsonLd';
import {
  buildLocalBusinessSchema,
  buildOrganizationSchema,
  buildWebSiteSchema,
  OG_IMAGE,
} from '@/lib/seo';
import { siteConfig, siteUrl } from '@/lib/site-config';
import '@/styles/globals.css';

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-barlow',
  display: 'swap',
});

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-barlow-condensed',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.legalName, url: siteUrl }],
  creator: siteConfig.legalName,
  publisher: siteConfig.legalName,
  category: 'Heating, Ventilation and Air Conditioning',
  keywords: [
    'HVAC contractor',
    'air conditioning repair',
    'furnace repair',
    'heat pump installation',
    'commercial HVAC',
    'HVAC maintenance plan',
    'San Francisco HVAC',
    'Bay Area HVAC',
    'emergency HVAC service',
  ],
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    locale: 'en_US',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [OG_IMAGE.url],
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
    other: [{ rel: 'mask-icon', url: '/mask-icon.svg', color: '#1d2d3d' }],
  },
  manifest: '/manifest.webmanifest',
  formatDetection: { telephone: true, address: true, email: true },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f2f2f3' },
    { media: '(prefers-color-scheme: dark)', color: '#1d2d3d' },
  ],
  colorScheme: 'light',
};

export default function RootLayout({ children }: { readonly children: React.ReactNode }) {
  return (
    <html lang="en" className={`${barlow.variable} ${barlowCondensed.variable}`}>
      <head>
        {/* Scroll-reveal is progressive enhancement: without JS the wrappers
            would otherwise stay at opacity 0. */}
        <noscript>
          <style>{'.ac-reveal{opacity:1 !important;transform:none !important}'}</style>
        </noscript>
      </head>
      <body>
        {children}
        <JsonLd id="ld-local-business" schema={buildLocalBusinessSchema()} />
        <JsonLd id="ld-organization" schema={buildOrganizationSchema()} />
        <JsonLd id="ld-website" schema={buildWebSiteSchema()} />
      </body>
    </html>
  );
}
