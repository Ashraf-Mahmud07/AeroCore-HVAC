import { cn } from '@/lib/utils';
import styles from './Field.module.css';

interface BaseFieldProps {
  readonly id: string;
  readonly name: string;
  readonly label: string;
  readonly required?: boolean;
  readonly placeholder?: string;
  readonly autoComplete?: string;
  readonly error?: string;
  readonly fullWidth?: boolean;
  readonly className?: string;
}

function FieldShell({
  id,
  label,
  error,
  fullWidth,
  className,
  children,
}: Pick<BaseFieldProps, 'id' | 'label' | 'error' | 'fullWidth' | 'className'> & {
  readonly children: React.ReactNode;
}) {
  return (
    <div className={cn('field', fullWidth && styles.fullWidth, className)}>
      <label htmlFor={id}>{label}</label>
      {children}
      {error && (
        <span id={`${id}-error`} className={styles.error}>
          {error}
        </span>
      )}
    </div>
  );
}

interface TextFieldProps extends BaseFieldProps {
  readonly type?: 'text' | 'email' | 'tel';
}

export function TextField({
  id,
  name,
  label,
  type = 'text',
  required,
  placeholder,
  autoComplete,
  error,
  fullWidth,
  className,
}: TextFieldProps) {
  return (
    <FieldShell id={id} label={label} error={error} fullWidth={fullWidth} className={className}>
      <input
        id={id}
        name={name}
        type={type}
        className="input"
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
      />
    </FieldShell>
  );
}

interface SelectFieldProps extends BaseFieldProps {
  readonly options: readonly string[];
}

export function SelectField({
  id,
  name,
  label,
  options,
  error,
  fullWidth,
  className,
}: SelectFieldProps) {
  return (
    <FieldShell id={id} label={label} error={error} fullWidth={fullWidth} className={className}>
      <select id={id} name={name} className={cn('input', styles.select)} defaultValue={options[0]}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </FieldShell>
  );
}

interface TextAreaFieldProps extends BaseFieldProps {
  readonly textareaClassName?: string;
}

export function TextAreaField({
  id,
  name,
  label,
  placeholder,
  error,
  fullWidth,
  className,
  textareaClassName,
}: TextAreaFieldProps) {
  return (
    <FieldShell id={id} label={label} error={error} fullWidth={fullWidth} className={className}>
      <textarea
        id={id}
        name={name}
        className={cn('input', textareaClassName)}
        placeholder={placeholder}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
      />
    </FieldShell>
  );
}
