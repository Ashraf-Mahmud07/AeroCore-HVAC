import type { Metadata } from 'next';
import { ContactHero } from '@/components/contact/ContactHero';
import { ContactInfo } from '@/components/contact/ContactInfo';
import { LiveChatWidget } from '@/components/contact/LiveChatWidget';
import { ServiceRequestForm } from '@/components/contact/ServiceRequestForm';
import { JsonLd } from '@/components/shared/JsonLd';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { buildBreadcrumbSchema, buildContactPageSchema, buildPageMetadata } from '@/lib/seo';
import { routes } from '@/lib/site-config';
import styles from '@/components/contact/ContactPage.module.css';

const description =
  "Book online and we'll confirm a two-hour arrival window by text — no all-day waiting, no call-center runaround.";

export const metadata: Metadata = buildPageMetadata({
  title: 'Contact & Book Service',
  description,
  path: routes.contact,
  keywords: [
    'book HVAC service',
    'HVAC appointment San Francisco',
    'emergency HVAC line',
    'HVAC estimate request',
    'AeroCore HVAC contact',
  ],
});

export default function ContactPage() {
  return (
    <>
      <ContactHero />

      <section className={styles.grid} aria-label="Contact details and booking form">
        <Container>
          <div className={styles.stack}>
            <ContactInfo />
            <Reveal>
              <ServiceRequestForm />
            </Reveal>
          </div>
        </Container>
      </section>

      <LiveChatWidget />

      <JsonLd id="ld-contact" schema={buildContactPageSchema()} />
      <JsonLd
        id="ld-contact-breadcrumb"
        schema={buildBreadcrumbSchema([
          { label: 'Home', href: routes.home },
          { label: 'Contact', href: routes.contact },
        ])}
      />
    </>
  );
}
