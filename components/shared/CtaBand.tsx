import { Container } from '@/components/ui/Container';
import { Corners } from '@/components/ui/Corners';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { cn } from '@/lib/utils';
import styles from './CtaBand.module.css';

interface CtaBandProps {
  readonly id: string;
  readonly title: string;
  readonly body: string;
  readonly children: React.ReactNode;
}

/** The closing call-to-action panel on the services page. */
export function CtaBand({ id, title, body, children }: CtaBandProps) {
  return (
    <Section size="md" ariaLabelledBy={id}>
      <Container>
        <Reveal>
          <div className={cn('blueprint', styles.band)}>
            <Corners />
            <div className={styles.copy}>
              <h2 id={id} className={styles.title}>
                {title}
              </h2>
              <p className={styles.body}>{body}</p>
            </div>
            <div className={styles.actions}>{children}</div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
