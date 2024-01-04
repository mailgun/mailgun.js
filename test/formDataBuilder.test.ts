import { expect } from 'chai';
import NodeFormData from 'form-data';
import { Blob } from 'buffer';
import FormDataBuilder from '../lib/Classes/common/FormDataBuilder';
import { InputFormData } from '../lib';

describe('FormDataBuilder', function () {
  let builder: FormDataBuilder;
  describe('createFormData (form-data package)', async () => {
    before(function () {
      builder = new FormDataBuilder(NodeFormData);
    });

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

    it('Respects filename', async () => {
      const result = builder.createFormData({ attachment: { filename: 'test', data: Buffer.from('test message') } }) as NodeFormData;
      const data = result.getBuffer().toString();
      expect(data).include('Content-Disposition: form-data; name="attachment"; filename="test"');
      expect(data).include('Content-Type: application/octet-stream');
    });

    it('Respects filename when string provided', async () => {
      const result = builder.createFormData({ attachment: { filename: 'test', data: 'test message' } }) as NodeFormData;
      const data = result.getBuffer().toString();
      expect(data).include('Content-Disposition: form-data; name="attachment"; filename="test"');
      expect(data).include('Content-Type: application/octet-stream');
    });
  });

  if (Blob || global.FormData) {
    describe('createFormData (Browser FormData + Blob)', async () => {
      before(function () {
        builder = new FormDataBuilder(global.FormData as InputFormData);
      });

      it('Adds blob correctly', async () => {
        const result = builder.createFormData({ attachment: { data: new Blob(['FormData test message']) } }) as FormData;
        const file = result.get('attachment') as File;
        expect(file).to.exist;
        expect(file.size).to.be.equal(21);
        expect(file.name).to.be.equal('file');
      });

      it('Respects filename', async () => {
        const result = builder.createFormData({ attachment: { filename: 'test', data: new Blob(['FormData test message']) } }) as FormData;
        const file = result.get('attachment') as File;
        expect(file).to.exist;
        expect(file.size).to.be.equal(21);
        expect(file.name).to.be.equal('test');
      });

      it('Respects filename when string provided', async () => {
        const result = builder.createFormData({ attachment: { filename: 'test', data: 'FormData test message' } }) as FormData;
        const file = result.get('attachment') as File;
        expect(file.name).to.be.equal('test');
        expect(file.size).to.be.equal(21);
      });
    });
  } else {
    // eslint-disable-next-line no-console
    console.warn('Blob or global.FormData does not exist. Skipping the FormData + Blob test');
  }
  if (global.FormData) {
    describe('createFormData (Browser FormData + Buffer)', async () => {
      before(function () {
        builder = new FormDataBuilder(global.FormData as InputFormData);
      });

      it('Adds blob correctly', async () => {
        const result = builder.createFormData({ attachment: { data: Buffer.from('FormData test message') } }) as FormData;
        const file = result.get('attachment') as File;
        expect(file).to.exist;
        expect(file.size).to.be.equal(21);
        expect(file.name).to.be.equal('file');
      });

      it('Respects filename', async () => {
        const result = builder.createFormData({ attachment: { filename: 'test', data: Buffer.from('FormData test message') } }) as FormData;
        const file = result.get('attachment') as File;
        expect(file).to.exist;
        expect(file.size).to.be.equal(21);
        expect(file.name).to.be.equal('test');
      });
    });
  } else {
    // eslint-disable-next-line no-console
    console.warn('global.FormData does not exist. Skipping the FormData + Blob test');
  }
});
