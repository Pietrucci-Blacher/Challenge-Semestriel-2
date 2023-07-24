module.exports = {
    root: true,
    extends: ['eslint:recommended', 'prettier'],
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
