import nock from 'nock';

import formData from 'form-data';
import EventClient from '../../lib/Classes/Events.js';
import MgRequest from '../../lib/Classes/common/Request.js';
import {
  InputFormData,
  RequestOptions,
  EventsList
} from '../../lib/Types/index.js';

describe('EventsClient', function () {
  let client: EventClient;
  let api: nock.Scope;

  beforeEach(function () {
    client = new EventClient(new MgRequest({ url: 'https://api.mailgun.net' } as RequestOptions, formData as InputFormData));
    api = nock('https://api.mailgun.net');
  });

  afterEach(function () {
    api.done();
  });

  describe('GET', function () {
    let response: Record<string, unknown>;

    beforeEach(function () {
      response = {
        items: [
          {
            event: 'accepted',
            timestamp: 'Wed, 19 Nov 2014 18:32:57 GMT',
            content: { more: 'data' }
          }, {
            event: 'opened',
            timestamp: 'Tue, 18 Nov 2014 12:32:57 GMT',
            content: { more: 'data' }
          }
        ],
        paging: {
          first: 'https://api.mailgun.net/v2/mailgun.com/events/W3siYSI6IGZhbHNlLCAiYiI6ICIyMDE0LTExLTE5VDIwOjU2OjIxLjY0MDIxMSswMDowMCJ9LCB7ImEiOiBmYWxzZSwgImIiOiAiMjAxNC0xMS0xOVQyMDo1NjoyMS42NDAyMTErMDA6MDAifSwgWyJ4IiwgImUiLCAiZiJdLCBudWxsLCBbWyJzZXZlcml0eSIsICJOT1QgaW50ZXJuYWwiXV0sIDI1LCBudWxsLCBbWyJkb21haW4ubmFtZSIsICJtYWlsZ3VuLmNvbSJdLCBbImFjY291bnQuaWQiLCAiMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAxIl1dXQ==',
          last: 'https://api.mailgun.net/v2/mailgun.com/events/W3siYSI6IGZhbHNlLCAiYiI6ICIyMDE0LTExLTE5VDIwOjU2OjIxLjY0MDIxMSswMDowMCJ9LCB7ImIiOiAiMTk3MC0wMS0wMVQwMDowMDowMCswMDowMCIsICJlIjogIjIwMTQtMTEtMTlUMjA6NTY6MjEuNjQwMjEyKzAwOjAwIn0sIFsieCIsICJlIiwgInAiLCAiZiJdLCBudWxsLCBbWyJzZXZlcml0eSIsICJOT1QgaW50ZXJuYWwiXV0sIDI1LCBudWxsLCBbWyJkb21haW4ubmFtZSIsICJtYWlsZ3VuLmNvbSJdLCBbImFjY291bnQuaWQiLCAiMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAxIl1dXQ==',
          next: 'https://api.mailgun.net/v2/mailgun.com/events/W3siYSI6IGZhbHNlLCAiYiI6ICIyMDE0LTExLTE5VDIwOjU2OjIxLjY0MDIxMSswMDowMCJ9LCB7ImEiOiBmYWxzZSwgImIiOiAiMjAxNC0xMS0xNFQyMzowODowNC4yODUwMDArMDA6MDAifSwgWyJ4IiwgImUiLCAiZiJdLCBudWxsLCBbWyJzZXZlcml0eSIsICJOT1QgaW50ZXJuYWwiXV0sIDI1LCAibWVzc2FnZSN5NXhkN0pqc1FadVlRQzUyenUyUGlnIiwgW1siZG9tYWluLm5hbWUiLCAibWFpbGd1bi5jb20iXSwgWyJhY2NvdW50LmlkIiwgIjAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMSJdXV0=',
          previous: 'https://api.mailgun.net/v2/mailgun.com/events/W3siYSI6IGZhbHNlLCAiYiI6ICIyMDE0LTExLTE5VDIwOjU2OjIxLjY0MDIxMSswMDowMCJ9LCB7ImIiOiAiMjAxNC0xMS0xOVQxODozMjo1Ny4wMTkwMDArMDA6MDAiLCAiZSI6ICIyMDE0LTExLTE5VDIwOjU2OjIxLjY0MTIxMSswMDowMCJ9LCBbIngiLCAiZSIsICJwIiwgImYiXSwgbnVsbCwgW1sic2V2ZXJpdHkiLCAiTk9UIGludGVybmFsIl1dLCAyNSwgIm1lc3NhZ2Ujc3UxSk93N1dRX0dQXzVlRHg5am1tUSIsIFtbImRvbWFpbi5uYW1lIiwgIm1haWxndW4uY29tIl0sIFsiYWNjb3VudC5pZCIsICIwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDEiXV1d'
        }
      };
    });

    it('fetches all events', async () => {
      api.get('/v3/domain.com/events').reply(200, response);
      const data = await client.get('domain.com');
      expect(data).toMatchObject({
        items: expect.any(Array)
      });
      expect(data.items).toHaveLength(2);

      expect(data.items[0]).toMatchObject({
        event: 'accepted',
        timestamp: 'Wed, 19 Nov 2014 18:32:57 GMT'
      });
      expect(data.items[1]).toMatchObject({
        event: 'opened',
        timestamp: 'Tue, 18 Nov 2014 12:32:57 GMT'
      });
    });

    it('fetches single page', async () => {
      api.get('/v3/domain.com/events/pageId').reply(200, response);
      const data = await client.get('domain.com', { page: 'pageId' });
      expect(data).toMatchObject({
        items: expect.any(Array)
      });
      expect(data.items).toHaveLength(2);

      expect(data.items[0]).toMatchObject({
        event: 'accepted',
        timestamp: 'Wed, 19 Nov 2014 18:32:57 GMT'
      });
      expect(data.items[1]).toMatchObject({
        event: 'opened',
        timestamp: 'Tue, 18 Nov 2014 12:32:57 GMT'
      });
    });

    it('parses page links', async () => {
      api.get('/v3/domain.com/events').reply(200, response);
      const result: EventsList = await client.get('domain.com');
      expect(result).toMatchObject({
        pages: {
          first: {
            url: 'https://api.mailgun.net/v2/mailgun.com/events/W3siYSI6IGZhbHNlLCAiYiI6ICIyMDE0LTExLTE5VDIwOjU2OjIxLjY0MDIxMSswMDowMCJ9LCB7ImEiOiBmYWxzZSwgImIiOiAiMjAxNC0xMS0xOVQyMDo1NjoyMS42NDAyMTErMDA6MDAifSwgWyJ4IiwgImUiLCAiZiJdLCBudWxsLCBbWyJzZXZlcml0eSIsICJOT1QgaW50ZXJuYWwiXV0sIDI1LCBudWxsLCBbWyJkb21haW4ubmFtZSIsICJtYWlsZ3VuLmNvbSJdLCBbImFjY291bnQuaWQiLCAiMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAxIl1dXQ==',
            page: 'W3siYSI6IGZhbHNlLCAiYiI6ICIyMDE0LTExLTE5VDIwOjU2OjIxLjY0MDIxMSswMDowMCJ9LCB7ImEiOiBmYWxzZSwgImIiOiAiMjAxNC0xMS0xOVQyMDo1NjoyMS42NDAyMTErMDA6MDAifSwgWyJ4IiwgImUiLCAiZiJdLCBudWxsLCBbWyJzZXZlcml0eSIsICJOT1QgaW50ZXJuYWwiXV0sIDI1LCBudWxsLCBbWyJkb21haW4ubmFtZSIsICJtYWlsZ3VuLmNvbSJdLCBbImFjY291bnQuaWQiLCAiMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAxIl1dXQ==',
            iteratorPosition: null
          },
          last: {
            url: 'https://api.mailgun.net/v2/mailgun.com/events/W3siYSI6IGZhbHNlLCAiYiI6ICIyMDE0LTExLTE5VDIwOjU2OjIxLjY0MDIxMSswMDowMCJ9LCB7ImIiOiAiMTk3MC0wMS0wMVQwMDowMDowMCswMDowMCIsICJlIjogIjIwMTQtMTEtMTlUMjA6NTY6MjEuNjQwMjEyKzAwOjAwIn0sIFsieCIsICJlIiwgInAiLCAiZiJdLCBudWxsLCBbWyJzZXZlcml0eSIsICJOT1QgaW50ZXJuYWwiXV0sIDI1LCBudWxsLCBbWyJkb21haW4ubmFtZSIsICJtYWlsZ3VuLmNvbSJdLCBbImFjY291bnQuaWQiLCAiMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAxIl1dXQ==',
            page: 'W3siYSI6IGZhbHNlLCAiYiI6ICIyMDE0LTExLTE5VDIwOjU2OjIxLjY0MDIxMSswMDowMCJ9LCB7ImIiOiAiMTk3MC0wMS0wMVQwMDowMDowMCswMDowMCIsICJlIjogIjIwMTQtMTEtMTlUMjA6NTY6MjEuNjQwMjEyKzAwOjAwIn0sIFsieCIsICJlIiwgInAiLCAiZiJdLCBudWxsLCBbWyJzZXZlcml0eSIsICJOT1QgaW50ZXJuYWwiXV0sIDI1LCBudWxsLCBbWyJkb21haW4ubmFtZSIsICJtYWlsZ3VuLmNvbSJdLCBbImFjY291bnQuaWQiLCAiMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAxIl1dXQ==',
            iteratorPosition: null
          },
          next: {
            url: 'https://api.mailgun.net/v2/mailgun.com/events/W3siYSI6IGZhbHNlLCAiYiI6ICIyMDE0LTExLTE5VDIwOjU2OjIxLjY0MDIxMSswMDowMCJ9LCB7ImEiOiBmYWxzZSwgImIiOiAiMjAxNC0xMS0xNFQyMzowODowNC4yODUwMDArMDA6MDAifSwgWyJ4IiwgImUiLCAiZiJdLCBudWxsLCBbWyJzZXZlcml0eSIsICJOT1QgaW50ZXJuYWwiXV0sIDI1LCAibWVzc2FnZSN5NXhkN0pqc1FadVlRQzUyenUyUGlnIiwgW1siZG9tYWluLm5hbWUiLCAibWFpbGd1bi5jb20iXSwgWyJhY2NvdW50LmlkIiwgIjAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMSJdXV0=',
            page: 'W3siYSI6IGZhbHNlLCAiYiI6ICIyMDE0LTExLTE5VDIwOjU2OjIxLjY0MDIxMSswMDowMCJ9LCB7ImEiOiBmYWxzZSwgImIiOiAiMjAxNC0xMS0xNFQyMzowODowNC4yODUwMDArMDA6MDAifSwgWyJ4IiwgImUiLCAiZiJdLCBudWxsLCBbWyJzZXZlcml0eSIsICJOT1QgaW50ZXJuYWwiXV0sIDI1LCAibWVzc2FnZSN5NXhkN0pqc1FadVlRQzUyenUyUGlnIiwgW1siZG9tYWluLm5hbWUiLCAibWFpbGd1bi5jb20iXSwgWyJhY2NvdW50LmlkIiwgIjAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMSJdXV0=',
            iteratorPosition: null
          },
          previous: {
            url: 'https://api.mailgun.net/v2/mailgun.com/events/W3siYSI6IGZhbHNlLCAiYiI6ICIyMDE0LTExLTE5VDIwOjU2OjIxLjY0MDIxMSswMDowMCJ9LCB7ImIiOiAiMjAxNC0xMS0xOVQxODozMjo1Ny4wMTkwMDArMDA6MDAiLCAiZSI6ICIyMDE0LTExLTE5VDIwOjU2OjIxLjY0MTIxMSswMDowMCJ9LCBbIngiLCAiZSIsICJwIiwgImYiXSwgbnVsbCwgW1sic2V2ZXJpdHkiLCAiTk9UIGludGVybmFsIl1dLCAyNSwgIm1lc3NhZ2Ujc3UxSk93N1dRX0dQXzVlRHg5am1tUSIsIFtbImRvbWFpbi5uYW1lIiwgIm1haWxndW4uY29tIl0sIFsiYWNjb3VudC5pZCIsICIwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDEiXV1d',
            page: 'W3siYSI6IGZhbHNlLCAiYiI6ICIyMDE0LTExLTE5VDIwOjU2OjIxLjY0MDIxMSswMDowMCJ9LCB7ImIiOiAiMjAxNC0xMS0xOVQxODozMjo1Ny4wMTkwMDArMDA6MDAiLCAiZSI6ICIyMDE0LTExLTE5VDIwOjU2OjIxLjY0MTIxMSswMDowMCJ9LCBbIngiLCAiZSIsICJwIiwgImYiXSwgbnVsbCwgW1sic2V2ZXJpdHkiLCAiTk9UIGludGVybmFsIl1dLCAyNSwgIm1lc3NhZ2Ujc3UxSk93N1dRX0dQXzVlRHg5am1tUSIsIFtbImRvbWFpbi5uYW1lIiwgIm1haWxndW4uY29tIl0sIFsiYWNjb3VudC5pZCIsICIwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDEiXV1d',
            iteratorPosition: null
          }
        }
      });
    });
  });
});
