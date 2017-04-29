var React = require('react');
var ReactDOM = require('react-dom');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');

// Load foundation
$(document).foundation();

// App.css
require('applicationStyles');

ReactDOM.render(
  <p>Boilerplate 3 project</p>,
  document.getElementById('app')
);
