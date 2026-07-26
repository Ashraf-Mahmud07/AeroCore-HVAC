import type { Metadata } from 'next';
import { ComparisonTable } from '@/components/maintenance/ComparisonTable';
import { PerksGrid } from '@/components/maintenance/PerksGrid';
import { PlanFaq } from '@/components/maintenance/PlanFaq';
import { PlansHero } from '@/components/maintenance/PlansHero';
import { PricingGrid } from '@/components/maintenance/PricingGrid';
import { CtaBand } from '@/components/shared/CtaBand';
import { JsonLd } from '@/components/shared/JsonLd';
import { ButtonLink } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { maintenancePlans } from '@/lib/data';
import {
  buildBreadcrumbSchema,
  buildMaintenancePlansSchema,
  buildPageMetadata,
  planFaqSchema,
} from '@/lib/seo';
import { routes, siteConfig, telHref } from '@/lib/site-config';

const description =
  'Two precision tune-ups a year keep efficiency high, catch failures before they strand you, and keep your manufacturer warranty valid. Members skip the queue and never pay overtime.';

export const metadata: Metadata = buildPageMetadata({
  title: 'Maintenance Plans',
  description,
  path: routes.maintenancePlans,
  keywords: [
    'HVAC maintenance plan',
    'AC tune-up',
    'furnace tune-up',
    'HVAC service agreement',
    'Comfort Club',
    'priority HVAC dispatch',
  ],
});

export default function MaintenancePlansPage() {
  return (
    <>
      <PlansHero />
      <PricingGrid />
      <ComparisonTable />
      <PerksGrid />
      <PlanFaq />
      <CtaBand
        id="plans-cta"
        tone="dark"
        size="sm"
        measure="50ch"
        title="Join the Comfort Club today."
        body="Enroll in five minutes. Your first tune-up can be scheduled this week."
      >
        <ButtonLink href={routes.contact} variant="primary" size="ctaWide">
          <Icon name="badge-check" size={17} />
          Enroll now
        </ButtonLink>
        <ButtonLink href={telHref} variant="secondary" size="ctaWide" onDark>
          <Icon name="phone" size={17} />
          Call {siteConfig.phone}
        </ButtonLink>
      </CtaBand>

      <JsonLd id="ld-plans" schema={buildMaintenancePlansSchema(maintenancePlans)} />
      <JsonLd id="ld-plans-faq" schema={planFaqSchema()} />
      <JsonLd
        id="ld-plans-breadcrumb"
        schema={buildBreadcrumbSchema([
          { label: 'Home', href: routes.home },
          { label: 'Maintenance Plans', href: routes.maintenancePlans },
        ])}
      />
    </>
  );
}
