import globals from 'globals';
import eslintJs from '@eslint/js';
import eslintTs from 'typescript-eslint';
import eslintReact from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import prettier from 'eslint-config-prettier';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import importPlugin from 'eslint-plugin-import';
import pluginJest from 'eslint-plugin-jest';

export default eslintTs.config(
  { ignores: ['build'] },
  jsxA11y.flatConfigs.recommended,
  prettier,
  {
    extends: [
      eslintJs.configs.recommended,
      ...eslintTs.configs.recommended,
      importPlugin.flatConfigs.recommended,
      importPlugin.flatConfigs.react,
      importPlugin.flatConfigs.typescript
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser
    },
    plugins: {
      react: eslintReact,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      semi: 2,
      eqeqeq: 2,
      'react/prop-types': 'off',
      'no-plusplus': 2,
      'no-console': 2,
      'react/jsx-first-prop-new-line': [2, 'multiline'],
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          vars: 'all',
          args: 'after-used',
          caughtErrors: 'none',
          ignoreRestSiblings: true,
          argsIgnorePattern: '^_'
        }
      ],
      'object-shorthand': [2, 'always'],
      'no-fallthrough': [2, { commentPattern: 'break[\\s\\w]*omitted' }],
      'react/react-in-jsx-scope': 'off',
      'no-multiple-empty-lines': [2, { max: 2, maxEOF: 0 }],
      'arrow-body-style': [2, 'as-needed'],
      'import/no-unresolved': [2, { caseSensitive: true }],
      'import/order': [2, { 'newlines-between': 'always' }],
      'react/jsx-curly-brace-presence': 2
    }
  },
  {
    files: ['**/*.spec.ts', '**/*.test.ts'],
    plugins: { jest: pluginJest },
    languageOptions: {
      globals: pluginJest.environments.globals.globals
    },
    rules: {
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
      'jest/prefer-to-have-length': 'warn',
      'jest/valid-expect': 'error'
    }
  }
);
