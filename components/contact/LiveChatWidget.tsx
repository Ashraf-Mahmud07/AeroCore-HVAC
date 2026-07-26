'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Corners } from '@/components/ui/Corners';
import { Icon } from '@/components/ui/Icon';
import { cn } from '@/lib/utils';
import styles from './LiveChatWidget.module.css';

const GREETING = 'Hi! A dispatcher is here 7am–8pm. How can we help?';

/**
 * Floating dispatcher chat. The transcript is a static greeting, exactly as in
 * the design — connect the composer to the live-chat provider to make it real.
 */
export function LiveChatWidget() {
  const panelId = useId();
  const inputId = useId();
  const [open, setOpen] = useState(false);
  const launcherRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setOpen(false);
      launcherRef.current?.focus();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <>
      <button
        ref={launcherRef}
        type="button"
        className={styles.launcher}
        aria-label={open ? 'Close live chat' : 'Open live chat'}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((current) => !current)}
      >
        <Icon name="messages-square" size={26} />
      </button>

      {open && (
        <div
          id={panelId}
          className={cn('blueprint', styles.panel)}
          role="dialog"
          aria-label="Live support"
        >
          <Corners />
          <div className={styles.inner}>
            <div className={styles.head}>
              <span className={styles.pulse} aria-hidden="true" />
              <h2 className={styles.headTitle}>Live support</h2>
              <button
                type="button"
                className={styles.close}
                aria-label="Close chat"
                onClick={() => {
                  setOpen(false);
                  launcherRef.current?.focus();
                }}
              >
                <Icon name="x" size={18} />
              </button>
            </div>
            <div className={styles.body}>
              <p className={styles.message}>{GREETING}</p>
              <form
                className={styles.composer}
                onSubmit={(event) => event.preventDefault()}
                aria-label="Send a message to the dispatcher"
              >
                <label htmlFor={inputId} className="ac-visually-hidden">
                  Message
                </label>
                <input id={inputId} className="input" name="message" placeholder="Type a message" />
                <Button variant="primary" type="submit" className="btn-icon" ariaLabel="Send">
                  <Icon name="send" size={17} />
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
