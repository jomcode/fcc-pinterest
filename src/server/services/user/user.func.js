const expect = require('chai').expect;
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

    describe('POST /users', () => {
      it('responds with status 201 and proper json data', (done) => {
        const fakeData = {
          data: {
            username: 'testuser',
            password: 'testpassword',
            email: 'test@test.com'
          }
        };

        request(app)
          .post('/users')
          .send(fakeData)
          .set('Accept', 'application/json')
          .end((err, res) => {
            const user = Object.assign({}, res.body.data);
            expect(user).to.not.have.property('password');
            expect(user).to.have.property('userId');
            expect(user).to.have.property('username', 'testuser');
            expect(user).to.have.property('email', 'test@test.com');
            done();
          });
      });
    });

    describe('GET /users/:userId', () => {
      it('responds with status 200 and proper json data');
    });

    describe('DELETE /users/:userId', () => {
      it('responds with status 204');
    });
  });
});
