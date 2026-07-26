'use client';

import { useCallback, useRef, useState } from 'react';
import { Corners } from '@/components/ui/Corners';
import { DuotoneImage } from '@/components/ui/DuotoneImage';
import { Icon } from '@/components/ui/Icon';
import { beforeAfter } from '@/lib/data';
import { clamp, cn } from '@/lib/utils';
import styles from './Projects.module.css';

/** Matches the source's `set()` clamp so the handle never leaves the frame. */
const MIN = 2;
const MAX = 98;
const KEY_STEP = 4;

/**
 * Drag-to-compare retrofit plate. Pointer behaviour is ported from
 * `initBeforeAfter()`; keyboard support is added so the control satisfies
 * WCAG 2.2 — it exposes the standard slider role, value and arrow-key stepping.
 */
export function BeforeAfterSlider() {
  const [position, setPosition] = useState(50);
  const frameRef = useRef<HTMLElement>(null);
  const dragging = useRef(false);

  const moveTo = useCallback((clientX: number) => {
    const frame = frameRef.current;
    if (!frame) return;
    const rect = frame.getBoundingClientRect();
    setPosition(clamp(((clientX - rect.left) / rect.width) * 100, MIN, MAX));
  }, []);

  const onPointerDown = (event: React.PointerEvent<HTMLElement>) => {
    dragging.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    moveTo(event.clientX);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (dragging.current) moveTo(event.clientX);
  };

  const endDrag = (event: React.PointerEvent<HTMLElement>) => {
    dragging.current = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const delta =
      event.key === 'ArrowLeft' || event.key === 'ArrowDown'
        ? -KEY_STEP
        : event.key === 'ArrowRight' || event.key === 'ArrowUp'
          ? KEY_STEP
          : 0;

    if (delta !== 0) {
      event.preventDefault();
      setPosition((current) => clamp(current + delta, MIN, MAX));
      return;
    }

    if (event.key === 'Home') {
      event.preventDefault();
      setPosition(MIN);
    } else if (event.key === 'End') {
      event.preventDefault();
      setPosition(MAX);
    }
  };

  return (
    <figure
      ref={frameRef}
      className={cn('blueprint', styles.baFrame)}
      style={{
        ['--ac-ba-inset' as string]: `${100 - position}%`,
        ['--ac-ba-pos' as string]: `${position}%`,
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
    >
      <DuotoneImage image={beforeAfter.before} sizes="(max-width: 1280px) 100vw, 1200px" />
      <DuotoneImage
        image={beforeAfter.after}
        sizes="(max-width: 1280px) 100vw, 1200px"
        className={styles.baTop}
      />

      <span className={cn(styles.baLabel, styles.baLabelBefore)}>Before</span>
      <span className={cn(styles.baLabel, styles.baLabelAfter)}>After</span>

      <div
        className={styles.baHandle}
        role="slider"
        tabIndex={0}
        aria-label="Reveal the after photograph"
        aria-valuemin={MIN}
        aria-valuemax={MAX}
        aria-valuenow={Math.round(position)}
        aria-valuetext={`${Math.round(position)}% after`}
        aria-orientation="horizontal"
        onKeyDown={onKeyDown}
      >
        <span className={styles.baKnob}>
          <Icon name="chevrons-left-right" size={22} />
        </span>
      </div>

      <Corners color="var(--color-accent-300)" />
    </figure>
  );
}
