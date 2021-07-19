module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // 'scope-empty': [0],
    // 'footer-empty': [0, 'never'],
    'type-enum': [2, 'always', ['Breaking', 'Feature', 'Fix', 'Other']],
    'type-case': [2, 'always', 'pascal-case'],
    'subject-case': [2, 'always', 'sentence-case']
  },
};
