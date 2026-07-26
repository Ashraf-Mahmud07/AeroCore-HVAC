/**
 * The four blueprint registration marks. `.blueprint > .corner` is a design-system
 * class, so these stay plain global class names rather than CSS-module ones.
 */
interface CornersProps {
  /** Overrides the default 55%-ink mark colour (dark panels use accent-300). */
  readonly color?: string;
}

export function Corners({ color }: CornersProps) {
  const style = color ? { color } : undefined;

  return (
    <>
      <i className="corner tl" style={style} aria-hidden="true" />
      <i className="corner tr" style={style} aria-hidden="true" />
      <i className="corner bl" style={style} aria-hidden="true" />
      <i className="corner br" style={style} aria-hidden="true" />
    </>
  );
}
