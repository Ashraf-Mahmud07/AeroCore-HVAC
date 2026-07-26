import { Fragment } from 'react';
import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import { cn } from '@/lib/utils';
import type { BreadcrumbItem } from '@/types';
import styles from './Breadcrumb.module.css';

interface BreadcrumbProps {
  readonly items: readonly BreadcrumbItem[];
  readonly align?: 'left' | 'center';
  /** Bottom margin in pixels — 24 on services, 22 on plans and contact. */
  readonly gap?: number;
}

export function Breadcrumb({ items, align = 'left', gap = 24 }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(styles.crumbs, align === 'center' && styles.center)}
      style={{ ['--ac-crumb-gap' as string]: `${gap}px` }}
    >
      {items.map((item, index) => (
        <Fragment key={item.label}>
          {index > 0 && <Icon name="chevron-right" size={14} />}
          {item.href ? (
            <Link href={item.href} className={styles.link}>
              {item.label}
            </Link>
          ) : (
            <span className={styles.current} aria-current="page">
              {item.label}
            </span>
          )}
        </Fragment>
      ))}
    </nav>
  );
}
