import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Corners } from '@/components/ui/Corners';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { financeBenefits, financeExamples } from '@/lib/data';
import { routes } from '@/lib/site-config';
import { cn } from '@/lib/utils';
import styles from './Financing.module.css';

export function Financing() {
  return (
    <Section id="financing" ariaLabelledBy="financing-heading">
      <Container>
        <div className={styles.stack}>
          <Reveal>
            <SectionHeading
              id="financing-heading"
              kicker="07 — Financing"
              title="A new system, on a payment you choose."
              size={50}
            />
            <p className={styles.lede}>
              0% APR for 18 months on approved credit, or fixed low-rate terms up to 10 years.
              Soft-pull pre-qualification takes 60 seconds and won&rsquo;t touch your score.
            </p>

            <ul className={styles.benefits}>
              {financeBenefits.map((benefit) => (
                <li key={benefit.title} className={styles.benefit}>
                  <span className={styles.benefitIcon}>
                    <Icon name={benefit.icon} size={16} />
                  </span>
                  <div>
                    <strong className={styles.benefitTitle}>{benefit.title}</strong>
                    <div className={styles.benefitBody}>{benefit.body}</div>
                  </div>
                </li>
              ))}
            </ul>

            <ButtonLink href={routes.contact} variant="primary" size="cta">
              <Icon name="credit-card" size={17} />
              Pre-qualify in 60 seconds
            </ButtonLink>
          </Reveal>

          <Reveal delay={120}>
            <div className={cn('blueprint', styles.panel)}>
              <Corners />
              <div className={styles.panelTitle}>Example monthly payments</div>
              <div className={styles.panelNote}>
                Illustrative, 9.99% APR, 60 months. Your terms may vary.
              </div>
              {financeExamples.map((example) => (
                <div key={example.label} className={styles.example}>
                  <div>
                    <div className={styles.exampleLabel}>{example.label}</div>
                    <div className={styles.exampleTotal}>{example.total} installed</div>
                  </div>
                  <div className={styles.exampleRight}>
                    <span className={styles.exampleMonth}>{example.month}</span>
                    <div className={styles.examplePer}>/ month</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
