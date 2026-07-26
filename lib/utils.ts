/** Joins class names, dropping falsy entries. */
export function cn(...values: ReadonlyArray<string | false | null | undefined>): string {
  return values.filter(Boolean).join(' ');
}

/**
 * Formats a counter tick exactly the way `initCounters()` did: locale grouping
 * with the same number of decimals as the target value, plus an optional suffix.
 */
export function formatCounterValue(value: number, decimals: number, suffix: string): string {
  return (
    value.toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }) + suffix
  );
}

/** Decimal places carried by a counter target, so 4.9 animates as 4.9 not 5. */
export function decimalPlaces(value: number): number {
  const [, fraction] = String(value).split('.');
  return fraction?.length ?? 0;
}

/** Cubic ease-out used by the original counter animation. */
export function easeOutCubic(progress: number): number {
  return 1 - Math.pow(1 - progress, 3);
}

/** Clamps a number into an inclusive range. */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}
