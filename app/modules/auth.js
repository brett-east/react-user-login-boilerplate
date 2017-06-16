const axios = require('axios');


export function authenticateUser(authToken) {
  localStorage.setItem('authToken', authToken);
};

export function deauthenticateUser(props) {
  localStorage.removeItem('authToken');
  if (props.history) {
    props.history.replace('/');
  }
};

export function checkAuthenticated() {
  return !!localStorage.getItem('authToken');
};

export function getTokenHeader() {
  return `Bearer ${localStorage.getItem('authToken')}`;
};
