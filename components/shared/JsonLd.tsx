import type { JsonLdSchema } from '@/lib/seo';

interface JsonLdProps {
  readonly id: string;
  readonly schema: JsonLdSchema;
}

/**
 * Emits a structured-data block. The payload is authored in `lib/seo.ts` from
 * typed site data — never from user input — so serialising it is safe.
 */
export function JsonLd({ id, schema }: JsonLdProps) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
