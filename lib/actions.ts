'use server';

/**
 * Server actions backing the two booking forms.
 *
 * Using actions rather than a client-only handler means both forms submit and
 * validate with JavaScript disabled. There is no CRM behind them yet — wire
 * `deliverServiceRequest` to the dispatch system and everything else stands.
 */

import type { FieldName, FormState } from '@/types/forms';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
/** Accepts the common US formats the design's placeholder demonstrates. */
const PHONE_PATTERN = /^[+()\d][\d\s().-]{6,}$/;

function read(formData: FormData, field: FieldName): string {
  const value = formData.get(field);
  return typeof value === 'string' ? value.trim() : '';
}

function validateContactDetails(
  formData: FormData,
  errors: Partial<Record<FieldName, string>>,
): void {
  const phone = read(formData, 'phone');
  if (!phone) {
    errors.phone = 'Enter a phone number so we can confirm your window.';
  } else if (!PHONE_PATTERN.test(phone)) {
    errors.phone = 'Enter a valid phone number.';
  }

  const email = read(formData, 'email');
  if (!email) {
    errors.email = 'Enter an email address.';
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = 'Enter a valid email address.';
  }
}

/** Placeholder delivery step — replace with the real dispatch integration. */
async function deliverServiceRequest(payload: Record<string, string>): Promise<void> {
  await Promise.resolve(payload);
}

/** Homepage form: name, phone, email, service type, free-text description. */
export async function submitQuickRequest(
  _previous: FormState,
  formData: FormData,
): Promise<FormState> {
  const errors: Partial<Record<FieldName, string>> = {};

  if (!read(formData, 'name')) errors.name = 'Enter your full name.';
  validateContactDetails(formData, errors);

  if (Object.keys(errors).length > 0) return { status: 'error', errors };

  await deliverServiceRequest({
    name: read(formData, 'name'),
    phone: read(formData, 'phone'),
    email: read(formData, 'email'),
    serviceType: read(formData, 'serviceType'),
    message: read(formData, 'message'),
  });

  return { status: 'success', errors: {} };
}

/** Contact page form: the full intake, including address, timing and SMS opt-in. */
export async function submitServiceRequest(
  _previous: FormState,
  formData: FormData,
): Promise<FormState> {
  const errors: Partial<Record<FieldName, string>> = {};

  if (!read(formData, 'firstName')) errors.firstName = 'Enter your first name.';
  if (!read(formData, 'lastName')) errors.lastName = 'Enter your last name.';
  validateContactDetails(formData, errors);

  if (Object.keys(errors).length > 0) return { status: 'error', errors };

  await deliverServiceRequest({
    firstName: read(formData, 'firstName'),
    lastName: read(formData, 'lastName'),
    phone: read(formData, 'phone'),
    email: read(formData, 'email'),
    address: read(formData, 'address'),
    serviceType: read(formData, 'serviceType'),
    propertyType: read(formData, 'propertyType'),
    timing: read(formData, 'timing'),
    message: read(formData, 'message'),
    smsOptIn: read(formData, 'smsOptIn') ? 'yes' : 'no',
  });

  return { status: 'success', errors: {} };
}
