const express = require('express');
const _ = require('lodash');

const router = new express.Router();

// Load models
const { User } = require('./../models/user');

router.post('/users', (req, res) => {
  let body = _.pick(req.body, ['email', 'password']);
  let user = new User(body);

  user.save().then((user) => {
    res.send(user);
  }).catch((err) => {
    res.satus(400).send(err);
  })
});

module.exports = {
  router
};
