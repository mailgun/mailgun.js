import formData from 'form-data';
import fs from 'fs';
import path from 'path';

import nock from 'nock';
import { expect } from 'chai';
import { InputFormData, RequestOptions } from '../lib/Types/Common';
import MultipleValidationClient from '../lib/Classes/Validations/multipleValidation';
import {
  MultipleValidationJobsListResult
} from '../lib/Types/Validations';
import TestRequest from './TestUtils/Request';

const filepath = path.resolve(__dirname, './data/emailsValidation1.csv');

describe('ValidateClient', () => {
  const fsPromises = fs.promises;
  let client: MultipleValidationClient;
  let api: nock.Scope;
  let responseData = {};

  beforeEach(() => {
    const reqObject = new TestRequest({ url: 'https://api.mailgun.net' } as RequestOptions, formData as InputFormData);
    client = new MultipleValidationClient(reqObject);
    api = nock('https://api.mailgun.net');
    responseData = {
      created_at: 1636716764,
      download_url: {
        csv: 'csv-url',
        json: 'json-url'
      },
      id: 'testValidationList',
      quantity: 40,
      records_processed: 40,
      status: 'uploaded',
      summary: {
        result: {
          catch_all: 0,
          deliverable: 2,
          do_not_send: 0,
          undeliverable: 16,
          unknown: 22
        },
        risk: {
          high: 16,
          low: 2,
          medium: 0,
          unknown: 22
        }
      }
    };
  });

  afterEach(() => {
    api.done();
  });

  describe('List', () => {
    it('should provide list of all bulk validation jobs', async () => {
      const data = {
        jobs: [
          responseData
        ],
        paging: {
          first: 'https://api.mailgun.net/v4/address/validate/bulk?limit=100&page=first&pivot=',
          last: 'https://api.mailgun.net/v4/address/validate/bulk?limit=100&page=last&pivot=',
          next: 'https://api.mailgun.net/v4/address/validate/bulk?limit=100&page=next&pivot=',
          prev: 'https://api.mailgun.net/v4/address/validate/bulk?limit=100&page=prev&pivot='
        },
        total: 1
      };

      api.get('/v4/address/validate/bulk')
        .reply(200, data);
      const expectedResult = {
        status: 200,
        jobs: [
          {
            createdAt: new Date(1636716764),
            downloadUrl: {
              csv: 'csv-url',
              json: 'json-url'
            },
            id: 'testValidationList',
            quantity: 40,
            recordsProcessed: 40,
            status: 'uploaded',
            responseStatusCode: 200,
            summary: {
              result: {
                catchAll: 0,
                deliverable: 2,
                doNotSend: 0,
                undeliverable: 16,
                unknown: 22
              },
              risk: {
                high: 16,
                low: 2,
                medium: 0,
                unknown: 22
              }
            }
          }
        ],
        pages: {
          first: {
            id: 'first',
            iteratorPosition: '',
            page: '?limit=100&page=first&pivot=',
            url: 'https://api.mailgun.net/v4/address/validate/bulk?limit=100&page=first&pivot='
          },
          last: {
            id: 'last',
            iteratorPosition: '',
            page: '?limit=100&page=last&pivot=',
            url: 'https://api.mailgun.net/v4/address/validate/bulk?limit=100&page=last&pivot='
          },
          next: {
            id: 'next',
            iteratorPosition: '',
            page: '?limit=100&page=next&pivot=',
            url: 'https://api.mailgun.net/v4/address/validate/bulk?limit=100&page=next&pivot='
          },
          prev: {
            id: 'prev',
            iteratorPosition: '',
            page: '?limit=100&page=prev&pivot=',
            url: 'https://api.mailgun.net/v4/address/validate/bulk?limit=100&page=prev&pivot='
          }
        },
        total: 1
      };

      const result: MultipleValidationJobsListResult = await client.list();
      result.should.eql(expectedResult);
    });
    it('returns result if no downloads and summary objects', async () => {
      const data = {
        jobs: [
          {
            ...responseData,
            ...{
              download_url: undefined
            },
            ...{
              summary: undefined
            }
          }
        ],
        paging: {
          first: 'https://api.mailgun.net/v4/address/validate/bulk?limit=100&page=first&pivot=',
          last: 'https://api.mailgun.net/v4/address/validate/bulk?limit=100&page=last&pivot=',
          next: 'https://api.mailgun.net/v4/address/validate/bulk?limit=100&page=next&pivot=',
          prev: 'https://api.mailgun.net/v4/address/validate/bulk?limit=100&page=prev&pivot='
        },
        total: 1
      };

      api.get('/v4/address/validate/bulk')
        .reply(200, data);
      const expectedResult = {
        status: 200,
        jobs: [
          {
            createdAt: new Date(1636716764),
            id: 'testValidationList',
            quantity: 40,
            recordsProcessed: 40,
            status: 'uploaded',
            responseStatusCode: 200
          }
        ],
        pages: {
          first: {
            id: 'first',
            iteratorPosition: '',
            page: '?limit=100&page=first&pivot=',
            url: 'https://api.mailgun.net/v4/address/validate/bulk?limit=100&page=first&pivot='
          },
          last: {
            id: 'last',
            iteratorPosition: '',
            page: '?limit=100&page=last&pivot=',
            url: 'https://api.mailgun.net/v4/address/validate/bulk?limit=100&page=last&pivot='
          },
          next: {
            id: 'next',
            iteratorPosition: '',
            page: '?limit=100&page=next&pivot=',
            url: 'https://api.mailgun.net/v4/address/validate/bulk?limit=100&page=next&pivot='
          },
          prev: {
            id: 'prev',
            iteratorPosition: '',
            page: '?limit=100&page=prev&pivot=',
            url: 'https://api.mailgun.net/v4/address/validate/bulk?limit=100&page=prev&pivot='
          }
        },
        total: 1
      };

      const result: MultipleValidationJobsListResult = await client.list();
      result.should.eql(expectedResult);
    });

    it('returns result if no url in downloads objects', async () => {
      const data = {
        jobs: [
          {
            ...responseData,
            ...{
              download_url: {}
            }
          }
        ],
        paging: {
          first: 'https://api.mailgun.net/v4/address/validate/bulk?limit=100&page=first&pivot=',
          last: 'https://api.mailgun.net/v4/address/validate/bulk?limit=100&page=last&pivot=',
          next: 'https://api.mailgun.net/v4/address/validate/bulk?limit=100&page=next&pivot=',
          prev: 'https://api.mailgun.net/v4/address/validate/bulk?limit=100&page=prev&pivot='
        },
        total: 1
      };

      api.get('/v4/address/validate/bulk')
        .reply(200, data);
      const expectedResult = {
        status: 200,
        jobs: [
          {
            createdAt: new Date(1636716764),
            downloadUrl: {
              csv: undefined,
              json: undefined
            },
            id: 'testValidationList',
            quantity: 40,
            recordsProcessed: 40,
            status: 'uploaded',
            responseStatusCode: 200,
            summary: {
              result: {
                catchAll: 0,
                deliverable: 2,
                doNotSend: 0,
                undeliverable: 16,
                unknown: 22
              },
              risk: {
                high: 16,
                low: 2,
                medium: 0,
                unknown: 22
              }
            }
          }
        ],
        pages: {
          first: {
            id: 'first',
            iteratorPosition: '',
            page: '?limit=100&page=first&pivot=',
            url: 'https://api.mailgun.net/v4/address/validate/bulk?limit=100&page=first&pivot='
          },
          last: {
            id: 'last',
            iteratorPosition: '',
            page: '?limit=100&page=last&pivot=',
            url: 'https://api.mailgun.net/v4/address/validate/bulk?limit=100&page=last&pivot='
          },
          next: {
            id: 'next',
            iteratorPosition: '',
            page: '?limit=100&page=next&pivot=',
            url: 'https://api.mailgun.net/v4/address/validate/bulk?limit=100&page=next&pivot='
          },
          prev: {
            id: 'prev',
            iteratorPosition: '',
            page: '?limit=100&page=prev&pivot=',
            url: 'https://api.mailgun.net/v4/address/validate/bulk?limit=100&page=prev&pivot='
          }
        },
        total: 1
      };
      const result: MultipleValidationJobsListResult = await client.list();
      result.should.eql(expectedResult);
    });
  });

  describe('get', () => {
    it('should returns status of a bulk validation job.', async () => {
      const listId = 'testValidationList';
      const data = {
        ...responseData
      };

      api.get(`/v4/address/validate/bulk/${listId}`)
        .reply(200, data);

      const expectedResult = {
        createdAt: new Date(1636716764),
        downloadUrl: {
          csv: 'csv-url',
          json: 'json-url'
        },
        id: 'testValidationList',
        quantity: 40,
        recordsProcessed: 40,
        status: 'uploaded',
        responseStatusCode: 200,
        summary: {
          result: {
            catchAll: 0,
            deliverable: 2,
            doNotSend: 0,
            undeliverable: 16,
            unknown: 22
          },
          risk: {
            high: 16,
            low: 2,
            medium: 0,
            unknown: 22
          }
        }
      };
      const res = await client.get(listId);
      expect(res).eql(expectedResult);
    });
  });

  describe('create', () => {
    const data = {
      id: 'testValidationList',
      message: 'The validation job was submitted.'
    };
    let requestBody: nock.Body | undefined;

    beforeEach(() => {
      api.post('/v4/address/validate/bulk/testValidationList',
        (body) => {
          requestBody = body;
          return true;
        })
        .reply(200, data);
    });

    describe('form-data package', () => {
      beforeEach(() => {
        const reqObject = new TestRequest({
          url: 'https://api.mailgun.net',
          useFetch: false // disable fetch since it does not work with form-data package
        } as RequestOptions, formData as InputFormData);
        client = new MultipleValidationClient(reqObject);
      });

      it('Creates a bulk validation job with custom file (readFile)', async () => {
        const file = {
          filename: 'test.csv',
          data: await fsPromises.readFile(filepath)
        };

        const res = await client.create('testValidationList', { file });
        res.should.eql({ status: 200, ...data });
        expect(requestBody).include('Content-Disposition: form-data; name="file"; filename="test.csv"');
        expect(requestBody).include('Content-Type: text/csv');
      });

      it('Creates a bulk validation job with custom file (readStream)', async () => {
        const file = {
          filename: 'test.csv',
          data: fs.createReadStream(filepath)
        };

        const res = await client.create('testValidationList', { file });
        res.should.eql({ status: 200, ...data });
        expect(requestBody).include('Content-Disposition: form-data; name="file"; filename="test.csv"');
        expect(requestBody).include('Content-Type: text/csv');
      });

      it('Creates a bulk validation job with custom file (csv string)', async () => {
        const file = {
          filename: 'test.csv',
          data: 'email\n1testEmailAdressForCheck@test.com\n2testEmailAdressForCheck@test.com\n',
          contentType: 'text/csv',
        };
        const res = await client.create('testValidationList', { file });
        res.should.eql({ status: 200, ...data });
        expect(requestBody).include('Content-Disposition: form-data; name="file"; filename="test.csv"');
        expect(requestBody).include('Content-Type: text/csv');
      });

      it('Creates a bulk validation job with custom file (buffer)', async () => {
        const file = {
          filename: 'test.csv',
          data: Buffer.from('email\n1testEmailAdressForCheck@test.com\n2testEmailAdressForCheck@test.com\n'),
          contentType: 'text/csv',
        };

        const res = await client.create('testValidationList', { file });
        res.should.eql({ status: 200, ...data });
        expect(requestBody).include('Content-Disposition: form-data; name="file"; filename="test.csv"');
        expect(requestBody).include('Content-Type: text/csv');
      });

      it('Creates a bulk validation job with with data from readFile', async () => {
        const file = await fsPromises.readFile(filepath);
        const res = await client.create('testValidationList', { file });
        res.should.eql({ status: 200, ...data });
        expect(requestBody).include('Content-Disposition: form-data; name="file"; filename="file"');
        expect(requestBody).include('Content-Type: application/octet-stream');
      });

      it('Creates a bulk validation job with with data from readStream', async () => {
        const file = fs.createReadStream(filepath);
        const res = await client.create('testValidationList', { file });
        res.should.eql({ status: 200, ...data });
        expect(requestBody).include('Content-Disposition: form-data; name="file"; filename="file"');
        expect(requestBody).include('Content-Type: text/csv');
      });

      it('Creates a bulk validation job with with data from csv string', async () => {
        const file = 'email\n1testEmailAdressForCheck@test.com\n2testEmailAdressForCheck@test.com\n';
        const res = await client.create('testValidationList', { file });
        res.should.eql({ status: 200, ...data });
        expect(requestBody).include('Content-Disposition: form-data; name="file"; filename="file"');
        expect(requestBody).include('Content-Type: application/octet-stream');
      });

      it('Creates a bulk validation job with with data from buffer', async () => {
        const file = Buffer.from('email\n1testEmailAdressForCheck@test.com\n2testEmailAdressForCheck@test.com\n');
        const res = await client.create('testValidationList', { file });
        res.should.eql({ status: 200, ...data });
        expect(requestBody).include('Content-Disposition: form-data; name="file"; filename="file"');
        expect(requestBody).include('Content-Type: application/octet-stream');
      });
    });

    if (globalThis.FormData) {
      describe('Browser compliant FormData', () => {
        beforeEach(() => {
          const reqObject = new TestRequest({ url: 'https://api.mailgun.net' } as RequestOptions, globalThis.FormData as InputFormData);
          client = new MultipleValidationClient(reqObject);
        });

        it('Creates a bulk validation job with custom file (readFile)', async () => {
          const file = {
            filename: 'test.csv',
            data: await fsPromises.readFile(filepath)
          };
          const res = await client.create('testValidationList', { file });
          res.should.eql({ status: 200, ...data });
          expect(requestBody).include('Content-Disposition: form-data; name="file"; filename="test.csv"');
          expect(requestBody).include('Content-Type: application/octet-stream');
        });

        it('Creates a bulk validation job with custom file (readStream)', async () => {
          const file = {
            filename: 'test.csv',
            data: fs.createReadStream(filepath)
          };
          const res = await client.create('testValidationList', { file });
          res.should.eql({ status: 200, ...data });
          expect(requestBody).include('Content-Disposition: form-data; name="file"; filename="test.csv"');
          expect(requestBody).include('Content-Type: application/octet-stream');
        });

        it('Creates a bulk validation job with custom file (csv string)', async () => {
          const file = {
            filename: 'test.csv',
            data: 'email\n1testEmailAdressForCheck@test.com\n2testEmailAdressForCheck@test.com\n',
            contentType: 'text/csv',
          };
          const res = await client.create('testValidationList', { file });
          res.should.eql({ status: 200, ...data });
          expect(requestBody).include('Content-Disposition: form-data; name="file"; filename="test.csv"');
          expect(requestBody).include('Content-Type: application/octet-stream');
        });

        it('Creates a bulk validation job with custom file (buffer)', async () => {
          const file = {
            filename: 'test.csv',
            data: Buffer.from('email\n1testEmailAdressForCheck@test.com\n2testEmailAdressForCheck@test.com\n'),
            contentType: 'text/csv',
          };
          const res = await client.create('testValidationList', { file });
          res.should.eql({ status: 200, ...data });
          expect(requestBody).include('Content-Disposition: form-data; name="file"; filename="test.csv"');
          expect(requestBody).include('Content-Type: application/octet-stream');
        });

        it('Creates a bulk validation job with with data from readFile', async () => {
          const file = await fsPromises.readFile(filepath);
          const res = await client.create('testValidationList', { file });
          res.should.eql({ status: 200, ...data });
          expect(requestBody).include('Content-Disposition: form-data; name="file"; filename="file"');
          expect(requestBody).include('Content-Type: application/octet-stream');
        });

        it('Creates a bulk validation job with with data from readStream', async () => {
          const file = fs.createReadStream(filepath);
          const res = await client.create('testValidationList', { file });
          res.should.eql({ status: 200, ...data });
          expect(requestBody).include('Content-Disposition: form-data; name="file"; filename="file"');
          expect(requestBody).include('Content-Type: application/octet-stream');
        });

        it('Creates a bulk validation job with with data from csv string', async () => {
          const file = 'email\n1testEmailAdressForCheck@test.com\n2testEmailAdressForCheck@test.com\n';
          const res = await client.create('testValidationList', { file });
          res.should.eql({ status: 200, ...data });
          expect(requestBody).include('Content-Disposition: form-data; name="file"; filename="file"');
          expect(requestBody).include('Content-Type: application/octet-stream');
        });

        it('Creates a bulk validation job with with data from buffer', async () => {
          const file = Buffer.from('email\n1testEmailAdressForCheck@test.com\n2testEmailAdressForCheck@test.com\n');
          const res = await client.create('testValidationList', { file });
          res.should.eql({ status: 200, ...data });
          expect(requestBody).include('Content-Disposition: form-data; name="file"; filename="file"');
          expect(requestBody).include('Content-Type: application/octet-stream');
        });

        if (globalThis.Blob) {
          describe('Creates a bulk validation job with with (Browser compliant FormData + Blob)', async () => {
            it('Creates a bulk validation job with custom file (Blob)', async () => {
              const file = {
                filename: 'test.csv',
                data: new Blob(['email\n1testEmailAdressForCheck@test.com\n2testEmailAdressForCheck@test.com\n'])
              };
              const res = await client.create('testValidationList', { file });
              res.should.eql({ status: 200, ...data });
              expect(requestBody).include('Content-Disposition: form-data; name="file"; filename="test.csv"');
              expect(requestBody).include('Content-Type: application/octet-stream');
            });

            it('Creates a bulk validation job with data from Blob', async () => {
              const file = new Blob(['email\n1testEmailAdressForCheck@test.com\n2testEmailAdressForCheck@test.com\n']);
              const res = await client.create('testValidationList', { file });
              res.should.eql({ status: 200, ...data });
              expect(requestBody).include('Content-Disposition: form-data; name="file"; filename="file"');
              expect(requestBody).include('Content-Type: application/octet-stream');
            });
          });
        } else {
          // eslint-disable-next-line no-console
          console.warn('Blob does not exist. Skipping bulk validation + Blob tests');
        }
        if (globalThis.File) {
          describe('Creates a bulk validation job with with (Browser compliant FormData + File)', async () => {
            it('Creates a bulk validation job with custom file (Blob)', async () => {
              const file = {
                filename: 'test_file.csv',
                data: new globalThis.File(
                  ['email\n1testEmailAdressForCheck@test.com\n2testEmailAdressForCheck@test.com\n'],
                  'test.csv'
                )
              };
              const res = await client.create('testValidationList', { file });
              res.should.eql({ status: 200, ...data });
              expect(requestBody).include('Content-Disposition: form-data; name="file"; filename="test_file.csv"');
              expect(requestBody).include('Content-Type: application/octet-stream');
            });

            it('Creates a bulk validation job with data from File', async () => {
              const file = new globalThis.File(
                ['email\n1testEmailAdressForCheck@test.com\n2testEmailAdressForCheck@test.com\n'],
                'test.csv'
              );
              const res = await client.create('testValidationList', { file });
              res.should.eql({ status: 200, ...data });
              expect(requestBody).include('Content-Disposition: form-data; name="file"; filename="test.csv"');
              expect(requestBody).include('Content-Type: application/octet-stream');
            });
          });
        } else {
          // eslint-disable-next-line no-console
          console.warn('globalThis.File does not exist. bulk validation + File tests');
        }
      });
    } else {
      // eslint-disable-next-line no-console
      console.warn('global.FormData does not exist. Skipping the FormData + Buffer test');
    }
  });

  describe('destroy', () => {
    it('should cancel current running bulk validation job.', async () => {
      const listId = 'testValidationList';
      const data = {
        message: 'Validation job canceled.',
        status: 200
      };
      api.delete(`/v4/address/validate/bulk/${listId}`)
        .reply(200, { message: 'Validation job canceled.' });

      const res = await client.destroy(listId);
      expect(res).to.eql(data);
    });
  });
});
