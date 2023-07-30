module.exports = {
  root: true,
  env: {
    node: true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:jsdoc/recommended',
    'prettier',
    'plugin:prettier/recommended'
  ],
  plugins: ['@typescript-eslint', 'import', 'jsdoc', 'prettier'],
  settings: {
    'import/extensions': ['.js', '.ts']
  },
  // add your custom rules here
  rules: {
    'no-console': 'error',
    'sort-imports': ['error', { ignoreDeclarationSort: true }],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'jsdoc/require-returns-description': 'off',
    'import/first': 'error',
    'import/order': [
      'error',
      {
        'newlines-between': 'never',
        alphabetize: { order: 'asc', caseInsensitive: false }
      }
    ],
    'import/newline-after-import': ['error', { count: 1 }],
    'no-useless-escape': 'off',
    eqeqeq: ['error', 'always']
  }
};
