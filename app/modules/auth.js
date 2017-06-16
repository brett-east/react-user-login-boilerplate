const axios = require('axios');


export function authenticateUser(authToken) {
  localStorage.setItem('authToken', authToken);
};

export function deauthenticateUser() {

};

export function checkAuthenticated() {
  return !!localStorage.getItem('authToken');
};

export function getToken() {
  localStorage.getItem('authToken');
};
