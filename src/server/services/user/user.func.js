'use strict';
const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../app');

describe('User Service', () => {
  describe('router', () => {
    const agent = request.agent(app); // for session based auth
    let testUserId; // set in POST /users, deleted in DELETE /users/:userId

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
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            const user = Object.assign({}, res.body.data);
            expect(user).to.not.have.property('password');
            expect(user).to.have.property('userId');
            expect(user).to.have.property('username', 'testuser');
            expect(user).to.have.property('email', 'test@test.com');
            testUserId = user.userId;
            done();
          });
      });
    });

    describe('GET /users/:userId', () => {
      it('responds with status 200 and proper json data', (done) => {
        agent
          .get(`/users/${testUserId}`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            const user = Object.assign({}, res.body.data);
            expect(user).to.not.have.property('password');
            expect(user).to.not.have.property('id');
            expect(user).to.have.property('userId', testUserId);
            expect(user).to.have.property('username', 'testuser');
            expect(user).to.have.property('email', 'test@test.com');
            done();
          });
      });
    });

    describe('DELETE /users/:userId', () => {
      it('responds with status 204', (done) => {
        agent
          .del(`/users/${testUserId}`)
          .expect(204, done);
      });
    });
  });
});
