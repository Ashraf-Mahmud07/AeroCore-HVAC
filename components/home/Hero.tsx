import { BlueprintGrid } from '@/components/ui/BlueprintGrid';
import { Container } from '@/components/ui/Container';
import { siteConfig } from '@/lib/site-config';
import type { HeroVariant } from '@/types';
import { HeroCentered } from './HeroCentered';
import { HeroSpec } from './HeroSpec';
import { HeroSplit } from './HeroSplit';
import styles from './Hero.module.css';

const variants: Record<HeroVariant, () => React.JSX.Element> = {
  split: HeroSplit,
  centered: HeroCentered,
  spec: HeroSpec,
};

/**
 * Renders the hero layout selected by `siteConfig.heroVariant`, mirroring the
 * design component's `heroVariant` prop (Split / Centered / Spec sheet).
 */
export function Hero() {
  const Variant = variants[siteConfig.heroVariant];

  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <BlueprintGrid variant="home" />
      <div className={styles.shapeSquare} aria-hidden="true" />
      <div className={styles.shapeCircle} aria-hidden="true" />
      <Container className={styles.inner}>
        <Variant />
      </Container>
    </section>
  );
}
