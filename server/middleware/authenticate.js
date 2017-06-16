var { User } = require('./../models/user');

var authenticate = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send();
  }
  var token = req.headers.authorization.split(' ')[1];
  User.findByToken(token).then((user) => {
    if (!user) {
      return Promise.reject();
    }

    req.user = user;
    req.token = token;
    next();
  }).catch((err) => {
    res.status(401).send()
  });
};

module.exports = {
  authenticate
}
