import { Container } from '@/components/ui/Container';
import { Corners } from '@/components/ui/Corners';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { serviceAreas } from '@/lib/data';
import { cn } from '@/lib/utils';
import styles from './ServiceAreas.module.css';
import { ZipChecker } from './ZipChecker';

export function ServiceAreas() {
  return (
    <Section id="areas" tone="dark" ariaLabelledBy="areas-heading">
      <Container>
        <div className={styles.stack}>
          <Reveal>
            <SectionHeading
              id="areas-heading"
              kicker="08 — Coverage"
              title="Serving the Bay Area & beyond."
              size={50}
              tone="dark"
            />
            <p className={styles.lede}>
              Same-day dispatch across nine metros. Not sure if you&rsquo;re in range? Drop your ZIP
              and we&rsquo;ll confirm on the spot.
            </p>

            <ul className={styles.areas}>
              {serviceAreas.map((area) => (
                <li key={area} className={styles.area}>
                  <Icon name="map-pin" size={15} className={styles.areaPin} />
                  <span>{area}</span>
                </li>
              ))}
            </ul>

            <ZipChecker />
          </Reveal>

          <Reveal delay={120}>
            <figure className={cn('blueprint', styles.mapFrame)}>
              <Corners color="var(--color-accent-300)" />
              <div className={styles.mapGrid} aria-hidden="true" />
              <svg
                viewBox="0 0 400 400"
                className={styles.mapSvg}
                role="img"
                aria-label="Stylized coverage map centred on San Francisco"
              >
                <path
                  d="M60 120 L150 70 L250 90 L330 60 L360 160 L320 260 L340 340 L230 330 L150 360 L70 300 L40 210 Z"
                  fill="none"
                  stroke="var(--color-accent-300)"
                  strokeWidth="1.5"
                  opacity="0.55"
                />
                <path
                  d="M150 70 L250 90 L320 260 L150 360 L70 300 L40 210 Z"
                  fill="var(--color-accent)"
                  opacity="0.14"
                />
                <circle
                  cx="150"
                  cy="200"
                  r="70"
                  fill="none"
                  stroke="var(--color-accent-300)"
                  strokeWidth="1"
                  opacity="0.4"
                />
                <circle
                  cx="150"
                  cy="200"
                  r="120"
                  fill="none"
                  stroke="var(--color-accent-300)"
                  strokeWidth="1"
                  opacity="0.25"
                />
                <g fill="var(--color-accent-300)">
                  <circle cx="150" cy="200" r="6" />
                  <circle cx="240" cy="150" r="4" />
                  <circle cx="280" cy="240" r="4" />
                  <circle cx="110" cy="280" r="4" />
                  <circle cx="200" cy="300" r="4" />
                  <circle cx="300" cy="120" r="4" />
                  <circle cx="90" cy="150" r="4" />
                </g>
                <text
                  x="164"
                  y="196"
                  fill="var(--color-bg)"
                  fontFamily="var(--font-heading)"
                  fontSize="15"
                  letterSpacing="1"
                >
                  HQ · SAN FRANCISCO
                </text>
              </svg>
            </figure>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
