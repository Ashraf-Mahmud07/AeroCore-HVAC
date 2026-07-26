'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ButtonLink, Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { useScrolled } from '@/hooks/useScrolled';
import { mailHref, mainNav, routes, siteConfig, telHref } from '@/lib/site-config';
import { cn } from '@/lib/utils';
import buttonStyles from '@/components/ui/Button.module.css';
import { Logo } from './Logo';
import { MobileNav } from './MobileNav';
import { SocialIcon, socialNetworks } from './SocialIcon';
import styles from './Header.module.css';

const MOBILE_NAV_ID = 'ac-mobile-nav';

/** A nav entry is current when it points at the page being viewed. */
function isCurrent(href: string, pathname: string): boolean {
  if (href.includes('#')) return false;
  return href === pathname;
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = useScrolled(36);
  const pathname = usePathname();

  return (
    <>
      <header className={cn(styles.header, scrolled && styles.scrolled)}>
        {siteConfig.showTopBar && (
          <div className={styles.topBar}>
            <div className={styles.topBarInner}>
              <a href={telHref} className={styles.topPhone}>
                <Icon name="phone-call" size={15} />
                {siteConfig.phone}
              </a>
              <span className={styles.topEmergency}>
                <Icon name="siren" size={15} />
                {siteConfig.emergencyLabel}
              </span>
              <div className={styles.topBarRight}>
                <span className={styles.topMeta}>
                  <Icon name="clock" size={14} />
                  {siteConfig.hoursSummary}
                </span>
                <a href={mailHref} className={styles.topEmail}>
                  <Icon name="mail" size={14} />
                  {siteConfig.email}
                </a>
                <span className={styles.topSocial}>
                  {socialNetworks.map(({ network, label }) => (
                    <a key={network} href={siteConfig.social[network]} aria-label={label}>
                      <SocialIcon network={network} size={14} color="var(--color-bg)" />
                    </a>
                  ))}
                </span>
              </div>
            </div>
          </div>
        )}

        <nav className={styles.nav} aria-label="Primary">
          <Logo />

          <div className={styles.desktopNav}>
            {mainNav.map((link) => {
              const current = isCurrent(link.href, pathname);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(styles.navLink, current && styles.navLinkActive)}
                  aria-current={current ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <ButtonLink
            href={telHref}
            variant="secondary"
            className={cn(buttonStyles.gap7, styles.navCta)}
          >
            <Icon name="phone" size={15} />
            Call Now
          </ButtonLink>
          <ButtonLink
            href={routes.contact}
            variant="primary"
            className={cn(buttonStyles.gap7, styles.navCta)}
          >
            <Icon name="calendar-check" size={15} />
            Book Service
          </ButtonLink>

          <Button
            variant="secondary"
            className={cn('btn-icon', styles.hamburger)}
            ariaLabel="Open menu"
            ariaExpanded={menuOpen}
            ariaControls={MOBILE_NAV_ID}
            onClick={() => setMenuOpen(true)}
          >
            <Icon name="menu" size={20} />
          </Button>
        </nav>
      </header>

      <MobileNav id={MOBILE_NAV_ID} open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
