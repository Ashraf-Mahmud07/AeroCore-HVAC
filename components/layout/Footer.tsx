import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Icon } from '@/components/ui/Icon';
import {
  footerCompanyLinks,
  footerLegalLinks,
  footerServiceLinks,
  mailHref,
  routes,
  siteConfig,
  telHref,
} from '@/lib/site-config';
import { cn } from '@/lib/utils';
import { Logo } from './Logo';
import { SocialIcon, socialNetworks } from './SocialIcon';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.grid}>
          <div>
            <Logo onDark className={styles.brandRow} />
            <p className={styles.blurb}>{siteConfig.footerDescription}</p>
            <div className={styles.socials}>
              {socialNetworks.map(({ network, label }) => (
                <a
                  key={network}
                  href={siteConfig.social[network]}
                  aria-label={label}
                  className={cn('btn', 'btn-icon', styles.socialBtn)}
                >
                  <SocialIcon network={network} size={18} color="var(--color-bg)" />
                </a>
              ))}
            </div>
          </div>

          <nav aria-labelledby="footer-company">
            <h2 id="footer-company" className={styles.colTitle}>
              Company
            </h2>
            {footerCompanyLinks.map((link) => (
              <Link key={link.label} href={link.href} className={styles.colLink}>
                {link.label}
              </Link>
            ))}
          </nav>

          <nav aria-labelledby="footer-services">
            <h2 id="footer-services" className={styles.colTitle}>
              Services
            </h2>
            {footerServiceLinks.map((label) => (
              <Link key={label} href={routes.services} className={styles.colLink}>
                {label}
              </Link>
            ))}
          </nav>

          <div>
            <h2 id="footer-contact" className={styles.colTitle}>
              Contact
            </h2>
            <a href={telHref} className={styles.contactLink}>
              <Icon name="phone" size={15} />
              {siteConfig.phone}
            </a>
            <a href={mailHref} className={cn(styles.contactLink, styles.contactLinkMuted)}>
              <Icon name="mail" size={15} />
              {siteConfig.email}
            </a>
            <address className={styles.address}>
              <Icon name="map-pin" size={15} />
              <span>
                {siteConfig.address.street},
                <br />
                {siteConfig.address.locality}, {siteConfig.address.region}{' '}
                {siteConfig.address.postalCode}
              </span>
            </address>
            <div className={styles.badges}>
              <span className={cn('tag', styles.badge)}>{siteConfig.license}</span>
              <span className={cn('tag', styles.badge)}>{siteConfig.certification}</span>
            </div>
          </div>
        </div>

        <div className={styles.legal}>
          <span>
            © {siteConfig.copyrightYear} {siteConfig.legalName} All rights reserved.
          </span>
          <div className={styles.legalLinks}>
            {footerLegalLinks.map((link) => (
              <a key={link.label} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
