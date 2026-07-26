import { cn } from '@/lib/utils';
import styles from './Section.module.css';

type SectionSize = 'lg' | 'md';
type SectionTone = 'default' | 'surface' | 'dark';

interface SectionProps {
  readonly children: React.ReactNode;
  readonly id?: string;
  readonly size?: SectionSize;
  readonly tone?: SectionTone;
  /** Draws the hairline rules above and below the band. */
  readonly bordered?: boolean;
  readonly className?: string;
  readonly ariaLabelledBy?: string;
  readonly ariaLabel?: string;
}

const sizeClass: Record<SectionSize, string | undefined> = {
  lg: styles.lg,
  md: styles.md,
};

const toneClass: Record<SectionTone, string | undefined> = {
  default: undefined,
  surface: styles.surface,
  dark: styles.dark,
};

export function Section({
  children,
  id,
  size = 'lg',
  tone = 'default',
  bordered = false,
  className,
  ariaLabelledBy,
  ariaLabel,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledBy}
      aria-label={ariaLabel}
      className={cn(sizeClass[size], toneClass[tone], bordered && styles.bordered, className)}
    >
      {children}
    </section>
  );
}
