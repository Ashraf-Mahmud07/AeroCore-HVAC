import Link from 'next/link';
import { PricingCard } from '@/components/shared/PricingCard';
import { Container } from '@/components/ui/Container';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { maintenancePlans } from '@/lib/data';
import { routes } from '@/lib/site-config';
import pricingStyles from '@/components/shared/PricingCard.module.css';
import styles from './PlansTeaser.module.css';

export function PlansTeaser() {
  return (
    <Section id="plans" tone="surface" border="both" ariaLabelledBy="plans-heading">
      <Container>
        <Reveal className={styles.head}>
          <SectionHeading
            id="plans-heading"
            kicker="07 — Comfort Club"
            title="Maintenance plans that pay for themselves."
            align="center"
            rule="short"
          >
            <p className={styles.lede}>
              Two tune-ups a year, priority dispatch, and no overtime charges — ever.
            </p>
          </SectionHeading>
        </Reveal>

        <div className={styles.grid}>
          {maintenancePlans.map((plan) => (
            <div key={plan.name} className={pricingStyles.wrap}>
              <PricingCard plan={plan} variant="teaser" />
            </div>
          ))}
        </div>

        <div className={styles.footer}>
          <Link href={routes.maintenancePlans} className={styles.compareLink}>
            Compare all plan features
            <Icon name="arrow-right" size={15} />
          </Link>
        </div>
      </Container>
    </Section>
  );
}
