import { ButtonLink } from '@/components/ui/Button';
import { Corners } from '@/components/ui/Corners';
import { Icon } from '@/components/ui/Icon';
import { routes } from '@/lib/site-config';
import { cn } from '@/lib/utils';
import type { MaintenancePlan } from '@/types';
import styles from './PricingCard.module.css';

interface PricingCardProps {
  readonly plan: MaintenancePlan;
  /** `teaser` is the homepage Comfort Club block; `full` is the plans page. */
  readonly variant: 'teaser' | 'full';
}

/**
 * Comfort Club plan card. The per-plan colours are data, not layout, so they
 * ride in as custom properties rather than becoming three near-identical classes.
 */
export function PricingCard({ plan, variant }: PricingCardProps) {
  const features = variant === 'teaser' ? plan.homeFeatures : plan.features;
  const href = variant === 'teaser' ? routes.maintenancePlans : routes.contact;

  return (
    <div
      className={cn('blueprint', styles.card, styles[variant])}
      style={{
        ['--ac-plan-bg' as string]: plan.theme.bg,
        ['--ac-plan-fg' as string]: plan.theme.fg,
        ['--ac-plan-rule' as string]: plan.theme.rule,
        ['--ac-plan-check' as string]: plan.theme.check,
        ['--ac-ribbon-left' as string]: variant === 'teaser' ? '26px' : '28px',
        ['--ac-ribbon-top' as string]: variant === 'teaser' ? '-12px' : '-13px',
      }}
    >
      <Corners color={plan.theme.corner} />
      {plan.popular && <span className={styles.ribbon}>Most popular</span>}

      <h3 className={styles.name}>{plan.name}</h3>
      <p className={styles.tagline}>{plan.tagline}</p>

      <div className={styles.priceRow}>
        <span className={styles.price}>{plan.price}</span>
        <span className={styles.period}>/ {plan.period}</span>
      </div>
      {variant === 'full' && <div className={styles.annual}>{plan.annual}</div>}

      <div className={styles.rule} aria-hidden="true" />

      <ul className={styles.features}>
        {features.map((feature) => (
          <li key={feature} className={styles.feature}>
            <Icon name="check" size={17} className={styles.check} />
            {feature}
          </li>
        ))}
      </ul>

      <ButtonLink
        href={href}
        variant={plan.theme.btnClass === 'btn-primary' ? 'primary' : 'secondary'}
        block
        onDark={plan.theme.btnClass === 'btn-secondary' && plan.theme.fg === 'var(--color-bg)'}
        className={styles.cta}
      >
        {plan.cta}
      </ButtonLink>
    </div>
  );
}
