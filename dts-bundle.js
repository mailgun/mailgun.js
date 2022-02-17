const dts = require('dts-bundle');

dts.bundle({
  name: 'mailgun.js',
  main: 'dist/lib/index.d.ts',
  out: '../mailgun.js.d.ts',
  removeSource: true
});
