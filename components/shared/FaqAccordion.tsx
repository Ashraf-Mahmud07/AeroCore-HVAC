'use client';

import { useId, useState } from 'react';
import { Corners } from '@/components/ui/Corners';
import { Icon } from '@/components/ui/Icon';
import { cn } from '@/lib/utils';
import type { Faq } from '@/types';
import styles from './FaqAccordion.module.css';

interface FaqAccordionProps {
  readonly faqs: readonly Faq[];
  /** Trigger type scale — 19px on the homepage, 18px on the plans page. */
  readonly triggerSize?: number;
}

/**
 * Single-open accordion, matching the source behaviour: the first item starts
 * open and clicking the open item closes it.
 */
export function FaqAccordion({ faqs, triggerSize = 19 }: FaqAccordionProps) {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className={styles.list}>
      {faqs.map((faq, index) => {
        const open = openIndex === index;
        const panelId = `${baseId}-panel-${index}`;
        const triggerId = `${baseId}-trigger-${index}`;

        return (
          <div key={faq.q} className={cn('blueprint', styles.item)}>
            <Corners />
            <h3 className={styles.itemHeading}>
              <button
                type="button"
                id={triggerId}
                className={styles.trigger}
                style={{ ['--ac-faq-size' as string]: `${triggerSize}px` }}
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? -1 : index)}
              >
                <span className={styles.question}>{faq.q}</span>
                <span className={cn(styles.marker, open && styles.markerOpen)}>
                  <Icon name="plus" size={18} />
                </span>
              </button>
            </h3>
            {open && (
              <div id={panelId} role="region" aria-labelledby={triggerId} className={styles.answer}>
                {faq.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
