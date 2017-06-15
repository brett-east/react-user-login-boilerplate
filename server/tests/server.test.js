const expect = require('expect');
const request = require('supertest');

const { app } = require('./../server');
const { SomeModel } = require('./../models/someModel');
const { User } = require('./../models/user');
const { someModels, populateSomeModel, users, populateUsers } = require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateSomeModel);

describe('POST /api/someModel', () => {

  it('should create a new someModel', (done) => {
    let text = 'Test someModel text';

    request(app)
      .post('/api/someModel')
      .send({ text })
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err) => {
        if (err) {
          return done(err);
        }

        SomeModel.find({ text }).then((someModels) => {
          expect(someModels.length).toBe(1);
          expect(someModels[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });

  it('should not create someModel with invalid data', (done) => {
    request(app)
      .post('/api/someModel')
      .send({})
      .expect(400)
      .end((err,res) => {
        if(err) {
          return done(err);
        }

        SomeModel.find().then((someModels) => {
          expect(someModels.length).toBe(2);
          done();
        }).catch((e) => done(e));
      });
  });

});


describe('GET /api/someModel', () => {

  it('should get all someModels', (done) => {
    request(app)
      .get('/api/someModel')
      .expect(200)
      .expect((res) => {
        expect(res.body.someModels.length).toBe(2);
      })
      .end(done);
  });

});

describe('GET /auth/users/me', () => {

  it('should return user if authenticated', (done) => {
    request(app)
      .get('/auth/users/me')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body._id).toBe(users[0]._id.toHexString());
        expect(res.body.email).toBe(users[0].email);
      })
      .end(done);

  });

  it('should return 401 if not authenticated', (done) => {
    request(app)
      .get('/auth/users/me')
      .expect(401)
      .expect((res) => {
        expect(res.body).toEqual({});
      })
      .end(done);
  });

});


describe('POST /auth/users', () => {

  it('should create a user', (done) => {
    var email = 'testuser@email.com';
    var password = 'validpassword';

    request(app)
      .post('/auth/users')
      .send({ email, password })
      .expect(200)
      .expect((res) => {
        expect(res.headers['x-auth']).toExist();
        expect(res.body._id).toExist();
        expect(res.body.email).toBe(email);
      })
      .end((err) => {
        if(err) {
          done(err);
        }
        User.findOne({ email }).then((user) => {
          expect(user).toExist();
          expect(user.password).toNotBe(password);
          done();
        });
      });
  });

  it('should return validation errors if request invalid', (done) => {
    var email = 'notanemail';
    var password = 'invalid';

    request(app)
      .post('/auth/users')
      .send({ email, password })
      .expect(400)
      .end(done);
  });

  it('should not create user if email in use', (done) => {
    var email = users[0].email;
    var password = 'validpassword';

    request(app)
      .post('/auth/users')
      .send({ email, password })
      .expect(400)
      .end(done);
  });

});
