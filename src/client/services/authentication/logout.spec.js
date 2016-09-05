import { expect } from 'chai';
import fetchMock from 'fetch-mock';

import rootUrl from '../../config/rooturl';
import logout from './logout';

describe('authentication service #logout', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('returns succesfully on status 200', (done) => {
    fetchMock
      .get(`${rootUrl}/logout/twitter`, {
        status: 200,
        body: {
          data: { isAuthenticated: false }
        }
      });

    logout()
      .then(() => {
        expect(fetchMock.called(`${rootUrl}/logout/twitter`)).to.equal(true);
        done();
      });
  });

  it('throws error if status is not 200', (done) => {
    fetchMock
      .get(`${rootUrl}/logout/twitter`, {
        status: 500,
        statusText: 'Internal Server Error'
      });

    logout()
      .then(() => {
        expect(fetchMock.called(`${rootUrl}/logout/twitter`)).to.equal(true);
        done();
      })
      .catch(e => {
        expect(e.message).to.equal('Internal Server Error');
        done();
      });
  });
});
