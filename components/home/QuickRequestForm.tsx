'use client';

import { useActionState, useId } from 'react';
import { SelectField, TextAreaField, TextField } from '@/components/shared/Field';
import { FormSuccess } from '@/components/shared/FormSuccess';
import { Button } from '@/components/ui/Button';
import { Corners } from '@/components/ui/Corners';
import { Icon } from '@/components/ui/Icon';
import { submitQuickRequest } from '@/lib/actions';
import { serviceTypeOptions } from '@/lib/data';
import { cn } from '@/lib/utils';
import { initialFormState } from '@/types/forms';
import styles from './ContactCta.module.css';

/** Short booking form in the homepage contact band. */
export function QuickRequestForm() {
  const id = useId();
  const [state, formAction, pending] = useActionState(submitQuickRequest, initialFormState);

  return (
    <form action={formAction} className={cn('blueprint', styles.form)}>
      <Corners />

      {state.status === 'success' ? (
        <FormSuccess size="sm">
          We&rsquo;ll text your arrival window within 15 minutes during business hours.
        </FormSuccess>
      ) : (
        <>
          <div className={styles.grid}>
            <TextField
              id={`${id}-name`}
              name="name"
              label="Full name"
              required
              autoComplete="name"
              placeholder="Jordan Rivera"
              error={state.errors.name}
            />
            <TextField
              id={`${id}-phone`}
              name="phone"
              label="Phone"
              type="tel"
              required
              autoComplete="tel"
              placeholder="(415) 555-0199"
              error={state.errors.phone}
            />
            <TextField
              id={`${id}-email`}
              name="email"
              label="Email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              error={state.errors.email}
              fullWidth
            />
            <SelectField
              id={`${id}-service`}
              name="serviceType"
              label="Service needed"
              options={serviceTypeOptions}
              fullWidth
            />
            <TextAreaField
              id={`${id}-message`}
              name="message"
              label="What's going on?"
              placeholder="Describe the issue, make/model if known, and your preferred time."
              fullWidth
            />
          </div>

          <Button
            variant="primary"
            type="submit"
            block
            className={styles.submit}
            disabled={pending}
          >
            <Icon name="calendar-check" size={17} />
            {pending ? 'Sending…' : 'Request my service window'}
          </Button>
          <p className={styles.disclaimer}>No obligation. We never sell your information.</p>
        </>
      )}
    </form>
  );
}
