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
    res.header('x-auth', token).send(user);
  }).catch((err) => {
    res.status(400).send();
  });
});

router.post('/users/login', (req, res) => {
  let body = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(body.email, body.password).then((user) => {
    return user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user);
    });
  }).catch((err) => {
    res.status(400).send();
  });
});

router.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

router.delete('/users/me/token', authenticate, (req, res) => {
  console.log(req.token);
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  }, () => {
    res.satus(400).send();
  });
});

module.exports = {
  router
};
