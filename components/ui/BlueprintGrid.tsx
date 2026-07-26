import { cn } from '@/lib/utils';
import styles from './BlueprintGrid.module.css';

/** Each page hero masks the grid from a different focal point. */
export type BlueprintGridVariant = 'home' | 'services' | 'plans' | 'contact';

const variantClass: Record<BlueprintGridVariant, string | undefined> = {
  home: styles.home,
  services: styles.services,
  plans: styles.plans,
  contact: styles.contact,
};

export function BlueprintGrid({ variant }: { readonly variant: BlueprintGridVariant }) {
  return <div aria-hidden="true" className={cn(styles.grid, variantClass[variant])} />;
}
