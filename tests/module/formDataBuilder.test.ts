import NodeFormData from 'form-data';
import fs, { promises } from 'fs';
import path from 'path';
import FormDataBuilder from '../../lib/Classes/common/FormDataBuilder.js';
import { InputFormData } from '../../lib/Types/index.js';

describe('FormDataBuilder', function () {
  let builder: FormDataBuilder;
  const filepath = path.resolve('./tests/module/img/mailgun.png');
  const readFDStream = (fd: NodeFormData) => {
    const fdDataAwaiter = new Promise((resolve) => {
      let result = '';
      fd.on('data', function (part) {
        result += part;
      });
      fd.on('end', function () {
        resolve(result);
      });
    });

    fd.resume();
    return fdDataAwaiter;
  };

  describe('createFormData (form-data package)', () => {
    beforeAll(function () {
      builder = new FormDataBuilder(NodeFormData);
    });

    it('checks that input object exists', async () => {
      try {
        // @ts-expect-error check case when SDK is being used without type checking
        builder.createFormData();
      } catch (error: unknown) {
        expect(error).toHaveProperty('message');
        expect((error as {message: string}).message).toEqual('Please provide data object');
      }
    });

    it('handles mime message correctly', async () => {
      const result = builder.createFormData({ message: Buffer.from('test message') }) as NodeFormData;
      const data = result.getBuffer().toString();
      expect(data).toEqual(expect.stringContaining('Content-Disposition: form-data; name="message"; filename="MimeMessage"'));
      expect(data).toEqual(expect.stringContaining('Content-Type: application/octet-stream'));
      expect(data).toEqual(expect.stringContaining('test message'));
    });

    it('adds default name for file if needed', async () => {
      const result = builder.createFormData({ attachment: { data: Buffer.from('test message') } }) as NodeFormData;
      const data = result.getBuffer().toString();
      expect(data).toEqual(expect.stringContaining('Content-Disposition: form-data; name="attachment"; filename="file"'));
      expect(data).toEqual(expect.stringContaining('Content-Type: application/octet-stream'));
    });

    it('respects filename when buffer provided', async () => {
      const result = builder.createFormData({ attachment: { filename: 'test', data: Buffer.from('test message') } }) as NodeFormData;
      const data = result.getBuffer().toString();
      expect(data).toEqual(expect.stringContaining('Content-Disposition: form-data; name="attachment"; filename="test"'));
      expect(data).toEqual(expect.stringContaining('Content-Type: application/octet-stream'));
    });

    it('respects filename when string provided', async () => {
      const result = builder.createFormData({ attachment: { filename: 'test', data: 'test message' } }) as NodeFormData;
      const data = result.getBuffer().toString();
      expect(data).toEqual(expect.stringContaining('Content-Disposition: form-data; name="attachment"; filename="test"'));
      expect(data).toEqual(expect.stringContaining('Content-Type: application/octet-stream'));
    });

    it('respects filename when ReadStream provided', async () => {
      const file = fs.createReadStream(filepath);
      const formDataWithValue = builder.createFormData({
        attachment: {
          data: file,
          filename: 'test'
        }
      }) as NodeFormData;

      const data = await readFDStream(formDataWithValue);
      expect(data).toEqual(expect.stringContaining('Content-Disposition: form-data; name="attachment"; filename="test"'));
      expect(data).toEqual(expect.stringContaining('Content-Type: image/png'));
    });

    it('works with readFile', async () => {
      const file = await promises.readFile(filepath);
      const result = builder.createFormData({ attachment: file }) as NodeFormData;
      const data = result.getBuffer().toString();

      expect(data).toEqual(expect.stringContaining('Content-Disposition: form-data; name="attachment"; filename="file"'));
      expect(data).toEqual(expect.stringContaining('Content-Type: application/octet-stream'));
    });

    it('works with ReadStream', async () => {
      const file = fs.createReadStream(filepath);
      const formDataWithValue = builder.createFormData({ attachment: [file] }) as NodeFormData;

      const data = await readFDStream(formDataWithValue);
      expect(data).toEqual(expect.stringContaining('Content-Disposition: form-data; name="attachment"; filename="file"'));
      expect(data).toEqual(expect.stringContaining('Content-Type: image/png'));
    });

    it('works with String value', async () => {
      const formDataWithValue = builder.createFormData({ attachment: 'check,this,stuff,out' }) as NodeFormData;
      const data = formDataWithValue.getBuffer().toString();
      expect(data).toEqual(expect.stringContaining('Content-Disposition: form-data; name="attachment"; filename="file"'));
      expect(data).toEqual(expect.stringContaining('Content-Type: application/octet-stream'));
    });

    it('Converts object to String value', async () => {
      // Prevents TypeError: source.on is not a function for form-data package
      const formDataWithValue = builder.createFormData({
        't:variables': {
          testProp: 'testValue'
        }
      }) as NodeFormData;
      const data = formDataWithValue.getBuffer().toString();
      expect(data).toEqual(expect.stringContaining('Content-Disposition: form-data; name="t:variables"'));
      expect(data).toEqual(expect.stringContaining('{"testProp":"testValue"}'));
    });
  });

  if (global.FormData) {
    describe('createFormData node environment with FormData', () => {
      beforeAll(function () {
        builder = new FormDataBuilder(global.FormData as InputFormData);
      });

      it('works with ReadStream value', async () => {
        const file = fs.createReadStream(filepath);
        const result = builder.createFormData({ attachment: [file] }) as FormData;
        const fdFile = result.get('attachment') as File;
        expect(fdFile).toHaveProperty('name');
        expect(fdFile.name).toEqual('file');
      });

      it('works with String value', async () => {
        const result = builder.createFormData({ attachment: 'check,this,stuff,out' }) as FormData;
        const fdFile = result.get('attachment') as File;
        expect(fdFile).toMatchObject({
          size: 20,
          name: 'file'
        });
      });

      it('works with Buffer value', async () => {
        const result = builder.createFormData({ attachment: Buffer.from('FormData test message') }) as FormData;
        const fdFile = result.get('attachment') as File;
        expect(fdFile).toMatchObject({
          size: 21,
          name: 'file'
        });
      });

      it('respects filename when buffer provided', async () => {
        const result = builder.createFormData({ attachment: { filename: 'test', data: Buffer.from('FormData test message') } }) as FormData;
        const file = result.get('attachment') as File;
        expect(file).toMatchObject({
          size: 21,
          name: 'test'
        });
      });

      it('respects filename when blob provided', async () => {
        const result = builder.createFormData({ attachment: { filename: 'test', data: new Blob(['FormData test message']) } }) as FormData;
        const file = result.get('attachment') as File;
        expect(file).toMatchObject({
          size: 21,
          name: 'test'
        });
      });

      it('respects filename when string provided', async () => {
        const result = builder.createFormData({ attachment: { filename: 'test', data: 'FormData test message' } }) as FormData;
        const file = result.get('attachment') as File;
        expect(file).toMatchObject({
          size: 21,
          name: 'test'
        });
      });

      it('respects filename when ReadStream provided', async () => {
        const file = fs.createReadStream(filepath);
        const result = builder.createFormData({
          attachment: {
            data: file,
            filename: 'test'
          }
        }) as FormData;

        const fdFile = result.get('attachment') as File;
        expect(fdFile).toMatchObject({
          name: 'test'
        });
      });

      it('respects filename with readFile', async () => {
        const file = await promises.readFile(filepath);
        const result = builder.createFormData({
          attachment: {
            data: file,
            filename: 'test'
          }
        }) as FormData;
        const fdFile = result.get('attachment') as File;
        expect(fdFile).toMatchObject({
          name: 'test',
          size: 41793
        });
      });
    });

    if (globalThis.Blob) {
      describe('createFormData (Browser compliant FormData + Blob)', () => {
        beforeAll(function () {
          builder = new FormDataBuilder(global.FormData as InputFormData);
        });

        it('Respects filename for blob', async () => {
          const result = builder.createFormData({ attachment: { filename: 'test', data: new Blob(['FormData test message']) } }) as FormData;
          const file = result.get('attachment') as File;
          expect(file).toMatchObject({
            name: 'test',
            size: 21
          });
        });

        it('works with Blob value', async () => {
          const file = new Blob(['FormData test message']);
          const result = builder.createFormData({ attachment: file }) as FormData;
          const fdFile = result.get('attachment') as File;
          expect(fdFile).toMatchObject({
            name: 'file',
            size: 21
          });
        });
      });
    } else {
      // eslint-disable-next-line no-console
      console.warn('Blob does not exist. Skipping the FormData + Blob test');
    }
    if (globalThis.File) {
      beforeAll(function () {
        builder = new FormDataBuilder(globalThis.FormData as InputFormData);
      });
      describe('createFormData (Browser compliant FormData + File)', () => {
        it('Respects filename for File', async () => {
          const file = new globalThis.File(['FormData test message'], 'file name');
          const result = builder.createFormData({ attachment: { filename: 'test', data: file } }) as FormData;
          const fdFile = result.get('attachment') as File;
          expect(fdFile).toMatchObject({
            name: 'test',
            size: 21
          });
        });

        it('works with File value', async () => {
          const file = new globalThis.File(['FormData test message'], 'test');
          const result = builder.createFormData({ attachment: file }) as FormData;
          const fdFile = result.get('attachment') as File;
          expect(fdFile).toMatchObject({
            name: 'test',
            size: 21
          });
        });
      });
    } else {
      // eslint-disable-next-line no-console
      console.warn('globalThis.File does not exist. Skipping the FormData + File tests');
    }
  } else {
    // eslint-disable-next-line no-console
    console.warn('global.FormData does not exist. Skipping the FormData + Buffer test');
  }
});
