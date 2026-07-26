'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Corners } from '@/components/ui/Corners';
import { DuotoneImage } from '@/components/ui/DuotoneImage';
import { Icon } from '@/components/ui/Icon';
import { StarRating } from '@/components/ui/StarRating';
import { testimonials } from '@/lib/data';
import { cn } from '@/lib/utils';
import styles from './Testimonials.module.css';

const COUNT = testimonials.length;

export function TestimonialCarousel() {
  const [index, setIndex] = useState(0);
  const active = testimonials[index] ?? testimonials[0];

  if (!active) return null;

  const go = (next: number) => setIndex(((next % COUNT) + COUNT) % COUNT);

  return (
    <div className={cn('blueprint', styles.card)}>
      <Corners />
      <Icon name="quote" size={44} className={styles.quoteMark} />

      <div aria-live="polite" aria-atomic="true">
        <blockquote className={styles.quote}>{active.quote}</blockquote>

        <div className={styles.person}>
          <figure className={cn('blueprint', 'duotone', styles.avatar)}>
            <DuotoneImage image={active.image} sizes="60px" />
            <Corners />
          </figure>

          <div className={styles.identity}>
            <div className={styles.nameRow}>
              <strong className={styles.name}>{active.name}</strong>
              <span className={cn('tag', 'tag-accent', styles.verified)}>
                <Icon name="badge-check" size={12} />
                Verified
              </span>
            </div>
            <div className={styles.role}>
              {active.role} · {active.location}
            </div>
            <div className={styles.system}>System: {active.system}</div>
          </div>

          <StarRating size={17} label="Rated 5 out of 5" alignStart />
        </div>
      </div>

      <div className={styles.controls}>
        <div className={styles.dots}>
          {testimonials.map((testimonial, dotIndex) => (
            <button
              key={testimonial.name}
              type="button"
              className={cn(styles.dot, dotIndex === index && styles.dotActive)}
              aria-label={`Show testimonial from ${testimonial.name}`}
              aria-current={dotIndex === index ? 'true' : undefined}
              onClick={() => setIndex(dotIndex)}
            />
          ))}
        </div>
        <div className={styles.arrows}>
          <Button
            variant="secondary"
            className="btn-icon"
            ariaLabel="Previous testimonial"
            onClick={() => go(index - 1)}
          >
            <Icon name="chevron-left" size={20} />
          </Button>
          <Button
            variant="secondary"
            className="btn-icon"
            ariaLabel="Next testimonial"
            onClick={() => go(index + 1)}
          >
            <Icon name="chevron-right" size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
}
