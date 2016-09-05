import { expect } from 'chai';
import fetchMock from 'fetch-mock';

import rootUrl from '../../config/rooturl';
import verify from './verify';

describe('authentication service #verify', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('returns succesfully on status 200', (done) => {
    fetchMock
      .get(`${rootUrl}/auth/verify`, {
        status: 200,
        body: {
          data: { isAuthenticated: true }
        }
      });

    verify()
      .then(result => {
        expect(fetchMock.called(`${rootUrl}/auth/verify`)).to.equal(true);
        expect(result).to.deep.equal({ isAuthenticated: true });
        done();
      });
  });

  it('throws error if status is not 200', (done) => {
    fetchMock
      .get(`${rootUrl}/auth/verify`, {
        status: 500,
        statusText: 'Internal Server Error'
      });

    verify()
      .then(() => {
        expect(fetchMock.called(`${rootUrl}/auth/verify`)).to.equal(true);
        done();
      })
      .catch(e => {
        expect(e.message).to.equal('Internal Server Error');
        done();
      });
  });
});
