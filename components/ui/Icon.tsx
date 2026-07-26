import { getIcon } from '@/lib/icons';
import type { IconName } from '@/types';

interface IconProps {
  readonly name: IconName;
  /** Square edge length in pixels, matching the source's inline width/height. */
  readonly size: number;
  readonly className?: string;
  readonly color?: string;
  readonly fill?: string;
  readonly strokeWidth?: number;
}

/**
 * Renders a Lucide glyph by the same `data-lucide` name the design components
 * used. Always `aria-hidden` — every icon in the design is decorative and sits
 * beside a text label or an `aria-label`.
 */
export function Icon({ name, size, className, color, fill, strokeWidth }: IconProps) {
  const Glyph = getIcon(name);

  return (
    <Glyph
      aria-hidden="true"
      focusable="false"
      width={size}
      height={size}
      className={className}
      {...(color ? { color } : {})}
      {...(fill ? { fill } : {})}
      {...(strokeWidth ? { strokeWidth } : {})}
    />
  );
}
