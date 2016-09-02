const request = require('supertest');

const app = require('../../app');

describe('Authentication Service', () => {
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

    describe('GET /auth/verify', () => {
      it('responds properly to unauthenticated request', (done) => {
        request(app)
          .get('/auth/verify')
          .expect('Content-Type', /json/)
          .expect(401, {
            error: 'Unauthorized'
          }, done);
      });

      it('responds properly to authenticated request', (done) => {
        agent
          .get('/auth/verify')
          .withCredentials()
          .expect('Content-Type', /json/)
          .expect(200, {
            data: {
              userId: 'testId1',
              twitterId: 'testId1',
              isAuthenticated: true
            }
          }, done);
      });
    });
  });
});
