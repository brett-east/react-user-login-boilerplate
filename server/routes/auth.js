const express = require('express');
const _ = require('lodash');

const router = new express.Router();

// Load middleware
const { authenticate } = require('./../middleware/authenticate');

// Load models
const { User } = require('./../models/user');

router.post('/users', (req, res) => {
  let body = _.pick(req.body, ['email', 'password']);
  let user = new User(body);

  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('Authorization', `Bearer ${token}`).send(user);
  }).catch((err) => {
    if (err.name === 'MongoError' && err.code === 11000) {
        // Duplicate email
        return res.status(400).send({message: 'Email is already in use'});
      }
    res.status(400).send(err);
  });
});

router.post('/users/login', (req, res) => {
  let body = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(body.email, body.password).then((user) => {
    return user.generateAuthToken().then((token) => {
      res.header('Authorization', `Bearer ${token}`).send(user);
    });
  }).catch((err) => {
    res.status(400).send(err);
  });
});

router.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

router.delete('/users/me/logout', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  }).catch((err) => {
    res.satus(400).send();
  });
});

module.exports = {
  router
};
