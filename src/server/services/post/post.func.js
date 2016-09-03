'use strict';
const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../app');

describe('Post Service', () => {
  describe('router', () => {
    const agent = request.agent(app); // for session based auth
    let testUserId; // set in POST /posts before hook

    const testUser = {
      username: 'testuser',
      password: 'testpassword',
      email: 'test@test.com'
    };

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

    describe('POST /posts', () => {
      // create user to make posts with
      before((done) => {
        agent
          .post('/users')
          .send({ data: testUser })
          .end((err, res) => {
            if (err) console.error(err);
            testUserId = res.body.data.userId.slice();
            done();
          });
      });

      it('responds with status 201 and proper json data', (done) => {
        const fakeData = {
          data: {
            userId: testUserId,
            title: 'test title',
            imageUrl: 'http://www.test.com/test.jpg'
          }
        };

        agent
          .post('/posts')
          .send(fakeData)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(201)
          .end((err, res) => {
            const post = Object.assign({}, res.body.data);
            expect(post).to.not.have.property('password');
            expect(post).to.not.have.property('id');
            expect(post).to.have.property('postId');
            expect(post).to.have.property('userId', testUserId);
            expect(post).to.have.property('email', 'test@test.com');
            expect(post).to.have.property('title', 'test title');
            expect(post).to.have.property('imageUrl', 'http://www.test.com/test.jpg');
            done();
          });
      });
    });

    describe('GET /posts/user/:userId', () => {
      it('responds with status 200 and proper json data');
    });

    describe('GET /posts', () => {
      it('responds with status 200 and proper json data');
    });

    describe('DELETE /posts/:postId', () => {
      it('responds with status 204');
    });
  });
});
