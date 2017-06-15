const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');

const { SomeModel } = require('./../../models/someModel');
const { User } = require('./../../models/user');

// User seed data
const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [{
  _id: userOneId,
  email: 'userone@example.com',
  password: 'user1pass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({ _id: userOneId.toHexString(), access: 'auth' }, 'itsasecret').toString()
  }]
}, {
  _id: userTwoId,
  email: 'usertwo@example.com',
  password: 'user2pass'
}];

const populateUsers = (done) => {
  User.remove({}).then(() => {
    // save users to run pre('save') middleware -i.e. hash passwords
    var userOne = new User(users[0]).save();
    var userTwo = new User(users[1]).save();

    return Promise.all([userOne, userTwo]);
  }).then(() => done());
};

const someModels = [{
  text: 'First test someModel'
}, {
  text: 'Second test someModel'
}];


// Generic someModel seed data
const populateSomeModel = (done) => {
  SomeModel.remove({}).then(() => {
    return SomeModel.insertMany(someModels);
  }).then(() => done());
};

module.exports = {
  someModels,
  populateSomeModel,
  users,
  populateUsers
};
