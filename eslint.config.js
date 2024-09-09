import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default [
    { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    pluginReact.configs.flat.recommended,
    eslintPluginPrettierRecommended,
    {
        rules: {
            'prettier/prettier': [
                'warn',
                {
                    endOfLine: 'auto',
                },
            ],
            'react/react-in-jsx-scope': 'off',
            'no-var': 'error',
            'prefer-const': 'error',
            '@typescript-eslint/no-empty-object-type': [
                'error',
                { allowInterfaces: 'with-single-extends' },
            ],
            'react/prop-types': 'off',
        },
    },
];
