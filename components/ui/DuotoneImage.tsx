import Image from 'next/image';
import { cn } from '@/lib/utils';
import type { ImageAsset } from '@/types';
import styles from './DuotoneImage.module.css';

interface DuotoneImageProps {
  readonly image: ImageAsset;
  /** `fill` pins the image to the parent frame; `ratio` sizes it from a CSS aspect ratio. */
  readonly mode?: 'fill' | 'ratio';
  readonly priority?: boolean;
  readonly sizes: string;
  readonly className?: string;
  readonly style?: React.CSSProperties;
}

/**
 * Replaces the design components' `<image-slot>` placeholders. The `.duotone`
 * wrapper is the design-system class that lays the accent colour blend over the
 * photograph; `next/image` handles AVIF/WebP, responsive sources and lazy loading.
 */
export function DuotoneImage({
  image,
  mode = 'fill',
  priority = false,
  sizes,
  className,
  style,
}: DuotoneImageProps) {
  return (
    <div
      className={cn('duotone', mode === 'fill' ? styles.fill : styles.ratio, className)}
      style={style}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        priority={priority}
        className={styles.image}
      />
    </div>
  );
}
