import { Container } from '@/components/ui/Container';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { beforeAfter } from '@/lib/data';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import { ProjectGallery } from './ProjectGallery';
import styles from './Projects.module.css';

export function Projects() {
  return (
    <Section id="projects" tone="dark" ariaLabelledBy="projects-heading">
      <Container>
        <ProjectGallery
          heading={
            <SectionHeading
              id="projects-heading"
              kicker="05 — Recent work"
              title="Installed. Commissioned. Documented."
              tone="dark"
            />
          }
        />

        <Reveal className={styles.compare}>
          <div className={styles.compareHead}>
            <Icon name="git-compare-arrows" size={18} className={styles.compareIcon} />
            <h3 className={styles.compareTitle}>{beforeAfter.title}</h3>
          </div>
          <BeforeAfterSlider />
          <p className={styles.baCaption}>{beforeAfter.caption}</p>
        </Reveal>
      </Container>
    </Section>
  );
}
