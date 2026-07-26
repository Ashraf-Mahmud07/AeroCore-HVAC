import { Container } from '@/components/ui/Container';
import { Corners } from '@/components/ui/Corners';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { siteConfig, telHref } from '@/lib/site-config';
import { cn } from '@/lib/utils';
import styles from './ContactCta.module.css';
import { QuickRequestForm } from './QuickRequestForm';

export function ContactCta() {
  return (
    <Section id="contact" ariaLabelledBy="contact-heading">
      <Container>
        <div className={styles.stack}>
          <Reveal>
            <SectionHeading
              id="contact-heading"
              kicker="11 — Get in touch"
              title="Book a visit in under a minute."
            />
            <p className={styles.lede}>
              Tell us what&rsquo;s going on. We&rsquo;ll confirm a two-hour arrival window by text —
              no all-day waiting.
            </p>

            <div className={styles.cards}>
              <div className={cn('blueprint', styles.emergency)}>
                <Corners color="var(--color-accent-300)" />
                <span className={styles.emergencyIcon}>
                  <Icon name="siren" size={22} />
                </span>
                <div>
                  <div className={styles.emergencyLabel}>24/7 Emergency line</div>
                  <a href={telHref} className={styles.emergencyPhone}>
                    {siteConfig.phone}
                  </a>
                </div>
              </div>

              <div className={styles.pair}>
                <div className={cn('blueprint', styles.infoCard)}>
                  <Corners />
                  <Icon name="map-pin" size={18} className={styles.infoIcon} />
                  <address className={styles.infoText}>
                    {siteConfig.address.street}
                    <br />
                    {siteConfig.address.locality}, {siteConfig.address.region}
                  </address>
                </div>
                <div className={cn('blueprint', styles.infoCard)}>
                  <Corners />
                  <Icon name="clock" size={18} className={styles.infoIcon} />
                  <div className={styles.infoText}>
                    Mon–Sat 7–8
                    <br />
                    Sun emergencies
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <QuickRequestForm />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
