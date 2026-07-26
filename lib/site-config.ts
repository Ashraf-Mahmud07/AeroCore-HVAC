import type { HeroVariant, NavLink } from '@/types';

const FALLBACK_ORIGIN = 'https://www.aerocorehvac.com';

/** Canonical origin, no trailing slash. Overridable per environment. */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? FALLBACK_ORIGIN).replace(/\/+$/, '');

/**
 * Company facts. Values come straight from the design components' props and
 * copy — `companyName`, `phone`, the top bar, the contact cards and the footer.
 */
export const siteConfig = {
  name: 'AeroCore HVAC',
  legalName: 'AeroCore HVAC, Inc.',
  shortName: 'AeroCore',
  tagline: 'Precision climate for the buildings you live in.',
  description:
    'AeroCore HVAC designs, installs and services high-efficiency heating and cooling systems — engineered to spec, commissioned by data, and backed for as long as you own the building.',
  footerDescription:
    'High-efficiency heating, cooling and air-quality systems — designed to spec and backed for the life of your ownership.',

  phone: '(415) 555-0142',
  email: 'service@aerocorehvac.com',

  address: {
    street: '1420 Industrial Way',
    locality: 'San Francisco',
    region: 'CA',
    postalCode: '94124',
    country: 'US',
    short: '1420 Industrial Way, SF',
    full: '1420 Industrial Way, San Francisco, CA 94124',
  },

  geo: {
    latitude: 37.7395,
    longitude: -122.3878,
  },

  license: 'Lic #984120',
  licenseNumber: '984120',
  licenseType: 'C-20',
  certification: 'EPA 608',

  hoursSummary: 'Mon–Sat 7am–8pm',
  /** Schema.org opening-hours specification derived from the contact page table. */
  openingHours: [
    {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '07:00',
      closes: '20:00',
    },
    { days: ['Saturday'], opens: '08:00', closes: '17:00' },
  ],

  rating: {
    value: 4.9,
    display: '4.9',
    count: 2300,
    countDisplay: '2,300+',
  },

  yearsInBusiness: 27,
  foundingYear: 1999,
  copyrightYear: 2026,

  emergencyLabel: '24/7 Emergency Service',

  social: {
    facebook: '#',
    instagram: '#',
    linkedin: '#',
  },

  /**
   * Hero layout. Mirrors the `heroVariant` prop on the home design component,
   * whose default is "Split". All three layouts are implemented.
   */
  heroVariant: 'split' as HeroVariant,

  /** Mirrors the `showTopBar` prop, default `true`. */
  showTopBar: true,
} as const;

export const telHref = `tel:${siteConfig.phone.replace(/[^0-9+]/g, '')}`;
export const mailHref = `mailto:${siteConfig.email}`;

export const routes = {
  home: '/',
  services: '/services',
  contact: '/contact',
} as const;

/** Desktop navigation, in the source order. */
export const mainNav: readonly NavLink[] = [
  { label: 'Home', href: routes.home },
  { label: 'About', href: `${routes.home}#about` },
  { label: 'Services', href: routes.services },
  { label: 'Projects', href: `${routes.home}#projects` },
  { label: 'Financing', href: `${routes.home}#financing` },
  { label: 'Service Areas', href: `${routes.home}#areas` },
  { label: 'Blog', href: `${routes.home}#blog` },
];

/** Mobile overlay navigation — the desktop set plus Contact. */
export const mobileNav: readonly NavLink[] = [
  ...mainNav,
  { label: 'Contact', href: routes.contact },
];

export const footerCompanyLinks: readonly NavLink[] = [
  { label: 'About us', href: `${routes.home}#about` },
  { label: 'Our process', href: `${routes.home}#process` },
  { label: 'Projects', href: `${routes.home}#projects` },
  { label: 'Careers', href: '#' },
  { label: 'Reviews', href: '#' },
];

export const footerServiceLinks: readonly string[] = [
  'Air Conditioning',
  'Heating',
  'Heat Pumps',
  'Commercial HVAC',
  'Emergency Repairs',
];

export const footerLegalLinks: readonly NavLink[] = [
  { label: 'Privacy', href: '#' },
  { label: 'Terms', href: '#' },
  { label: 'Accessibility', href: '#' },
  { label: 'Warranty', href: '#' },
];
