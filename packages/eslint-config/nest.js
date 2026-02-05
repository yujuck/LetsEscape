module.exports = {
  extends: ['./base.js'],
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  env: {
    node: true,
    jest: true,
  },
  rules: {
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
  },
};
