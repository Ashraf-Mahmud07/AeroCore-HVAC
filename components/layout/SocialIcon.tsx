export type SocialNetwork = 'facebook' | 'instagram' | 'linkedin';

interface SocialIconProps {
  readonly network: SocialNetwork;
  readonly size: number;
  /** Paint colour — the design fills these with `var(--color-bg)` on dark panels. */
  readonly color: string;
}

/** The three brand glyphs, copied path-for-path from the design components. */
export function SocialIcon({ network, size, color }: SocialIconProps) {
  const shared = { viewBox: '0 0 24 24', width: size, height: size, 'aria-hidden': true } as const;

  if (network === 'facebook') {
    return (
      <svg {...shared} fill={color}>
        <path d="M13.4 21v-7.9h2.6l.4-3h-3V8.2c0-.9.3-1.5 1.5-1.5H16.5V4c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1v2.1H7.5v3h2.6V21z" />
      </svg>
    );
  }

  if (network === 'instagram') {
    return (
      <svg {...shared} fill="none" stroke={color} strokeWidth={1.7}>
        <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
        <circle cx="12" cy="12" r="3.8" />
        <circle cx="17.1" cy="6.9" r="1" fill={color} stroke="none" />
      </svg>
    );
  }

  return (
    <svg {...shared} fill={color}>
      <path d="M6.6 9v9H3.7V9zM5.1 4.2a1.7 1.7 0 110 3.4 1.7 1.7 0 010-3.4zM9 9h2.8v1.3h.1c.4-.7 1.4-1.5 2.9-1.5 3 0 3.6 2 3.6 4.5V18h-2.9v-4.1c0-1 0-2.3-1.4-2.3s-1.6 1.1-1.6 2.2V18H9z" />
    </svg>
  );
}

export const socialNetworks: ReadonlyArray<{ network: SocialNetwork; label: string }> = [
  { network: 'facebook', label: 'Facebook' },
  { network: 'instagram', label: 'Instagram' },
  { network: 'linkedin', label: 'LinkedIn' },
];
