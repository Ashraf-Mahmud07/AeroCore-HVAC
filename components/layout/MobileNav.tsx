'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Button, ButtonLink } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { mobileNav, routes, siteConfig, telHref } from '@/lib/site-config';
import styles from './MobileNav.module.css';

interface MobileNavProps {
  readonly id: string;
  readonly open: boolean;
  readonly onClose: () => void;
}

/** Full-screen navigation overlay. Traps nothing but focus-starts on Close and honours Escape. */
export function MobileNav({ id, open, onClose }: MobileNavProps) {
  const closeRef = useRef<HTMLDivElement>(null);

  useLockBodyScroll(open);

  useEffect(() => {
    if (!open) return;

    closeRef.current?.querySelector('button')?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onClose, open]);

  if (!open) return null;

  return (
    <div
      id={id}
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
    >
      <div className={styles.head} ref={closeRef}>
        <span className={styles.wordmark}>{siteConfig.name}</span>
        <Button
          variant="secondary"
          className={`btn-icon ${styles.close}`}
          ariaLabel="Close menu"
          onClick={onClose}
        >
          <Icon name="x" size={22} />
        </Button>
      </div>

      <nav aria-label="Mobile">
        {mobileNav.map((link) => (
          <Link key={link.label} href={link.href} className={styles.link} onClick={onClose}>
            {link.label}
            <Icon name="arrow-right" size={20} />
          </Link>
        ))}
      </nav>

      <div className={styles.actions}>
        <ButtonLink href={telHref} variant="secondary" block onDark onClick={onClose}>
          <Icon name="phone" size={16} />
          Call Now
        </ButtonLink>
        <ButtonLink href={routes.contact} variant="primary" block onClick={onClose}>
          <Icon name="calendar-check" size={16} />
          Book Service
        </ButtonLink>
      </div>
    </div>
  );
}
