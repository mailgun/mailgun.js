import { expect } from 'chai';
import NodeFormData from 'form-data';
import FormDataBuilder from '../lib/formDataBuilder';

describe('FormDataBuilder', function () {
  let builder: FormDataBuilder;
  before(function () {
    builder = new FormDataBuilder(NodeFormData);
  });

  describe('createFormData', async () => {
    it('checks that input object exists', async () => {
      try {
        // @ts-expect-error check case when SDK is being used without type checking
        builder.createFormData();
      } catch (error: unknown) {
        expect(error).to.has.property('message').equal('Please provide data object');
      }
    });

    it('handles mime message correctly', async () => {
      const result = builder.createFormData({ message: Buffer.from('test message') }) as NodeFormData;
      const data = result.getBuffer().toString();
      expect(data).include('Content-Disposition: form-data; name="message"; filename="MimeMessage"');
      expect(data).include('Content-Type: application/octet-stream');
      expect(data).include('test message');
    });

    it('adds default name for file if needed', async () => {
      const result = builder.createFormData({ attachment: { data: Buffer.from('test message') } }) as NodeFormData;
      const data = result.getBuffer().toString();
      expect(data).include('Content-Disposition: form-data; name="attachment"; filename="file"');
      expect(data).include('Content-Type: application/octet-stream');
    });
  });
});
