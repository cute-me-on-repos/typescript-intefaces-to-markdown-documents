module.exports = {
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
    'eslint:recommended',
    'standard'
  ],
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': 'off',
    '@typescript-eslint/indent': ['error', 2],
    'no-unused-expressions': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/ban-types': 'warn',
    '@typescript-eslint/triple-slash-reference': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-empty-interface': 'off'

  }
}
