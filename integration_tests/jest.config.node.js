module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/tests/*.test.js'],
  setupFilesAfterEnv: ['./configs/setupMailgunClient.js'],
};
