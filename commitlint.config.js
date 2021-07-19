module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', ['Breaking', 'Feature', 'Fix', 'Other']],
    'type-case': [2, 'always', 'pascal-case'],
    'subject-case': [2, 'always', 'sentence-case']
  },
};
