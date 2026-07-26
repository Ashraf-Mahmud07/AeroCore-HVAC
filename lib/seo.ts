import type { Metadata } from 'next';
import { homeFaqs, serviceCatalog, serviceAreas, services, testimonials } from '@/lib/data';
import { routes, siteConfig, siteUrl } from '@/lib/site-config';
import type { BreadcrumbItem, Faq } from '@/types';

/** JSON-LD is an open-ended graph; this is the narrowest honest shape for it. */
type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };
export type JsonLdSchema = Record<string, JsonValue>;

export const OG_IMAGE = {
  url: '/images/og-aerocore-hvac.jpg',
  width: 1200,
  height: 675,
  alt: `${siteConfig.name} — ${siteConfig.tagline}`,
} as const;

interface PageMetadataInput {
  readonly title: string;
  readonly description: string;
  readonly path: string;
  readonly keywords: readonly string[];
}

/** Builds per-route metadata with canonical, Open Graph and Twitter blocks. */
export function buildPageMetadata({
  title,
  description,
  path,
  keywords,
}: PageMetadataInput): Metadata {
  const canonical = path === '/' ? '/' : path;
  const absolute = `${siteUrl}${path === '/' ? '' : path}`;

  return {
    title,
    description,
    keywords: [...keywords],
    alternates: { canonical },
    openGraph: {
      type: 'website',
      url: absolute,
      siteName: siteConfig.name,
      title:
        path === '/'
          ? `${siteConfig.name} — ${siteConfig.tagline}`
          : `${title} | ${siteConfig.name}`,
      description,
      locale: 'en_US',
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title:
        path === '/'
          ? `${siteConfig.name} — ${siteConfig.tagline}`
          : `${title} | ${siteConfig.name}`,
      description,
      images: [OG_IMAGE.url],
    },
  };
}

const postalAddress: JsonLdSchema = {
  '@type': 'PostalAddress',
  streetAddress: siteConfig.address.street,
  addressLocality: siteConfig.address.locality,
  addressRegion: siteConfig.address.region,
  postalCode: siteConfig.address.postalCode,
  addressCountry: siteConfig.address.country,
};

const openingHoursSpecification: JsonLdSchema[] = siteConfig.openingHours.map((entry) => ({
  '@type': 'OpeningHoursSpecification',
  dayOfWeek: [...entry.days],
  opens: entry.opens,
  closes: entry.closes,
}));

const aggregateRating: JsonLdSchema = {
  '@type': 'AggregateRating',
  ratingValue: siteConfig.rating.value,
  reviewCount: siteConfig.rating.count,
  bestRating: 5,
  worstRating: 1,
};

const areaServed: JsonLdSchema[] = serviceAreas.map((area) => ({
  '@type': 'City',
  name: area,
}));

/** HVACBusiness — a LocalBusiness subtype — for the root layout. */
export function buildLocalBusinessSchema(): JsonLdSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'HVACBusiness',
    '@id': `${siteUrl}/#business`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    description: siteConfig.description,
    url: siteUrl,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    image: `${siteUrl}${OG_IMAGE.url}`,
    logo: `${siteUrl}/icon.svg`,
    priceRange: '$$',
    foundingDate: String(siteConfig.foundingYear),
    address: postalAddress,
    geo: {
      '@type': 'GeoCoordinates',
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    openingHoursSpecification,
    areaServed,
    aggregateRating,
    hasCredential: [
      `${siteConfig.licenseType} contractor license #${siteConfig.licenseNumber}`,
      `${siteConfig.certification} certified technicians`,
    ],
    makesOffer: services.map((service) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: service.title,
        description: service.body,
      },
    })),
    sameAs: [siteConfig.social.facebook, siteConfig.social.instagram, siteConfig.social.linkedin],
  };
}

export function buildOrganizationSchema(): JsonLdSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${siteUrl}/icon.svg`,
    },
    description: siteConfig.description,
    address: postalAddress,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: siteConfig.phone,
        email: siteConfig.email,
        contactType: 'customer service',
        areaServed: 'US',
        availableLanguage: 'English',
      },
      {
        '@type': 'ContactPoint',
        telephone: siteConfig.phone,
        contactType: 'emergency',
        contactOption: 'TollFree',
        areaServed: 'US',
      },
    ],
    sameAs: [siteConfig.social.facebook, siteConfig.social.instagram, siteConfig.social.linkedin],
  };
}

export function buildWebSiteSchema(): JsonLdSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    url: siteUrl,
    name: siteConfig.name,
    description: siteConfig.description,
    inLanguage: 'en-US',
    publisher: { '@id': `${siteUrl}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/services?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function buildFaqSchema(faqs: readonly Faq[]): JsonLdSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  };
}

export function buildBreadcrumbSchema(items: readonly BreadcrumbItem[]): JsonLdSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `${siteUrl}${item.href === '/' ? '' : item.href}` } : {}),
    })),
  };
}

/** Reviews carry the homepage testimonials, so rich results can quote them. */
export function buildReviewSchema(): JsonLdSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'HVACBusiness',
    '@id': `${siteUrl}/#business`,
    name: siteConfig.name,
    aggregateRating,
    review: testimonials.map((testimonial) => ({
      '@type': 'Review',
      reviewRating: { '@type': 'Rating', ratingValue: 5, bestRating: 5 },
      author: { '@type': 'Person', name: testimonial.name },
      reviewBody: testimonial.quote,
      itemReviewed: { '@type': 'Service', name: testimonial.system },
    })),
  };
}

/** One Service node per catalog entry on the services page. */
export function buildServiceListSchema(): JsonLdSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${siteConfig.name} services`,
    itemListElement: serviceCatalog.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        name: service.title,
        description: service.body,
        serviceType: service.title,
        provider: { '@id': `${siteUrl}/#business` },
        areaServed,
        url: `${siteUrl}${routes.services}`,
      },
    })),
  };
}

export function buildContactPageSchema(): JsonLdSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `${siteUrl}${routes.contact}#contact`,
    url: `${siteUrl}${routes.contact}`,
    name: `Contact ${siteConfig.name}`,
    description: 'Book an HVAC service visit and get a two-hour arrival window confirmed by text.',
    mainEntity: { '@id': `${siteUrl}/#business` },
  };
}

export const homeFaqSchema = () => buildFaqSchema(homeFaqs);
