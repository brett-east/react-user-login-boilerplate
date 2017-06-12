import React from 'react';
import ReactDOM from 'react-dom';

import { routes } from './routes/routes';
// import Signup from 'Signup';



// App.css
require('applicationStyles');

ReactDOM.render(
  routes,
  document.getElementById('app')
);
