import { PricingCard } from '@/components/shared/PricingCard';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { maintenancePlans } from '@/lib/data';
import pricingStyles from '@/components/shared/PricingCard.module.css';
import styles from './MaintenancePage.module.css';

export function PricingGrid() {
  return (
    <section className={styles.pricing} aria-label="Comfort Club plans">
      <Container width={1180}>
        <div className={styles.pricingGrid}>
          {maintenancePlans.map((plan) => (
            <Reveal key={plan.name} className={pricingStyles.wrap}>
              <PricingCard plan={plan} variant="full" />
            </Reveal>
          ))}
        </div>
        <p className={styles.pricingNote}>
          Billed monthly, cancel anytime. Plans cover one system; add systems for $9/mo each.
        </p>
      </Container>
    </section>
  );
}
