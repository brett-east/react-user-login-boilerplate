const mongoose = require('mongoose');

const SomeModel = mongoose.model('SomeModel', {
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  }
});

module.exports = {
  SomeModel
};
