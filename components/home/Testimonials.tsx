import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TestimonialCarousel } from './TestimonialCarousel';
import styles from './Testimonials.module.css';

export function Testimonials() {
  return (
    <Section ariaLabelledBy="testimonials-heading">
      <Container width={1080}>
        <Reveal className={styles.head}>
          <SectionHeading
            id="testimonials-heading"
            kicker="06 — In their words"
            title="Homeowners & facility managers."
            align="center"
            rule="short"
          />
        </Reveal>
        <Reveal>
          <TestimonialCarousel />
        </Reveal>
      </Container>
    </Section>
  );
}
