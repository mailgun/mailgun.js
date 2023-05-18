import { expect } from 'chai';
import Mailgun from '../dist/node/cjs/mailgun.cjs';

describe('Mailgun', () => {
  it('can be imported with default import statement', () => {
    console.log('Mailgun ->', Mailgun);
    expect(typeof Mailgun).to.equal('function');
  });

  it('can be imported with require statement', () => {
    // eslint-disable-next-line global-require
    const Mailgun = require('../dist/node/cjs/mailgun.cjs');
    // expect(MyModule.hello()).to.equal('Hello, world!');
  });

//   it('can be imported with named import statement', () => {
//     import { hello } from '../dist/node/cjs/mailgun.cjs';
//     expect(hello()).to.equal('Hello, world!');
//   });
});
