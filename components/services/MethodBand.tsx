import { Container } from '@/components/ui/Container';
import { Corners } from '@/components/ui/Corners';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { methodSteps } from '@/lib/data';
import { cn } from '@/lib/utils';
import styles from './ServicesPage.module.css';

export function MethodBand() {
  return (
    <Section size="md" tone="dark" ariaLabelledBy="method-heading">
      <Container>
        <Reveal className={styles.methodHead}>
          <SectionHeading
            id="method-heading"
            kicker="The AeroCore method"
            title="No guessing. Every job, instrumented."
            size={52}
            tone="dark"
            rule={false}
            titleGap={16}
          />
        </Reveal>

        <ol className={styles.methodGrid}>
          {methodSteps.map((step) => (
            <Reveal key={step.no} as="li" className={styles.methodWrap}>
              <div className={cn('blueprint', styles.methodCard)}>
                <Corners color="var(--color-accent-300)" />
                <span className={styles.methodNo}>{step.no}</span>
                <h3 className={styles.methodTitle}>{step.title}</h3>
                <p className={styles.methodBody}>{step.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
