const mongoose = require('mongoose');
const validator = require('validator');

var User = mongoose.model('user', {
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    lowercase: true,
    validate: {
      validator: validator.isEmail,
      message: 'not a valid email'
    }
  },
  password: {
    type: String,
    require: true,
    minlength: 8
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

module.exports = {
  User
};
