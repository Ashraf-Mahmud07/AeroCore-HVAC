import { FaqAccordion } from '@/components/shared/FaqAccordion';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { planFaqs } from '@/lib/data';
import styles from './MaintenancePage.module.css';

export function PlanFaq() {
  return (
    <Section size="sm" tone="surface" border="top" ariaLabelledBy="plan-faq-heading">
      <Container width={820}>
        <Reveal className={styles.faqHead}>
          <SectionHeading
            id="plan-faq-heading"
            kicker="Plan questions"
            title="Good to know."
            size={50}
            align="center"
            rule={false}
          />
        </Reveal>
        <Reveal>
          <FaqAccordion faqs={planFaqs} triggerSize={18} />
        </Reveal>
      </Container>
    </Section>
  );
}
