import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { BlueprintGrid } from '@/components/ui/BlueprintGrid';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { routes } from '@/lib/site-config';
import styles from './MaintenancePage.module.css';

export function PlansHero() {
  return (
    <section className={styles.hero} aria-labelledby="plans-hero-heading">
      <BlueprintGrid variant="plans" />
      <Container className={styles.heroInner}>
        <Reveal>
          <Breadcrumb
            items={[{ label: 'Home', href: routes.home }, { label: 'Maintenance Plans' }]}
            align="center"
            gap={22}
          />
          <span className={styles.heroKicker}>The Comfort Club</span>
          <h1 id="plans-hero-heading" className={styles.heroTitle}>
            Plans that pay for themselves.
          </h1>
          <p className={styles.heroLede}>
            Two precision tune-ups a year keep efficiency high, catch failures before they strand
            you, and keep your manufacturer warranty valid. Members skip the queue and never pay
            overtime.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
