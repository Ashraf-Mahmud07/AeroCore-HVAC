'use client';

import { useId, useState } from 'react';
import { Button } from '@/components/ui/Button';
import buttonStyles from '@/components/ui/Button.module.css';
import styles from './Blog.module.css';

/**
 * Seasonal-reminder sign-up. The original reset the form on submit; this adds a
 * live-announced confirmation so the outcome is perceivable without sight.
 */
export function Newsletter() {
  const inputId = useId();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubscribed(true);
    setEmail('');
  };

  return (
    <>
      <form className={styles.newsletterForm} onSubmit={onSubmit}>
        <label htmlFor={inputId} className="ac-visually-hidden">
          Email address
        </label>
        <input
          id={inputId}
          className="input"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <Button variant="primary" type="submit" className={buttonStyles.noWrap}>
          Subscribe
        </Button>
      </form>
      <p role="status" aria-live="polite" className={styles.newsletterStatus}>
        {subscribed ? "You're on the list — one email at the turn of each season." : ''}
      </p>
    </>
  );
}
