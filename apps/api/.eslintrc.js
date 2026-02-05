module.exports = {
  extends: ['@lets-escape/eslint-config/nest'],
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  root: true,
};
