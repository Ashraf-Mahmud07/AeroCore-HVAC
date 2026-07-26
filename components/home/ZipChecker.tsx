'use client';

import { useId, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import styles from './ServiceAreas.module.css';

type Result =
  { readonly kind: 'idle' } | { readonly kind: 'ok' | 'error'; readonly message: string };

const ZIP_PATTERN = /^\d{5}$/;

/**
 * Coverage lookup for the service-area band.
 *
 * Validation and the announcement are real; the lookup itself is a stub — wire
 * `checkCoverage` to the dispatch API to return true per-ZIP answers.
 */
export function ZipChecker() {
  const inputId = useId();
  const [zip, setZip] = useState('');
  const [result, setResult] = useState<Result>({ kind: 'idle' });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!ZIP_PATTERN.test(zip.trim())) {
      setResult({
        kind: 'error',
        message: 'Enter a five-digit ZIP code so we can check coverage.',
      });
      return;
    }

    setResult({
      kind: 'ok',
      message: `Thanks — we'll confirm same-day dispatch for ${zip.trim()} on the spot.`,
    });
  };

  return (
    <>
      <form className={styles.zipForm} onSubmit={onSubmit} noValidate>
        <label htmlFor={inputId} className="ac-visually-hidden">
          ZIP code
        </label>
        <input
          id={inputId}
          className={cn('input', styles.zipInput)}
          name="zip"
          type="text"
          inputMode="numeric"
          autoComplete="postal-code"
          maxLength={5}
          placeholder="Enter your ZIP code"
          value={zip}
          onChange={(event) => setZip(event.target.value)}
          aria-describedby={`${inputId}-message`}
          aria-invalid={result.kind === 'error'}
        />
        <Button variant="primary" type="submit">
          Check
        </Button>
      </form>
      <p
        id={`${inputId}-message`}
        role="status"
        aria-live="polite"
        className={cn(styles.zipMessage, result.kind === 'error' && styles.zipMessageError)}
      >
        {result.kind === 'idle' ? '' : result.message}
      </p>
    </>
  );
}
