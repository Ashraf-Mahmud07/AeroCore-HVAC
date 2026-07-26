import { Container } from '@/components/ui/Container';
import { Corners } from '@/components/ui/Corners';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { planPerks } from '@/lib/data';
import { cn } from '@/lib/utils';
import styles from './MaintenancePage.module.css';

export function PerksGrid() {
  return (
    <Section size="sm" ariaLabel="Why members join">
      <Container>
        <ul className={styles.perks}>
          {planPerks.map((perk) => (
            <Reveal key={perk.title} as="li" className={styles.perkWrap}>
              <div className={cn('blueprint', styles.perk)}>
                <Corners />
                <span className={styles.perkIcon}>
                  <Icon name={perk.icon} size={22} />
                </span>
                <h2 className={styles.perkTitle}>{perk.title}</h2>
                <p className={styles.perkBody}>{perk.body}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
