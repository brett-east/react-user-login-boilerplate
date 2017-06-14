const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')

// config
require('./config/config');

// connect to database
require('./db/mongoose').connect(process.env.MONGODB_URI);

// create our app
const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());


// routes
const apiRoutes = require('./routes/api').router;
const authRoutes = require('./routes/auth').router;
app.use('/api', apiRoutes);
app.use('/auth', authRoutes);

// serve static assets normally
app.use(express.static(path.resolve(__dirname + './../public')));

// handle every other route with index.html
app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, './../public', 'index.html'))
});

app.listen(PORT, function() {
  console.log('Express server is up on port ' + PORT);
});

module.exports = {
  app
};
