const request = require('supertest');

const app = require('../../app');

describe('User Service', () => {
  describe('router', () => {
    const agent = request.agent(app); // for session based auth

    before((done) => {
      // put authentication credentials into session for testing
      app.get('/testing', (req, res) => {
        if (req.session) {
          const fakeAuth = {
            user: {
              userId: 'testId1',
              twitterId: 'testId1'
            }
          };
          req.session.passport = fakeAuth;
        }
        res.json({});
      });

      agent
        .get('/testing')
        .withCredentials()
        .end((req, res) => done());
    });

    describe('GET /users/:userId', () => {
      it('responds with status 200 and proper json data');
    });

    describe('POST /users', () => {
      it('responds with status 201 and proper json data');
    });

    describe('DELETE /users/:userId', () => {
      it('responds with status 204');
    });
  });
});