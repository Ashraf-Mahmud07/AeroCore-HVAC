import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

const eslintConfig = [
  {
    // The `.dc.html` design components and their runtime are the design source
    // of truth, not application code — they are read, never built.
    ignores: [
      '.next/**',
      'node_modules/**',
      'next-env.d.ts',
      'scripts/**',
      '_ds/**',
      'support.js',
      'image-slot.js',
    ],
  },
  ...compat.extends('next/core-web-vitals', 'next/typescript', 'prettier'),
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
    },
  },
];

export default eslintConfig;
