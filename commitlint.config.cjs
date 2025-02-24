module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', ['breaking', 'feature', 'fix', 'other']],
    'subject-case': [2, 'always', 'sentence-case'],
    'footer-max-line-length': [1, 'always', 200],
    'body-max-line-length': [1, 'always', 1000]
  },
};
