/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
    root: true,
    extends: [
        'plugin:vue/vue3-essential',
        'eslint:recommended',
        'prettier',
        '@vue/eslint-config-prettier/skip-formatting',
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    env: {
        node: true,
        es2022: true,
    },
    plugins: ['prettier'],
    rules: {
        'prettier/prettier': 'error',
        indent: ['error', 4, { SwitchCase: 1 }],
        quotes: ['warn', 'single', { avoidEscape: true }],
        semi: ['error', 'always'],
    },
};
