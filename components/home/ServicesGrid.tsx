import Link from 'next/link';
import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Corners } from '@/components/ui/Corners';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import buttonStyles from '@/components/ui/Button.module.css';
import { moreServices, services } from '@/lib/data';
import { routes } from '@/lib/site-config';
import { cn } from '@/lib/utils';
import styles from './ServicesGrid.module.css';

export function ServicesGrid() {
  return (
    <Section id="services" ariaLabelledBy="services-heading">
      <Container>
        <Reveal className={styles.head}>
          <div className={styles.headCopy}>
            <SectionHeading
              id="services-heading"
              kicker="02 — What we service"
              title="A full mechanical department, on call."
            />
          </div>
          <ButtonLink href={routes.services} variant="secondary" className={buttonStyles.noWrap}>
            All services
            <Icon name="arrow-right" size={16} />
          </ButtonLink>
        </Reveal>

        <div className={styles.grid}>
          {services.map((service) => (
            <Reveal key={service.title} className={styles.cardWrap}>
              <Link href={routes.services} className={cn('blueprint', styles.card)}>
                <Corners />
                {service.popular && (
                  <span className={cn('tag', 'tag-outline', styles.badge)}>Most requested</span>
                )}
                <span className={styles.iconBox}>
                  <Icon name={service.icon} size={24} />
                </span>
                <h3 className={styles.title}>{service.title}</h3>
                <p className={styles.body}>{service.body}</p>
                <span className={styles.linkRow}>
                  Learn more
                  <Icon name="arrow-right" size={15} />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal className={styles.also}>
          <span className={styles.alsoLabel}>Also:</span>
          {moreServices.map((label) => (
            <span key={label} className={cn('tag', 'tag-neutral', styles.alsoTag)}>
              {label}
            </span>
          ))}
        </Reveal>
      </Container>
    </Section>
  );
}
