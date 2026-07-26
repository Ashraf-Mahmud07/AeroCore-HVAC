import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { BlueprintGrid } from '@/components/ui/BlueprintGrid';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { routes } from '@/lib/site-config';
import styles from './ContactPage.module.css';

export function ContactHero() {
  return (
    <section className={styles.hero} aria-labelledby="contact-hero-heading">
      <BlueprintGrid variant="contact" />
      <Container className={styles.heroInner}>
        <Reveal>
          <Breadcrumb
            items={[{ label: 'Home', href: routes.home }, { label: 'Contact' }]}
            gap={22}
          />
          <span className={styles.heroKicker}>Book a visit</span>
          <h1 id="contact-hero-heading" className={styles.heroTitle}>
            Talk to a real technician.
          </h1>
          <p className={styles.heroLede}>
            Book online and we&rsquo;ll confirm a two-hour arrival window by text — no all-day
            waiting, no call-center runaround.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
