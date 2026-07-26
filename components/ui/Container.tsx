import { cn } from '@/lib/utils';
import styles from './Container.module.css';

/** The measure widths the design components use, in pixels. */
export type ContainerWidth = 1280 | 1180 | 1080 | 900 | 820;

const widthClass: Record<ContainerWidth, string> = {
  1280: styles.max1280!,
  1180: styles.max1180!,
  1080: styles.max1080!,
  900: styles.max900!,
  820: styles.max820!,
};

interface ContainerProps {
  readonly children: React.ReactNode;
  readonly width?: ContainerWidth;
  readonly className?: string;
}

export function Container({ children, width = 1280, className }: ContainerProps) {
  return <div className={cn(styles.container, widthClass[width], className)}>{children}</div>;
}
