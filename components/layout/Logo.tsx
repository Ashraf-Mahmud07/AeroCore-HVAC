import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import { routes, siteConfig } from '@/lib/site-config';
import { cn } from '@/lib/utils';
import styles from './Logo.module.css';

interface LogoProps {
  /** Renders the mark in accent-300 for the dark footer and mobile overlay. */
  readonly onDark?: boolean;
  /** When false the wordmark renders without a link (used inside the overlay). */
  readonly asLink?: boolean;
  readonly className?: string;
}

function Mark() {
  return (
    <span className={styles.mark} aria-hidden="true">
      <Icon name="wind" size={19} />
      <i className={styles.tickTl} />
      <i className={styles.tickBr} />
    </span>
  );
}

export function Logo({ onDark = false, asLink = true, className }: LogoProps) {
  const content = (
    <>
      <Mark />
      <span className={styles.wordmark}>{siteConfig.name}</span>
    </>
  );

  if (!asLink) {
    return <span className={cn(styles.logo, onDark && styles.onDark, className)}>{content}</span>;
  }

  return (
    <Link
      href={routes.home}
      className={cn(styles.logo, onDark && styles.onDark, className)}
      aria-label={`${siteConfig.name} — home`}
    >
      {content}
    </Link>
  );
}
