import { cn } from '@/lib/utils';
import styles from './SectionHeading.module.css';

/** The four `<h2>` scales the design components use. */
export type HeadingSize = 54 | 52 | 50 | 46;

const sizeClass: Record<HeadingSize, string | undefined> = {
  54: styles.size54,
  52: styles.size52,
  50: styles.size50,
  46: styles.size46,
};

interface SectionHeadingProps {
  readonly id: string;
  readonly kicker: string;
  readonly title: React.ReactNode;
  readonly size?: HeadingSize;
  readonly align?: 'left' | 'center';
  readonly tone?: 'light' | 'dark';
  /** `full` spans the column, `short` is the 60px centred rule, `false` omits it. */
  readonly rule?: 'full' | 'short' | false;
  /** Gap above the title when no rule is drawn, in pixels. */
  readonly titleGap?: number;
  readonly children?: React.ReactNode;
}

/**
 * The numbered kicker → hairline rule → uppercase headline block that opens
 * nearly every section in the design.
 */
export function SectionHeading({
  id,
  kicker,
  title,
  size = 54,
  align = 'left',
  tone = 'light',
  rule = 'full',
  titleGap = 14,
  children,
}: SectionHeadingProps) {
  const dark = tone === 'dark';
  const centered = align === 'center';

  return (
    <>
      <span className={cn(styles.kicker, dark && styles.kickerDark)}>{kicker}</span>
      {rule !== false && (
        <div
          aria-hidden="true"
          className={cn(
            styles.rule,
            dark && styles.ruleDark,
            rule === 'short' && (centered ? styles.ruleShort : styles.ruleShortLeft),
          )}
        />
      )}
      <h2
        id={id}
        className={cn(styles.title, sizeClass[size])}
        style={rule === false ? { marginTop: titleGap } : undefined}
      >
        {title}
      </h2>
      {children}
    </>
  );
}
