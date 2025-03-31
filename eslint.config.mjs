import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import prettier from 'eslint-plugin-prettier';

export default tseslint.config({
  extends: [
    pluginJs.configs.recommended,
    tseslint.configs.recommended,
    eslintConfigPrettier,
  ],
  files: ['**/*.{js,mjs,cjs,ts}'],
  languageOptions: { globals: globals.node },
  plugins: { prettier },
  rules: {
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
});
