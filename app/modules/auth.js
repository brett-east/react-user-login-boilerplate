const axios = require('axios');


export function authenticateUser(authToken) {
  localStorage.setItem('authToken', authToken);
};

export function deauthenticateUser() {
  localStorage.removeItem('authToken');
};

export function checkAuthenticated() {
  return !!localStorage.getItem('authToken');
};

export function getTokenHeader() {
  return `Bearer ${localStorage.getItem('authToken')}`;
};
