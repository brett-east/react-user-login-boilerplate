import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import Login from 'Login';
import Signup from 'Signup';
import { Dashboard } from 'Dashboard';
import NotFound from 'NotFound';
import { PrivateRoute, PublicRoute } from 'Routes';

export const routes = (
  <Router>
    <Switch>
      <PublicRoute path="/" exact component={Signup}/>
      <PublicRoute path="/login" component={Login}/>
      <PrivateRoute path="/dashboard" component={Dashboard}/>
      <Route component={NotFound} />
    </Switch>
  </Router>
);
