module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: 'plugin:react/recommended',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  parser: 'babel-eslint',
  plugins: ['react'],
  rules: {
    indent: ['error', 2, { SwitchCase: 1 }],
    'linebreak-style': ['error', 'unix'],
    'react/prop-types': ignore,
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
  },
};
