import { expect } from 'chai';
import nock from 'nock';

import formData from 'form-data';
import EventClient from '../lib/Classes/Events';
import MgRequest from '../lib/Classes/common/Request';
import { InputFormData, RequestOptions } from '../lib/Types/Common';
import { EventsList } from '../lib/Types/Events';

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

    it('fetches all events', function () {
      api.get('/v3/domain.com/events').reply(200, response);

      return client.get('domain.com').then(function (data: EventsList) {
        let e;

        e = data.items[0];
        e.event.should.eql('accepted');
        e.timestamp.should.eql('Wed, 19 Nov 2014 18:32:57 GMT');

        e = data.items[1];
        e.event.should.eql('opened');
        e.timestamp.should.eql('Tue, 18 Nov 2014 12:32:57 GMT');
      });
    });

    it('fetches single page', function () {
      api.get('/v3/domain.com/events/pageId').reply(200, response);

      return client.get('domain.com', { page: 'pageId' }).then(function (data: EventsList) {
        let e;

        e = data.items[0];
        e.event.should.eql('accepted');
        e.timestamp.should.eql('Wed, 19 Nov 2014 18:32:57 GMT');

        e = data.items[1];
        e.event.should.eql('opened');
        e.timestamp.should.eql('Tue, 18 Nov 2014 12:32:57 GMT');
      });
    });

    it('parses page links', async function () {
      api.get('/v3/domain.com/events').reply(200, response);
      const result: EventsList = await client.get('domain.com');

      result.pages.first.url.should.eql('https://api.mailgun.net/v2/mailgun.com/events/W3siYSI6IGZhbHNlLCAiYiI6ICIyMDE0LTExLTE5VDIwOjU2OjIxLjY0MDIxMSswMDowMCJ9LCB7ImEiOiBmYWxzZSwgImIiOiAiMjAxNC0xMS0xOVQyMDo1NjoyMS42NDAyMTErMDA6MDAifSwgWyJ4IiwgImUiLCAiZiJdLCBudWxsLCBbWyJzZXZlcml0eSIsICJOT1QgaW50ZXJuYWwiXV0sIDI1LCBudWxsLCBbWyJkb21haW4ubmFtZSIsICJtYWlsZ3VuLmNvbSJdLCBbImFjY291bnQuaWQiLCAiMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAxIl1dXQ==');
      result.pages.first.page.should.eql('W3siYSI6IGZhbHNlLCAiYiI6ICIyMDE0LTExLTE5VDIwOjU2OjIxLjY0MDIxMSswMDowMCJ9LCB7ImEiOiBmYWxzZSwgImIiOiAiMjAxNC0xMS0xOVQyMDo1NjoyMS42NDAyMTErMDA6MDAifSwgWyJ4IiwgImUiLCAiZiJdLCBudWxsLCBbWyJzZXZlcml0eSIsICJOT1QgaW50ZXJuYWwiXV0sIDI1LCBudWxsLCBbWyJkb21haW4ubmFtZSIsICJtYWlsZ3VuLmNvbSJdLCBbImFjY291bnQuaWQiLCAiMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAxIl1dXQ==');
      expect(result.pages.first.iteratorPosition).to.be.equal(null);

      result.pages.last.url.should.eql('https://api.mailgun.net/v2/mailgun.com/events/W3siYSI6IGZhbHNlLCAiYiI6ICIyMDE0LTExLTE5VDIwOjU2OjIxLjY0MDIxMSswMDowMCJ9LCB7ImIiOiAiMTk3MC0wMS0wMVQwMDowMDowMCswMDowMCIsICJlIjogIjIwMTQtMTEtMTlUMjA6NTY6MjEuNjQwMjEyKzAwOjAwIn0sIFsieCIsICJlIiwgInAiLCAiZiJdLCBudWxsLCBbWyJzZXZlcml0eSIsICJOT1QgaW50ZXJuYWwiXV0sIDI1LCBudWxsLCBbWyJkb21haW4ubmFtZSIsICJtYWlsZ3VuLmNvbSJdLCBbImFjY291bnQuaWQiLCAiMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAxIl1dXQ==');
      result.pages.last.page.should.eql('W3siYSI6IGZhbHNlLCAiYiI6ICIyMDE0LTExLTE5VDIwOjU2OjIxLjY0MDIxMSswMDowMCJ9LCB7ImIiOiAiMTk3MC0wMS0wMVQwMDowMDowMCswMDowMCIsICJlIjogIjIwMTQtMTEtMTlUMjA6NTY6MjEuNjQwMjEyKzAwOjAwIn0sIFsieCIsICJlIiwgInAiLCAiZiJdLCBudWxsLCBbWyJzZXZlcml0eSIsICJOT1QgaW50ZXJuYWwiXV0sIDI1LCBudWxsLCBbWyJkb21haW4ubmFtZSIsICJtYWlsZ3VuLmNvbSJdLCBbImFjY291bnQuaWQiLCAiMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAxIl1dXQ==');
      expect(result.pages.last.iteratorPosition).to.be.equal(null);

      result.pages.next.url.should.eql('https://api.mailgun.net/v2/mailgun.com/events/W3siYSI6IGZhbHNlLCAiYiI6ICIyMDE0LTExLTE5VDIwOjU2OjIxLjY0MDIxMSswMDowMCJ9LCB7ImEiOiBmYWxzZSwgImIiOiAiMjAxNC0xMS0xNFQyMzowODowNC4yODUwMDArMDA6MDAifSwgWyJ4IiwgImUiLCAiZiJdLCBudWxsLCBbWyJzZXZlcml0eSIsICJOT1QgaW50ZXJuYWwiXV0sIDI1LCAibWVzc2FnZSN5NXhkN0pqc1FadVlRQzUyenUyUGlnIiwgW1siZG9tYWluLm5hbWUiLCAibWFpbGd1bi5jb20iXSwgWyJhY2NvdW50LmlkIiwgIjAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMSJdXV0=');
      result.pages.next.page.should.eql('W3siYSI6IGZhbHNlLCAiYiI6ICIyMDE0LTExLTE5VDIwOjU2OjIxLjY0MDIxMSswMDowMCJ9LCB7ImEiOiBmYWxzZSwgImIiOiAiMjAxNC0xMS0xNFQyMzowODowNC4yODUwMDArMDA6MDAifSwgWyJ4IiwgImUiLCAiZiJdLCBudWxsLCBbWyJzZXZlcml0eSIsICJOT1QgaW50ZXJuYWwiXV0sIDI1LCAibWVzc2FnZSN5NXhkN0pqc1FadVlRQzUyenUyUGlnIiwgW1siZG9tYWluLm5hbWUiLCAibWFpbGd1bi5jb20iXSwgWyJhY2NvdW50LmlkIiwgIjAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMSJdXV0=');
      expect(result.pages.next.iteratorPosition).to.be.equal(null);

      result.pages.previous.url.should.eql('https://api.mailgun.net/v2/mailgun.com/events/W3siYSI6IGZhbHNlLCAiYiI6ICIyMDE0LTExLTE5VDIwOjU2OjIxLjY0MDIxMSswMDowMCJ9LCB7ImIiOiAiMjAxNC0xMS0xOVQxODozMjo1Ny4wMTkwMDArMDA6MDAiLCAiZSI6ICIyMDE0LTExLTE5VDIwOjU2OjIxLjY0MTIxMSswMDowMCJ9LCBbIngiLCAiZSIsICJwIiwgImYiXSwgbnVsbCwgW1sic2V2ZXJpdHkiLCAiTk9UIGludGVybmFsIl1dLCAyNSwgIm1lc3NhZ2Ujc3UxSk93N1dRX0dQXzVlRHg5am1tUSIsIFtbImRvbWFpbi5uYW1lIiwgIm1haWxndW4uY29tIl0sIFsiYWNjb3VudC5pZCIsICIwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDEiXV1d');
      result.pages.previous.page.should.eql('W3siYSI6IGZhbHNlLCAiYiI6ICIyMDE0LTExLTE5VDIwOjU2OjIxLjY0MDIxMSswMDowMCJ9LCB7ImIiOiAiMjAxNC0xMS0xOVQxODozMjo1Ny4wMTkwMDArMDA6MDAiLCAiZSI6ICIyMDE0LTExLTE5VDIwOjU2OjIxLjY0MTIxMSswMDowMCJ9LCBbIngiLCAiZSIsICJwIiwgImYiXSwgbnVsbCwgW1sic2V2ZXJpdHkiLCAiTk9UIGludGVybmFsIl1dLCAyNSwgIm1lc3NhZ2Ujc3UxSk93N1dRX0dQXzVlRHg5am1tUSIsIFtbImRvbWFpbi5uYW1lIiwgIm1haWxndW4uY29tIl0sIFsiYWNjb3VudC5pZCIsICIwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDEiXV1d');
      expect(result.pages.previous.iteratorPosition).to.be.equal(null);
    });
  });
});
