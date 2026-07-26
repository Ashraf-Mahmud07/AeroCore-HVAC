import { ButtonLink } from '@/components/ui/Button';
import { Corners } from '@/components/ui/Corners';
import { Counter } from '@/components/ui/Counter';
import { DuotoneImage } from '@/components/ui/DuotoneImage';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { StarRating } from '@/components/ui/StarRating';
import { homeImages } from '@/lib/data';
import { routes, siteConfig } from '@/lib/site-config';
import { cn } from '@/lib/utils';
import styles from './Hero.module.css';

/** The default hero: copy on the left, framed portrait plate on the right. */
export function HeroSplit() {
  return (
    <div className={styles.split}>
      <Reveal>
        <span className={styles.badge}>
          <Icon name="shield-check" size={15} />
          Licensed · Bonded · Insured
        </span>
        <h1 id="hero-heading" className={styles.title}>
          Precision climate
          <br />
          for the <span className={styles.titleAccent}>buildings</span>
          <br />
          you live in.
        </h1>
        <p className={styles.lede}>
          {siteConfig.name} designs, installs and services high-efficiency heating and cooling
          systems — engineered to spec, commissioned by data, and backed for as long as you own the
          building.
        </p>
        <div className={styles.actions}>
          <ButtonLink href={routes.contact} variant="primary" size="cta">
            <Icon name="calendar-check" size={17} />
            Book a Service
          </ButtonLink>
          <ButtonLink href={routes.contact} variant="secondary" size="cta">
            <Icon name="file-text" size={17} />
            Get a Free Estimate
          </ButtonLink>
        </div>

        <div className={styles.trust}>
          <div className={styles.trustRating}>
            <StarRating size={16} label={`Rated ${siteConfig.rating.display} out of 5`} />
            <span className={styles.trustText}>
              <strong className={styles.trustFigure}>{siteConfig.rating.display}</strong> ·{' '}
              {siteConfig.rating.countDisplay} Google reviews
            </span>
          </div>
          <div className={styles.trustDivider} aria-hidden="true" />
          <div className={styles.trustText}>
            <strong className={styles.trustFigure}>{siteConfig.yearsInBusiness} yrs</strong>
            <br />
            in the field
          </div>
          <div className={styles.trustDivider} aria-hidden="true" />
          <div className={styles.trustText}>
            <strong className={styles.trustFigure}>EPA</strong>
            <br />
            certified techs
          </div>
        </div>
      </Reveal>

      <Reveal delay={140} className={styles.media}>
        <figure className={cn('blueprint', styles.mediaFrame)}>
          <DuotoneImage
            image={homeImages.heroSplit}
            priority
            sizes="(max-width: 820px) 100vw, 45vw"
          />
          <Corners />
        </figure>

        <div className={cn('blueprint', styles.statCard, styles.statCardLeft)}>
          <Corners />
          <div className={styles.statLabel}>Avg. response</div>
          <div className={styles.statValue}>
            <Counter target={60} suffix=" min" display="60 min" />
          </div>
        </div>

        <div className={cn('blueprint', styles.statCard, styles.statCardRight)}>
          <Corners color="var(--color-accent-300)" />
          <div className={styles.statLabel}>Systems commissioned</div>
          <div className={styles.statValue}>
            <Counter target={18400} suffix="+" display="18,400+" />
          </div>
        </div>
      </Reveal>
    </div>
  );
}
