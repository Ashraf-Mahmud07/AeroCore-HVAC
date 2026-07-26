import { Container } from '@/components/ui/Container';
import { Corners } from '@/components/ui/Corners';
import { Counter } from '@/components/ui/Counter';
import { DuotoneImage } from '@/components/ui/DuotoneImage';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { homeImages, stats, whyCards } from '@/lib/data';
import { siteConfig } from '@/lib/site-config';
import { cn } from '@/lib/utils';
import styles from './WhyChooseUs.module.css';

export function WhyChooseUs() {
  return (
    <Section id="about" tone="surface" bordered ariaLabelledBy="about-heading">
      <Container>
        <div className={styles.stack}>
          <Reveal>
            <figure className={cn('blueprint', styles.frame)}>
              <DuotoneImage image={homeImages.whyTeam} sizes="(max-width: 820px) 100vw, 45vw" />
              <Corners />
              <figcaption className={cn('blueprint', styles.awardCard)}>
                <Corners />
                <Icon name="award" size={26} className={styles.awardIcon} />
                <div className={styles.awardTitle}>Diamond-certified contractor</div>
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={120}>
            <SectionHeading
              id="about-heading"
              kicker={`03 — Why ${siteConfig.name}`}
              title="Trades in guesswork. We deal in measurements."
              size={50}
            />
            <p className={styles.lede}>
              Anyone can swap a box. We size the load, verify airflow, and hand you the numbers that
              prove the system does what we sold. That discipline is why 8 in 10 new jobs come from
              a neighbor&rsquo;s referral.
            </p>

            <div className={styles.cards}>
              {whyCards.map((card) => (
                <div key={card.title} className={cn('blueprint', styles.card)}>
                  <Corners />
                  <Icon name={card.icon} size={22} className={styles.cardIcon} />
                  <h3 className={styles.cardTitle}>{card.title}</h3>
                  <p className={styles.cardBody}>{card.body}</p>
                </div>
              ))}
            </div>

            <div className={styles.stats}>
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className={styles.statValue}>
                    <Counter target={stat.n} suffix={stat.suffix} display={stat.display} />
                  </div>
                  <div className={styles.statLabel}>{stat.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
