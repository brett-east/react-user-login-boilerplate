const express = require('express');
const { ObjectID } = require('mongodb');

const router = new express.Router();

// Load models
const { SomeModel } = require('./../models/someModel');

router.post('/someModel', (req, res) => {
  var someModel = new SomeModel({
    text: req.body.text
  });

  someModel.save().then((doc) => {
    res.send(doc);
  }).catch((err) => {
    res.status(400).send(err);
  });
});


router.get('/someModel', (req, res) => {
  SomeModel.find().then((someModels) => {
    res.send({ someModels }); // return the array on an object
  }).catch((err) => {
    res.status(400).send(err);
  })
});

router.get('/someModel/:id', (req, res) => {
  let id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }


  SomeModel.findById(id).then((someModel) => {
    if (!someModel) {
      return res.status(404).send();
    }
    res.send({someModel});
  }).catch((err) => {
    res.status(400).send();
  });

});

module.exports = {
  router
};
