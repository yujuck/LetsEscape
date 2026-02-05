module.exports = {
  extends: ['@lets-escape/eslint-config/next'],
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  root: true,
};
