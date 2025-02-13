import formData from 'form-data';

import nock from 'nock';
import Request from '../../lib/Classes/common/Request.js';

import DomainTemplatesClient from '../../lib/Classes/Domains/domainsTemplates.js';
import {
  InputFormData,
  RequestOptions,
  DomainTemplateUpdateVersionData,
  DomainTemplateVersionData
} from '../../lib/Types/index.js';

// TODO: fix types
describe('DomainsTemplatesClient', function () {
  let client: DomainTemplatesClient;
  let api: nock.Scope;

  beforeEach(function () {
    const reqObject = new Request({ url: 'https://api.mailgun.net' } as RequestOptions, formData as InputFormData);
    client = new DomainTemplatesClient(reqObject);
    api = nock('https://api.mailgun.net');
  });

  afterEach(function () {
    api.done();
  });

  describe('list', function () {
    it('fetches all templates for domain', async () => {
      api.get('/v3/testDomain/templates').reply(200, {
        items: [
          {
            name: 'test_template',
            description: 'test_template description',
            createdAt: 'Mon, 20 Dec 2021 14:47:51 UTC',
            createdBy: '',
            id: 'someId'
          }
        ],
        paging: {
          first: 'https://api.mailgun.net/v3/testDomain/templates?limit=10',
          last: 'https://api.mailgun.net/v3/testDomain/templates?page=last&limit=10',
          next: 'https://api.mailgun.net/v3/testDomain/templates?page=next&p=temporary-test-template&limit=10',
          previous: 'https://api.mailgun.net/v3/testDomain/templates?page=previous&p=temporary-test-template&limit=10',
        }
      });

      const templatesList = await client.list('testDomain');
      expect(templatesList).toMatchObject(expect.objectContaining({
        status: 200,
        items: expect.any(Array),
        pages: {
          first: expect.objectContaining({
            page: '?limit=10',
            iteratorPosition: undefined
          }),
          last: expect.objectContaining({
            page: '?page=last&limit=10',
            iteratorPosition: undefined
          }),
          next: expect.objectContaining({
            page: '?page=next&p=temporary-test-template&limit=10',
            iteratorPosition: 'temporary-test-template'
          }),
          previous: expect.objectContaining({
            page: '?page=previous&p=temporary-test-template&limit=10',
            iteratorPosition: 'temporary-test-template'
          }),
        }
      }));
      expect(templatesList.items).toHaveLength(1);
      expect(templatesList.items[0]).toMatchObject({
        name: 'test_template',
        description: 'test_template description',
        createdAt: new Date('Mon, 20 Dec 2021 14:47:51 UTC'),
        createdBy: '',
        id: 'someId'
      });
    });

    it('fetches pages of templates with the "page" and "limit" options', async () => {
      api.get('/v3/testDomain/templates?page=next&p=temporary-test-template&limit=1').reply(200, {
        items: [
          {
            name: 'test_template',
            description: 'test_template description',
            createdAt: 'Mon, 20 Dec 2021 14:47:51 UTC',
            createdBy: '',
            id: 'someId',
          },
        ],
        paging: {
          first: 'https://api.mailgun.net/v3/testDomain/templates?limit=1',
          last: 'https://api.mailgun.net/v3/testDomain/templates?page=last&limit=1',
          next: 'https://api.mailgun.net/v3/testDomain/templates?page=next&p=temporary-test-template&limit=1',
          previous: 'https://api.mailgun.net/v3/testDomain/templates?page=previous&p=temporary-test-template&limit=1',
        },
      });

      const templatesList = await client.list('testDomain', {
        page: '?page=next&p=temporary-test-template',
        limit: 1,
      });
      expect(templatesList).toMatchObject(expect.objectContaining({
        status: 200,
        items: expect.any(Array),
        pages: {
          first: expect.objectContaining({
            page: '?limit=1',
            iteratorPosition: undefined
          }),
          last: expect.objectContaining({
            page: '?page=last&limit=1',
            iteratorPosition: undefined
          }),
          next: expect.objectContaining({
            page: '?page=next&p=temporary-test-template&limit=1',
            iteratorPosition: 'temporary-test-template'
          }),
          previous: expect.objectContaining({
            page: '?page=previous&p=temporary-test-template&limit=1',
            iteratorPosition: 'temporary-test-template'
          }),
        }
      }));
      expect(templatesList.items).toHaveLength(1);
      expect(templatesList.items[0]).toMatchObject({
        name: 'test_template',
        description: 'test_template description',
        createdAt: new Date('Mon, 20 Dec 2021 14:47:51 UTC'),
        createdBy: '',
        id: 'someId'
      });
    });
  });

  describe('get', function () {
    it('fetches one template for domain', async () => {
      api.get('/v3/testDomain/templates/testTemplateName').reply(200, {
        template: {
          name: 'test_template',
          description: 'test_template description',
          createdAt: 'Mon, 20 Dec 2021 14:47:51 UTC',
          createdBy: '',
          id: 'someId'
        }
      });

      const template = await client.get('testDomain', 'testTemplateName');
      expect(template).toMatchObject({
        name: 'test_template',
        description: 'test_template description',
        createdAt: new Date('Mon, 20 Dec 2021 14:47:51 UTC'),
        createdBy: '',
        id: 'someId'
      });
    });

    it('returns if no created date in version for template', async () => {
      api.get('/v3/testDomain/templates/testTemplateName').reply(200, {
        template: {
          name: 'test_template',
          description: 'test_template description',
          createdAt: null,
          createdBy: '',
          id: 'someId',
          version: {
            tag: 'initial',
            engine: 'handlebars',
            mjml: '',
            comment: '',
            active: true,
            id: '908c523e-7bad-472f-bb10-153059adc148'
          }
        }
      });

      const template = await client.get('testDomain', 'testTemplateName');
      expect(template).toMatchObject({
        name: 'test_template',
        description: 'test_template description',
        createdAt: '',
        createdBy: '',
        id: 'someId',
        version: {
          tag: 'initial',
          engine: 'handlebars',
          mjml: '',
          comment: '',
          active: true,
          id: '908c523e-7bad-472f-bb10-153059adc148'
        }
      });
    });
  });

  describe('create', function () {
    it('creates domain template', async () => {
      const templateData = {
        name: 'test_template1',
        description: 'test_template1 description',
        template: '%recipient.title%',
        tag: 'v1',
        comment: 'dummy comment'
      };

      api.post('/v3/testDomain/templates').reply(200, {
        message: 'template has been stored',
        template: {
          name: 'test_template1',
          description: 'test_template description 1',
          createdAt: 'Wed, 22 Dec 2021 08:59:29 UTC',
          createdBy: '',
          id: 'someId',
          version: {
            tag: 'v1',
            template: '%recipient.title%',
            engine: 'handlebars',
            mjml: '',
            createdAt: 'Wed, 22 Dec 2021 08:59:29 UTC',
            comment: 'dummy comment',
            active: true,
            id: 'someId2'
          }
        }
      });

      const template = await client.create('testDomain', templateData);
      expect(template).toMatchObject({
        name: 'test_template1',
        description: 'test_template description 1',
        createdAt: new Date('Wed, 22 Dec 2021 08:59:29 UTC'),
        createdBy: '',
        id: 'someId',
        version: {
          tag: 'v1',
          template: '%recipient.title%',
          engine: 'handlebars',
          mjml: '',
          createdAt: new Date('Wed, 22 Dec 2021 08:59:29 UTC'),
          comment: 'dummy comment',
          active: true,
          id: 'someId2'
        }
      });
    });
  });

  describe('update', function () {
    it('updates domain template', async () => {
      api.put('/v3/testDomain/templates/testTemplateName').reply(200, {
        message: 'template has been updated',
        template: { name: 'test_template1' }
      });

      const updatedTemplate = await client.update('testDomain', 'testTemplateName', {
        description: 'updated test_template description'
      });
      expect(updatedTemplate).toMatchObject({
        status: 200,
        message: 'template has been updated',
        templateName: 'test_template1'
      });
    });

    it('returns result if no template in API response', async () => {
      api.put('/v3/testDomain/templates/testTemplateName').reply(200, {
        message: 'template has been updated',
      });

      const updatedTemplate = await client.update('testDomain', 'testTemplateName', {
        description: 'updated test_template description'
      });
      expect(updatedTemplate).toMatchObject({
        status: 200,
        message: 'template has been updated',
      });
    });
  });

  describe('destroy', function () {
    it('deletes domain template', async () => {
      api.delete('/v3/testDomain/templates/testTemplateName').reply(200, {
        message: 'template has been deleted',
        template: { name: 'test_template1' }
      });

      const deletedTemplate = await client.destroy('testDomain', 'testTemplateName');
      expect(deletedTemplate).toMatchObject({
        status: 200,
        message: 'template has been deleted',
        templateName: 'test_template1'
      });
    });
  });

  describe('destroyAll', function () {
    it('deletes all domain templates', async () => {
      api.delete('/v3/testDomain/templates').reply(200, { message: 'templates have been deleted' });

      const deletedTemplate = await client.destroyAll('testDomain');
      expect(deletedTemplate).toMatchObject({ status: 200, message: 'templates have been deleted' });
    });
  });

  describe('createVersion', function () {
    it('creates new version of domain template', async () => {
      const templateVersionData = {
        template: '%recipient.title%',
        tag: 'v3',
        comment: 'comment',
        active: 'yes'
      } as DomainTemplateVersionData;

      api.post('/v3/testDomain/templates/testTemplateName/versions').reply(200, {
        message: 'new version of the template has been stored',
        template: {
          name: 'test_template1',
          description: 'test_template description 1',
          createdAt: 'Wed, 22 Dec 2021 08:59:29 UTC',
          createdBy: '',
          id: 'someId',
          version: {
            tag: 'v1',
            template: '%recipient.title%',
            engine: 'handlebars',
            mjml: '',
            createdAt: 'Wed, 22 Dec 2021 08:59:29 UTC',
            comment: 'comment',
            active: true,
            id: 'someId2'
          }
        }
      });

      const templateVersion = await client.createVersion('testDomain', 'testTemplateName', templateVersionData);
      expect(templateVersion).toMatchObject({
        status: 200,
        message: 'new version of the template has been stored',
        template: {
          name: 'test_template1',
          description: 'test_template description 1',
          createdAt: new Date('Wed, 22 Dec 2021 08:59:29 UTC'),
          createdBy: '',
          id: 'someId',
          version: {
            tag: 'v1',
            template: '%recipient.title%',
            engine: 'handlebars',
            mjml: '',
            createdAt: new Date('Wed, 22 Dec 2021 08:59:29 UTC'),
            comment: 'comment',
            active: true,
            id: 'someId2'
          }
        }
      });
    });

    it('return result if no template in API response', async () => {
      const templateVersionData = {
        template: '%recipient.title%',
        tag: 'v3',
        comment: 'comment',
        active: 'yes'
      } as DomainTemplateVersionData;

      api.post('/v3/testDomain/templates/testTemplateName/versions').reply(200, {
        message: 'new version of the template has been stored'
      });

      const templateVersion = await client.createVersion('testDomain', 'testTemplateName', templateVersionData);
      expect(templateVersion).toMatchObject({
        status: 200,
        message: 'new version of the template has been stored',
      });
    });
  });

  describe('getVersion', function () {
    it('fetches version of domain template', async () => {
      api.get('/v3/testDomain/templates/testTemplateName/versions/v1').reply(200, {
        template: {
          name: 'test_template',
          description: 'test_template description',
          createdAt: 'Wed, 22 Dec 2021 09:13:27 UTC',
          createdBy: '',
          id: 'someId',
          version: {
            tag: 'v1',
            template: '%recipient.title%',
            engine: 'handlebars',
            mjml: '',
            createdAt: 'Wed, 22 Dec 2021 09:13:27 UTC',
            comment: 'dummy comment',
            active: false,
            id: 'someId2'
          }
        }
      });

      const template = await client.getVersion('testDomain', 'testTemplateName', 'v1');
      expect(template).toMatchObject({
        name: 'test_template',
        description: 'test_template description',
        createdAt: new Date('2021-12-22T09:13:27.000Z'),
        createdBy: '',
        id: 'someId',
        version: {
          tag: 'v1',
          template: '%recipient.title%',
          engine: 'handlebars',
          mjml: '',
          createdAt: new Date('2021-12-22T09:13:27.000Z'),
          comment: 'dummy comment',
          active: false,
          id: 'someId2',
        }
      });
    });
  });

  describe('updateVersion', function () {
    it('updates version of domain template', async () => {
      api.put('/v3/testDomain/templates/testTemplateName/versions/v2').reply(200, {
        message: 'version has been updated',
        template: { name: 'test_template', version: { tag: 'v2' } }
      });

      const updatedTemplate = await client.updateVersion('testDomain', 'testTemplateName', 'v2', {
        template: '%recipient.title%',
        comment: 'updated comment 2',
        active: 'yes'
      } as DomainTemplateUpdateVersionData);
      expect(updatedTemplate).toMatchObject({
        status: 200,
        message: 'version has been updated',
        templateName: 'test_template',
        templateVersion: { tag: 'v2' }
      });
    });

    it('return result if no template in API response', async () => {
      api.put('/v3/testDomain/templates/testTemplateName/versions/v2').reply(200, {
        message: 'version has been updated'
      });

      const updatedTemplate = await client.updateVersion('testDomain', 'testTemplateName', 'v2', {
        template: '%recipient.title%',
        comment: 'updated comment 2',
        active: 'yes'
      } as DomainTemplateUpdateVersionData);
      expect(updatedTemplate).toMatchObject({
        status: 200,
        message: 'version has been updated'
      });
    });
  });

  describe('destroyVersion', function () {
    it('deletes version of domain template', async () => {
      api.delete('/v3/testDomain/templates/testTemplateName/versions/v1').reply(200, {
        message: 'version has been deleted',
        template: { name: 'test_template', version: { tag: 'v1' } }
      });

      const deletedTemplate = await client.destroyVersion('testDomain', 'testTemplateName', 'v1');
      expect(deletedTemplate).toMatchObject({
        status: 200,
        message: 'version has been deleted',
        templateName: 'test_template',
        templateVersion: { tag: 'v1' }
      });
    });
  });

  describe('listVersions', function () {
    it('gets list of version for domain template', async () => {
      api.get('/v3/testDomain/templates/testTemplateName/versions').reply(200, {
        paging: {
          first: 'https://api.mailgun.net/v3/testDomain/templates/temporary-test-template/versions?limit=100',
          last: 'https://api.mailgun.net/v3/testDomain/templates/temporary-test-template/versions?page=last&limit=100',
          next: 'https://api.mailgun.net/v3/testDomain/templates/temporary-test-template/versions?page=next&p=initial&limit=100',
          previous: 'https://api.mailgun.net/v3/testDomain/templates/temporary-test-template/versions?page=previous&p=initial&limit=100'
        },
        template: {
          name: 'test_template',
          description: 'test_template description',
          createdAt: 'Wed, 22 Dec 2021 09:13:27 UTC',
          createdBy: '',
          id: 'someId',
          versions: [{
            tag: 'v2',
            engine: 'handlebars',
            mjml: '',
            createdAt: 'Wed, 22 Dec 2021 09:51:07 UTC',
            comment: 'updated comment 2',
            active: true,
            id: 'someId1'
          },
          {
            tag: 'v5',
            engine: 'handlebars',
            mjml: '',
            createdAt: 'Mon, 20 Dec 2021 16:36:55 UTC',
            comment: 'updated comment',
            active: false,
            id: 'someId2'
          }]
        }
      });

      const templatesList = await client.listVersions('testDomain', 'testTemplateName');
      expect(templatesList).toMatchObject({
        pages: {
          first: {
            id: 'first',
            iteratorPosition: undefined,
            page: '?limit=100',
            url: 'https://api.mailgun.net/v3/testDomain/templates/temporary-test-template/versions?limit=100',
          },
          last: {
            id: 'last',
            iteratorPosition: undefined,
            page: '?page=last&limit=100',
            url: 'https://api.mailgun.net/v3/testDomain/templates/temporary-test-template/versions?page=last&limit=100',
          },
          next: {
            id: 'next',
            iteratorPosition: 'initial',
            page: '?page=next&p=initial&limit=100',
            url: 'https://api.mailgun.net/v3/testDomain/templates/temporary-test-template/versions?page=next&p=initial&limit=100',
          },
          previous: {
            id: 'previous',
            iteratorPosition: 'initial',
            page: '?page=previous&p=initial&limit=100',
            url: 'https://api.mailgun.net/v3/testDomain/templates/temporary-test-template/versions?page=previous&p=initial&limit=100',
          }

        },
        template: {
          name: 'test_template',
          description: 'test_template description',
          createdAt: new Date('Wed, 22 Dec 2021 09:13:27 UTC'),
          createdBy: '',
          id: 'someId',
          versions: [{
            tag: 'v2',
            engine: 'handlebars',
            mjml: '',
            createdAt: new Date('Wed, 22 Dec 2021 09:51:07 UTC'),
            comment: 'updated comment 2',
            active: true,
            id: 'someId1'
          },
          {
            tag: 'v5',
            engine: 'handlebars',
            mjml: '',
            createdAt: new Date('Mon, 20 Dec 2021 16:36:55 UTC'),
            comment: 'updated comment',
            active: false,
            id: 'someId2'
          }]
        }
      });
    });
  });
});
