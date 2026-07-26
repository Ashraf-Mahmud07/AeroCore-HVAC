import type { Metadata } from 'next';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { SkipLink } from '@/components/layout/SkipLink';
import { StickyMobileBar } from '@/components/layout/StickyMobileBar';
import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Icon } from '@/components/ui/Icon';
import { routes, telHref } from '@/lib/site-config';
import styles from './not-found.module.css';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <SkipLink />
      <Header />
      <main id="main" className={styles.main}>
        <Container width={900}>
          <span className={styles.kicker}>Error 404</span>
          <h1 className={styles.title}>This page isn&rsquo;t on the drawing.</h1>
          <p className={styles.body}>
            The page you asked for has moved or never existed. Head back to the homepage, or call us
            and a dispatcher will point you the right way.
          </p>
          <div className={styles.actions}>
            <ButtonLink href={routes.home} variant="primary" size="cta">
              <Icon name="arrow-right" size={17} />
              Back to homepage
            </ButtonLink>
            <ButtonLink href={telHref} variant="secondary" size="cta">
              <Icon name="phone" size={17} />
              Call Now
            </ButtonLink>
          </div>
        </Container>
      </main>
      <Footer />
      <StickyMobileBar />
    </>
  );
}
