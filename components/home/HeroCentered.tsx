import { ButtonLink } from '@/components/ui/Button';
import { Corners } from '@/components/ui/Corners';
import { Counter } from '@/components/ui/Counter';
import { DuotoneImage } from '@/components/ui/DuotoneImage';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { heroStats, homeImages } from '@/lib/data';
import { routes, siteConfig, telHref } from '@/lib/site-config';
import { cn } from '@/lib/utils';
import styles from './Hero.module.css';

/** Centred hero with a 21:9 plate and an overlaid statistics strip. */
export function HeroCentered() {
  return (
    <>
      <Reveal className={styles.centered}>
        <span className={styles.badge}>
          <Icon name="shield-check" size={15} />
          Licensed · Bonded · Insured · EPA-certified
        </span>
        <h1 id="hero-heading" className={cn(styles.title, styles.centeredTitle)}>
          Comfort, engineered
          <br />
          to <span className={styles.titleAccent}>specification.</span>
        </h1>
        <p className={cn(styles.lede, styles.centeredLede)}>
          Heating, cooling and air-quality systems designed by mechanical engineers, installed by
          EPA-certified technicians, and commissioned with real measurements — not guesswork.
        </p>
        <div className={cn(styles.actions, styles.centeredActions)}>
          <ButtonLink href={routes.contact} variant="primary" size="cta">
            <Icon name="calendar-check" size={17} />
            Book a Service
          </ButtonLink>
          <ButtonLink href={telHref} variant="secondary" size="cta">
            <Icon name="phone" size={17} />
            Call {siteConfig.phone}
          </ButtonLink>
        </div>
      </Reveal>

      <Reveal delay={140}>
        <figure className={cn('blueprint', styles.wideFrame)}>
          <DuotoneImage
            image={homeImages.heroWide}
            priority
            sizes="(max-width: 1120px) 100vw, 1120px"
          />
          <Corners />
          <div className={styles.wideStats}>
            {heroStats.map((stat) => (
              <div key={stat.label} className={styles.wideStat}>
                <div className={styles.wideStatValue}>
                  <Counter target={stat.n} suffix={stat.suffix} display={stat.display} />
                </div>
                <div className={styles.wideStatLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </figure>
      </Reveal>
    </>
  );
}
