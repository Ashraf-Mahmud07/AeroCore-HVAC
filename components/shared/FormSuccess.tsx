import { Icon } from '@/components/ui/Icon';
import { cn } from '@/lib/utils';
import styles from './FormSuccess.module.css';

interface FormSuccessProps {
  /** `sm` is the homepage panel, `lg` the contact page. */
  readonly size: 'sm' | 'lg';
  readonly children: React.ReactNode;
}

/** Confirmation state shared by both booking forms. */
export function FormSuccess({ size, children }: FormSuccessProps) {
  return (
    <div className={cn(styles.success, styles[size])} role="status" aria-live="polite">
      <span className={styles.mark}>
        <Icon name="check" size={size === 'sm' ? 28 : 32} />
      </span>
      <h3 className={styles.title}>Request received</h3>
      <p className={styles.body}>{children}</p>
    </div>
  );
}
