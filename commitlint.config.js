module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', ['breaking', 'feature', 'fix', 'other']],
    'subject-case': [2, 'always', 'sentence-case']
  },
};
