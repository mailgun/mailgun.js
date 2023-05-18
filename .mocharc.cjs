
module.exports = {
  require: "ts-node/register",
  loader: 'ts-node/esm',
  spec: 'test/**/*.test.ts',
  'watch-files': ['lib/*.ts', 'test/*.ts'],
  extensions: ['ts'],
  recursive: true
};
