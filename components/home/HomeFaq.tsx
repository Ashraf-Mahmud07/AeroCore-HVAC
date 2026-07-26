import { FaqAccordion } from '@/components/shared/FaqAccordion';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { homeFaqs } from '@/lib/data';
import styles from './HomeFaq.module.css';

export function HomeFaq() {
  return (
    <Section id="faq" tone="surface" border="both" ariaLabelledBy="faq-heading">
      <Container width={900}>
        <Reveal className={styles.head}>
          <SectionHeading
            id="faq-heading"
            kicker="11 — Questions"
            title="Answers, up front."
            align="center"
            rule="short"
          />
        </Reveal>
        <Reveal>
          <FaqAccordion faqs={homeFaqs} />
        </Reveal>
      </Container>
    </Section>
  );
}
