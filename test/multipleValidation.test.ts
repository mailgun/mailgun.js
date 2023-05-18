import formData from 'form-data';
import fs from 'fs';
import path from 'path';
import nock from 'nock';
import { fileURLToPath } from 'url';

import Request from '../lib/request';
import { RequestOptions } from '../lib/interfaces/RequestOptions';
import { InputFormData } from '../lib/interfaces/IFormData';
import MultipleValidationClient, { MultipleValidationJob } from '../lib/multipleValidation';
import {
  CanceledMultipleValidationJob,
  CreatedMultipleValidationJob,
  MultipleValidationJobsListResult
} from '../lib/interfaces/MultipleValidation';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filepath = path.resolve(__dirname, './data/emailsValidation1.csv');

describe('ValidateClient', function () {
  const fsPromises = fs.promises;
  let client: MultipleValidationClient;
  let api: nock.Scope;
  let responseData = {};

  beforeEach(function () {
    const reqObject = new Request({ url: 'https://api.mailgun.net' } as RequestOptions, formData as InputFormData);
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

  afterEach(function () {
    api.done();
  });

  describe('List', function () {
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
    it('returns result if no downloads and summary objects', async function () {
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

    it('returns result if no url in downloads objects', async function () {
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

  describe('get', function () {
    it('should returns status of a bulk validation job.', function () {
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
      return client.get(listId).then(function (response: MultipleValidationJob) {
        response.should.eql(expectedResult);
      });
    });
  });

  describe('create', function () {
    it('Creates a bulk validation job.', async function () {
      const listId = 'testValidationList';
      const data = {
        id: 'testValidationList',
        message: 'The validation job was submitted.'
      };
      const file = {
        filename: 'test.jpg',
        data: await fsPromises.readFile(filepath)
      };
      api.post(`/v4/address/validate/bulk/${listId}`)
        .reply(200, data);

      return client.create(listId, { file })
        .then(function (response: CreatedMultipleValidationJob) {
          response.should.eql({ status: 200, ...data });
        });
    });
  });

  describe('destroy', function () {
    it('should cancel current running bulk validation job.', async function () {
      const listId = 'testValidationList';
      const data = {
        message: 'Validation job canceled.',
        status: 200
      };
      api.delete(`/v4/address/validate/bulk/${listId}`)
        .reply(200, { message: 'Validation job canceled.' });

      return client.destroy(listId)
        .then(function (response: CanceledMultipleValidationJob) {
          response.should.eql(data);
        });
    });
  });
});
