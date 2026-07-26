/** Field names shared by the two booking forms and their server actions. */
export type FieldName =
  | 'name'
  | 'firstName'
  | 'lastName'
  | 'phone'
  | 'email'
  | 'address'
  | 'serviceType'
  | 'propertyType'
  | 'timing'
  | 'message'
  | 'smsOptIn';

export interface FormState {
  readonly status: 'idle' | 'success' | 'error';
  readonly errors: Partial<Record<FieldName, string>>;
}

export const initialFormState: FormState = { status: 'idle', errors: {} };
