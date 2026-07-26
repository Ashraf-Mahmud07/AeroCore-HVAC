import { Container } from '@/components/ui/Container';
import { Corners } from '@/components/ui/Corners';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { processSteps } from '@/lib/data';
import { cn } from '@/lib/utils';
import styles from './ProcessSteps.module.css';

export function ProcessSteps() {
  return (
    <Section id="process" ariaLabelledBy="process-heading">
      <Container>
        <Reveal className={styles.head}>
          <SectionHeading
            id="process-heading"
            kicker="04 — How it works"
            title="Five steps to comfort."
            align="center"
            rule="short"
          />
        </Reveal>

        <ol className={styles.grid}>
          {processSteps.map((step) => (
            <Reveal key={step.no} as="li" delay={step.delay} className={styles.stepWrap}>
              <div className={cn('blueprint', styles.step)}>
                <Corners />
                <div className={styles.stepTop}>
                  <span className={styles.stepNo}>{step.no}</span>
                  <span className={styles.stepIcon}>
                    <Icon name={step.icon} size={22} />
                  </span>
                </div>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepBody}>{step.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
