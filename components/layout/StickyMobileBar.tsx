import { ButtonLink } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { routes, telHref } from '@/lib/site-config';
import styles from './StickyMobileBar.module.css';

/** Persistent Call / Book pair pinned to the bottom of narrow viewports. */
export function StickyMobileBar() {
  return (
    <div className={styles.bar} aria-label="Quick actions">
      <ButtonLink href={telHref} variant="secondary" size="blockRow">
        <Icon name="phone" size={17} />
        Call Now
      </ButtonLink>
      <ButtonLink href={routes.contact} variant="primary" size="blockRow">
        <Icon name="calendar-check" size={17} />
        Book Service
      </ButtonLink>
    </div>
  );
}
