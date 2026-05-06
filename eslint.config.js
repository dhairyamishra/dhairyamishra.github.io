import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import astro from 'eslint-plugin-astro';

export default [
  {
    ignores: ['dist/**', '.astro/**', 'node_modules/**', 'public/**', 'scripts/**'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  {
    files: ['**/*.{ts,tsx,astro}'],
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  {
    files: ['**/*.astro'],
    rules: {
      // Astro template files have their own scope; relax noisy rules
      'no-undef': 'off',
    },
  },
];
