import type { Metadata } from 'next';
import { BrandMarquee } from '@/components/shared/BrandMarquee';
import { CtaBand } from '@/components/shared/CtaBand';
import { JsonLd } from '@/components/shared/JsonLd';
import { MethodBand } from '@/components/services/MethodBand';
import { ServiceCatalog } from '@/components/services/ServiceCatalog';
import { ServicesHero } from '@/components/services/ServicesHero';
import { ButtonLink } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { buildBreadcrumbSchema, buildPageMetadata, buildServiceListSchema } from '@/lib/seo';
import { routes, siteConfig, telHref } from '@/lib/site-config';

const description =
  'From a single mini-split to a building-wide VRF retrofit, one accountable team designs it, installs it, and keeps it running — measured at every step.';

export const metadata: Metadata = buildPageMetadata({
  title: 'HVAC Services',
  description,
  path: routes.services,
  keywords: [
    'air conditioning service',
    'heating repair',
    'heat pump installation',
    'indoor air quality',
    'commercial HVAC contractor',
    'smart thermostat installation',
    'HVAC replacement',
    'emergency HVAC repair',
  ],
});

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <ServiceCatalog />
      <MethodBand />
      <BrandMarquee caption="Factory-authorized · we service every major brand" borders="bottom" />
      <CtaBand
        id="services-cta"
        title="Not sure what you need? We'll tell you straight."
        body="Free diagnostic-grade assessment with a written, fixed-price options sheet. Repair or replace — we'll show you the math."
      >
        <ButtonLink href={routes.contact} variant="primary" size="ctaWide">
          <Icon name="file-text" size={17} />
          Get a Free Estimate
        </ButtonLink>
        <ButtonLink href={telHref} variant="secondary" size="ctaWide">
          <Icon name="phone" size={17} />
          Call {siteConfig.phone}
        </ButtonLink>
      </CtaBand>

      <JsonLd id="ld-services" schema={buildServiceListSchema()} />
      <JsonLd
        id="ld-services-breadcrumb"
        schema={buildBreadcrumbSchema([
          { label: 'Home', href: routes.home },
          { label: 'Services', href: routes.services },
        ])}
      />
    </>
  );
}
