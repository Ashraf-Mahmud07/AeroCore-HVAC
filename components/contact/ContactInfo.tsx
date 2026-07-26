import { Corners } from '@/components/ui/Corners';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { businessHours, contactInfoCards } from '@/lib/data';
import { mailHref, siteConfig, telHref } from '@/lib/site-config';
import { cn } from '@/lib/utils';
import styles from './ContactPage.module.css';

/** Renders the value of an info card, linking phone and email where relevant. */
function InfoValue({ label, value }: { readonly label: string; readonly value: string }) {
  if (label === 'Phone') {
    const [number, note] = value.split(' · ');
    return (
      <>
        <a href={telHref}>{number}</a>
        {note ? ` · ${note}` : null}
      </>
    );
  }
  if (label === 'Email') return <a href={mailHref}>{value}</a>;
  return <>{value}</>;
}

export function ContactInfo() {
  return (
    <Reveal className={styles.info}>
      <div className={cn('blueprint', styles.emergency)}>
        <Corners color="var(--color-accent-300)" />
        <span className={styles.emergencyIcon}>
          <Icon name="siren" size={24} />
        </span>
        <div>
          <div className={styles.emergencyLabel}>24/7 Emergency line</div>
          <a href={telHref} className={styles.emergencyPhone}>
            {siteConfig.phone}
          </a>
        </div>
      </div>

      {contactInfoCards.map((card) => (
        <div key={card.label} className={cn('blueprint', styles.infoCard)}>
          <Corners />
          <span className={styles.infoIcon}>
            <Icon name={card.icon} size={20} />
          </span>
          <div>
            <div className={styles.infoLabel}>{card.label}</div>
            <address className={styles.infoValue}>
              <InfoValue label={card.label} value={card.value} />
            </address>
          </div>
        </div>
      ))}

      <div className={cn('blueprint', styles.hours)}>
        <Corners />
        <h2 className={styles.hoursTitle}>Business hours</h2>
        <dl>
          {businessHours.map((entry) => (
            <div key={entry.day} className={styles.hoursRow}>
              <dt>{entry.day}</dt>
              <dd className={styles.hoursTime}>{entry.time}</dd>
            </div>
          ))}
        </dl>
      </div>

      <figure className={cn('blueprint', styles.mapFrame)}>
        <Corners />
        <div className={styles.mapGrid} aria-hidden="true" />
        <svg
          viewBox="0 0 400 300"
          className={styles.mapSvg}
          role="img"
          aria-label={`Stylized map showing the ${siteConfig.name} office at ${siteConfig.address.full}`}
        >
          <path
            d="M0 120 L150 110 L155 300"
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="6"
            opacity="0.25"
          />
          <path
            d="M40 0 L60 180 L400 200"
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="6"
            opacity="0.25"
          />
          <path
            d="M0 220 L400 240"
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="3"
            opacity="0.2"
          />
          <circle cx="158" cy="150" r="30" fill="var(--color-accent)" opacity="0.15" />
          <circle cx="158" cy="150" r="9" fill="var(--color-accent-700)" />
          <circle
            cx="158"
            cy="150"
            r="9"
            fill="none"
            stroke="var(--color-accent-700)"
            strokeWidth="2"
          />
        </svg>
        <figcaption className={styles.mapPin}>
          <Icon name="map-pin" size={14} className={styles.mapPinIcon} />
          {siteConfig.address.short}
        </figcaption>
      </figure>
    </Reveal>
  );
}
