import Link from 'next/link';
import { cn } from '@/lib/utils';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'default' | 'cta' | 'ctaWide' | 'blockRow';

const variantClass: Record<ButtonVariant, string> = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  ghost: 'btn-ghost',
};

const sizeClass: Record<ButtonSize, string | undefined> = {
  default: undefined,
  cta: styles.cta,
  ctaWide: styles.ctaWide,
  blockRow: styles.blockRow,
};

interface SharedProps {
  readonly children: React.ReactNode;
  readonly variant?: ButtonVariant;
  readonly size?: ButtonSize;
  readonly block?: boolean;
  /** Applies the light-on-dark treatment used inside accent-900 panels. */
  readonly onDark?: boolean;
  readonly className?: string;
}

function buttonClasses({
  variant = 'secondary',
  size = 'default',
  block,
  onDark,
  className,
}: Omit<SharedProps, 'children'>): string {
  return cn(
    'btn',
    variantClass[variant],
    sizeClass[size],
    block && 'btn-block',
    onDark && styles.onDark,
    className,
  );
}

interface ButtonLinkProps extends SharedProps {
  readonly href: string;
  readonly ariaLabel?: string;
  readonly ariaCurrent?: 'page';
  readonly onClick?: () => void;
}

/** Anchor-styled button. Internal routes get `next/link` prefetching. */
export function ButtonLink({
  href,
  children,
  ariaLabel,
  ariaCurrent,
  onClick,
  ...rest
}: ButtonLinkProps) {
  const className = buttonClasses(rest);
  const isInternal = href.startsWith('/');

  if (isInternal) {
    return (
      <Link
        href={href}
        className={className}
        aria-label={ariaLabel}
        aria-current={ariaCurrent}
        onClick={onClick}
      >
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      className={className}
      aria-label={ariaLabel}
      aria-current={ariaCurrent}
      onClick={onClick}
    >
      {children}
    </a>
  );
}

interface ButtonProps extends SharedProps {
  readonly type?: 'button' | 'submit';
  readonly onClick?: () => void;
  readonly ariaLabel?: string;
  readonly ariaExpanded?: boolean;
  readonly ariaControls?: string;
  readonly disabled?: boolean;
}

export function Button({
  children,
  type = 'button',
  onClick,
  ariaLabel,
  ariaExpanded,
  ariaControls,
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonClasses(rest)}
      onClick={onClick}
      aria-label={ariaLabel}
      aria-expanded={ariaExpanded}
      aria-controls={ariaControls}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
