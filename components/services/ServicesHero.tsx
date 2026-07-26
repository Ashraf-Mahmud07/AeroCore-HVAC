import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { BlueprintGrid } from '@/components/ui/BlueprintGrid';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { routes } from '@/lib/site-config';
import styles from './ServicesPage.module.css';

export function ServicesHero() {
  return (
    <section className={styles.hero} aria-labelledby="services-hero-heading">
      <BlueprintGrid variant="services" />
      <Container className={styles.heroInner}>
        <Reveal>
          <Breadcrumb
            items={[{ label: 'Home', href: routes.home }, { label: 'Services' }]}
            gap={24}
          />
        </Reveal>
        <Reveal className={styles.heroStack}>
          <div>
            <span className={styles.heroKicker}>Full-service mechanical</span>
            <h1 id="services-hero-heading" className={styles.heroTitle}>
              Everything that moves
              <br />
              air and heat.
            </h1>
          </div>
          <p className={styles.heroLede}>
            From a single mini-split to a building-wide VRF retrofit, one accountable team designs
            it, installs it, and keeps it running — measured at every step.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
