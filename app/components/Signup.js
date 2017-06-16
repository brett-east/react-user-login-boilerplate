import React from 'react';
import { Link } from 'react-router-dom';
const axios = require('axios');

import { authenticateUser } from 'auth';

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      authToken: ''
    };
  }
  onSubmit(e) {
    e.preventDefault();

    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();

    if (password.length < 9) {
      return this.setState({
        error: 'Password must be more than 8 characters in length'
      });
    }

    // save user
    axios({
      method: 'post',
      url: '/auth/users',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        email,
        password
      }
    }).then((res) => {
      console.log(res.headers.authorization);
      if (res.status === 200) {
        var authToken = res.headers.authorization.split(' ')[1];
        authenticateUser(authToken);
        this.props.history.replace('/dashboard');
      }
    }).catch((err) => {
      this.setState({
        error: err
      });
    });
    
  }
  render() {
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Sign up to our app</h1>

          {this.state.error ? <p>{this.state.error}</p> : undefined}

          <form onSubmit={this.onSubmit.bind(this)} noValidate className="boxed-view__form">
            <input type="email" ref="email" name="email" placeholder="Email" />
            <input type="password" ref="password" name="password" placeholder="Password" />
            <button className="button">Create Account</button>
          </form>

          <Link to="/login">Already have an account?</Link>
        </div>
      </div>
    );
  }
};
