/* global expect */
describe('Send message functionality', () => {
  let ClientWrapper;
  beforeEach(async () => {
    ClientWrapper = await global.MailgunClient;
  });
  test('Sends plain email', async () => {
    const result = await ClientWrapper.sendMessage('test.domain.com', {
      to: 'foo@example.com',
      from: 'bar@example.com',
      subject: 'howdy!',
      text: 'Hello world!'
    });
    expect(typeof result).toBe('object');
    expect(result).toEqual({
      status: 200,
      message: 'Queued. Thank you.',
      id: '<20111114174239.25659.5817@samples.mailgun.org>'
    });
  });
  test('Sends mime email', async () => {
    const result = await ClientWrapper.sendMessage('test.domain.com', {
      to: 'foo@example.com',
      from: 'bar@example.com',
      subject: 'howdy!',
      message: 'hello world!'
    });
    expect(typeof result).toBe('object');
    expect(result).toEqual({
      status: 200,
      message: 'Queued. Thank you.',
      id: '<20111114174239.25659.5817@samples.mailgun.org>'
    });
  });

  it('Sends an attachment', async () => {
    const result = await ClientWrapper.sendMessageWithAttachment('test.domain.com', {
      to: 'foo@example.com',
      from: 'bar@example.com',
      subject: 'howdy!',
      attachment: [] // for now empty. Updated later in wrapper.
    });
    expect(typeof result).toBe('object');
    expect(result).toEqual({
      status: 200,
      message: 'Queued. Thank you.',
      id: '<20111114174239.25659.5817@samples.mailgun.org>'
    });
  });
});
