const expect = require('expect');
const request = require('supertest');

const { app } = require('./../server');
const { SomeModel }= require('./../models/someModel');

const someModels = [{
  text: 'First test someModel'
}, {
  text: 'Second test someModel'
}];

beforeEach((done) => {
  SomeModel.remove({}).then(() => {
    return SomeModel.insertMany(someModels);
  }).then(() => done());

});

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
