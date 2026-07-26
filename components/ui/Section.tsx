import { cn } from '@/lib/utils';
import styles from './Section.module.css';

type SectionSize = 'lg' | 'md' | 'sm';
type SectionTone = 'default' | 'surface' | 'dark';
type SectionBorder = 'none' | 'both' | 'top' | 'bottom';

interface SectionProps {
  readonly children: React.ReactNode;
  readonly id?: string;
  readonly size?: SectionSize;
  readonly tone?: SectionTone;
  readonly border?: SectionBorder;
  readonly className?: string;
  readonly ariaLabelledBy?: string;
  readonly ariaLabel?: string;
}

const sizeClass: Record<SectionSize, string | undefined> = {
  lg: styles.lg,
  md: styles.md,
  sm: styles.sm,
};

const toneClass: Record<SectionTone, string | undefined> = {
  default: undefined,
  surface: styles.surface,
  dark: styles.dark,
};

const borderClass: Record<SectionBorder, string | undefined> = {
  none: undefined,
  both: styles.bordered,
  top: styles.borderedTop,
  bottom: styles.borderedBottom,
};

export function Section({
  children,
  id,
  size = 'lg',
  tone = 'default',
  border = 'none',
  className,
  ariaLabelledBy,
  ariaLabel,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledBy}
      aria-label={ariaLabel}
      className={cn(sizeClass[size], toneClass[tone], borderClass[border], className)}
    >
      {children}
    </section>
  );
}
