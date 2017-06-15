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
    res.header('x-auth', token).send(user)
  }).catch((err) => {
    res.satus(400).send(err);
  })
});

router.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

module.exports = {
  router
};
