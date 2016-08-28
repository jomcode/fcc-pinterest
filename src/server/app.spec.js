const expect = require('chai').expect;
const request = require('supertest');

const app = require('./app');

describe('GET /foo', () => {
  it('responds with 200 status, JSON, and expected data', (done) => {
    const expectedResult = { foo: 'bar' };

    request(app)
      .get('/foo')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        const result = Object.assign({}, res.body);
        expect(result).to.deep.equal(expectedResult);
        done();
      });
  });
});
