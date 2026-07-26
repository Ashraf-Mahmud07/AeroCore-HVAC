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
  readonly tone: 'surface' | 'dark';
  /** Copy measure — 52ch on the services page, 50ch on the plans page. */
  readonly measure?: string;
  readonly size?: 'md' | 'sm';
  readonly children: React.ReactNode;
}

/** The closing call-to-action panel used by the services and plans pages. */
export function CtaBand({
  id,
  title,
  body,
  tone,
  measure = '52ch',
  size = 'md',
  children,
}: CtaBandProps) {
  return (
    <Section size={size} ariaLabelledBy={id}>
      <Container>
        <Reveal>
          <div className={cn('blueprint', styles.band, styles[tone])}>
            <Corners color={tone === 'dark' ? 'var(--color-accent-300)' : undefined} />
            <div className={styles.copy} style={{ ['--ac-cta-measure' as string]: measure }}>
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
