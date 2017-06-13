var express = require('express');
const path = require('path');

// create our app
var app = express();
const PORT = process.env.PORT || 3000;

// serve static assets normally
app.use(express.static(__dirname + '/public'));

// handle every other route with index.html
app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
});

app.listen(PORT, function() {
  console.log('Express server is up on port ' + PORT);
});
