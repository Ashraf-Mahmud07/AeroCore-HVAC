import { cn } from '@/lib/utils';
import { Icon } from './Icon';
import styles from './StarRating.module.css';

const STARS = [0, 1, 2, 3, 4] as const;

interface StarRatingProps {
  readonly size: number;
  readonly label: string;
  readonly alignStart?: boolean;
}

/** Five filled stars. The rating is announced once via `label`, not per star. */
export function StarRating({ size, label, alignStart }: StarRatingProps) {
  return (
    <div
      className={cn(styles.stars, alignStart && styles.alignStart)}
      role="img"
      aria-label={label}
    >
      {STARS.map((index) => (
        <Icon key={index} name="star" size={size} fill="currentColor" />
      ))}
    </div>
  );
}
