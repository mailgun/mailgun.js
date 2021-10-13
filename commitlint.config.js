module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', ['Breaking', 'Feat', 'Fix', 'Other']],
    'type-case': [2, 'always', 'pascal-case'],
    'subject-case': [2, 'always', 'sentence-case']
  },
};
