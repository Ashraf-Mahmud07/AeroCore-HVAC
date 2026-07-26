import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Corners } from '@/components/ui/Corners';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { serviceCatalog } from '@/lib/data';
import { routes } from '@/lib/site-config';
import { cn } from '@/lib/utils';
import styles from './ServicesPage.module.css';

export function ServiceCatalog() {
  return (
    <Section size="md" ariaLabel="Service catalog">
      <Container>
        <ul className={styles.catalog}>
          {serviceCatalog.map((service) => (
            <Reveal key={service.title} as="li" className={styles.cardWrap}>
              <div className={cn('blueprint', styles.card)}>
                <Corners />
                {service.tag && (
                  <span className={cn('tag', 'tag-outline', styles.cardTag)}>{service.tag}</span>
                )}
                <span className={styles.cardIcon}>
                  <Icon name={service.icon} size={25} />
                </span>
                <h2 className={styles.cardTitle}>{service.title}</h2>
                <p className={styles.cardBody}>{service.body}</p>
                <ul className={styles.points}>
                  {service.points.map((point) => (
                    <li key={point} className={styles.point}>
                      <Icon name="check" size={16} className={styles.pointCheck} />
                      {point}
                    </li>
                  ))}
                </ul>
                <ButtonLink
                  href={routes.contact}
                  variant="secondary"
                  block
                  className={styles.cardCta}
                  ariaLabel={`Book ${service.title}`}
                >
                  <Icon name="calendar-check" size={15} />
                  Book this service
                </ButtonLink>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
