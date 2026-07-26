'use client';

import { useActionState, useId } from 'react';
import { SelectField, TextAreaField, TextField } from '@/components/shared/Field';
import { FormSuccess } from '@/components/shared/FormSuccess';
import { Button } from '@/components/ui/Button';
import { Corners } from '@/components/ui/Corners';
import { Icon } from '@/components/ui/Icon';
import { submitServiceRequest } from '@/lib/actions';
import { propertyTypeOptions, serviceTypeOptions, timingOptions } from '@/lib/data';
import { siteConfig } from '@/lib/site-config';
import { cn } from '@/lib/utils';
import { initialFormState } from '@/types/forms';
import styles from './ContactPage.module.css';

/** Full intake form on the contact page, backed by a server action. */
export function ServiceRequestForm() {
  const id = useId();
  const [state, formAction, pending] = useActionState(submitServiceRequest, initialFormState);

  return (
    <form action={formAction} className={cn('blueprint', styles.form)}>
      <Corners />

      {state.status === 'success' ? (
        <FormSuccess size="lg">
          We&rsquo;ll text your two-hour arrival window within 15 minutes during business hours. For
          anything urgent, call {siteConfig.phone}.
        </FormSuccess>
      ) : (
        <>
          <h2 className={styles.formTitle}>Request service</h2>
          <p className={styles.formNote}>Fields marked * are required. Takes about a minute.</p>

          <div className={styles.fields}>
            <TextField
              id={`${id}-first`}
              name="firstName"
              label="First name *"
              required
              autoComplete="given-name"
              placeholder="Jordan"
              error={state.errors.firstName}
            />
            <TextField
              id={`${id}-last`}
              name="lastName"
              label="Last name *"
              required
              autoComplete="family-name"
              placeholder="Rivera"
              error={state.errors.lastName}
            />
            <TextField
              id={`${id}-phone`}
              name="phone"
              label="Phone *"
              type="tel"
              required
              autoComplete="tel"
              placeholder="(415) 555-0199"
              error={state.errors.phone}
            />
            <TextField
              id={`${id}-email`}
              name="email"
              label="Email *"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              error={state.errors.email}
            />
            <TextField
              id={`${id}-address`}
              name="address"
              label="Service address"
              autoComplete="street-address"
              placeholder="Street, city, ZIP"
              fullWidth
            />
            <SelectField
              id={`${id}-service`}
              name="serviceType"
              label="Service type"
              options={serviceTypeOptions}
            />
            <SelectField
              id={`${id}-property`}
              name="propertyType"
              label="Property type"
              options={propertyTypeOptions}
            />
          </div>

          <fieldset className={cn('field', styles.timingField)}>
            <legend>Preferred timing</legend>
            <div className={styles.timingOptions}>
              {timingOptions.map((option, index) => (
                <label key={option.value} className={cn('radio', styles.timingOption)}>
                  <input
                    type="radio"
                    name="timing"
                    value={option.value}
                    defaultChecked={index === 0}
                  />
                  <span className="dot" />
                  {option.label}
                </label>
              ))}
            </div>
          </fieldset>

          <TextAreaField
            id={`${id}-message`}
            name="message"
            label="What's going on?"
            placeholder="Describe the issue, make/model if known, and anything we should bring."
            className={styles.messageField}
            textareaClassName={styles.messageInput}
          />

          <label className={cn('radio', styles.optIn)}>
            <input type="checkbox" name="smsOptIn" value="yes" />
            <span className={cn('dot', styles.optInDot)} />
            Text me appointment updates. Message rates may apply.
          </label>

          <Button
            variant="primary"
            type="submit"
            block
            className={styles.submit}
            disabled={pending}
          >
            <Icon name="calendar-check" size={18} />
            {pending ? 'Sending…' : 'Request my service window'}
          </Button>
          <p className={styles.disclaimer}>No obligation. We never sell your information.</p>
        </>
      )}
    </form>
  );
}
