import { Container } from '@/components/ui/Container';
import { brands } from '@/lib/data';
import { cn } from '@/lib/utils';
import styles from './BrandMarquee.module.css';

interface BrandMarqueeProps {
  readonly caption: string;
  /** The homepage rules the band top and bottom; the services page only below. */
  readonly borders?: 'both' | 'bottom';
}

/**
 * Infinite manufacturer marquee. The list is rendered twice so the -50%
 * keyframe wraps seamlessly; the duplicate is hidden from assistive tech.
 */
export function BrandMarquee({ caption, borders = 'both' }: BrandMarqueeProps) {
  return (
    <section
      className={cn(styles.band, borders === 'both' && styles.bandTop, styles.bandBottom)}
      aria-label="Manufacturers we are factory-authorized on"
    >
      <Container>
        <p className={styles.caption}>{caption}</p>
      </Container>
      <div className={styles.viewport}>
        <div className={styles.track}>
          {brands.map((brand) => (
            <span key={brand.name} className={styles.cell}>
              {brand.name}
            </span>
          ))}
          {brands.map((brand) => (
            <span key={`duplicate-${brand.name}`} className={styles.cell} aria-hidden="true">
              {brand.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
