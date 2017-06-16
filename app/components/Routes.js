import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { checkAuthenticated } from 'auth';

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest}
    render={props => ( checkAuthenticated() ?
      ( <Component {...props}/> ) :
      ( <Redirect to={{pathname: '/login', state: { from: props.location } }}/> )
  )}/>
 );

 export const PublicRoute = ({ component: Component, ...rest }) => (
   <Route {...rest}
     render={props => ( !checkAuthenticated() ?
       ( <Component {...props}/> ) :
       ( <Redirect to={{pathname: '/dashboard', state: { from: props.location } }}/> )
   )}/>
  );
