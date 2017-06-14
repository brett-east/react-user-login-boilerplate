const mongoose = require('mongoose');

const connect = (dbUrl) => {
  mongoose.Promise = global.Promise;
  mongoose.connect(dbUrl);

  // handle mongoose connection errors
  mongoose.connection.on('error', (err) => {
    console.error(`Mongoose connection error: ${err}`);
    process.exit(1);
  });

};

module.exports = {
  connect
};
