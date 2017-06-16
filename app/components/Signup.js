import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import validator from 'validator';

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

    if (!validator.isEmail(email)) {
      return this.setState({
        error: 'You must use a valid email'
      });
    }

    if (password.length < 8) {
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
      <div className="panel-view">
        <div className="panel-view__panel">
          <div className="panel-view__column">
            <h1>Some app name</h1>

            <p>This is an app, it's really cool, you should sign up!</p>
            <Link to="/login">Already have an account?</Link>
          </div>
          <div className="panel-view__column">
            <h2>Sign up</h2>

            {this.state.error ? <p>{this.state.error}</p> : undefined}

            <form onSubmit={this.onSubmit.bind(this)} noValidate className="panel-view__form">
              <input type="email" ref="email" name="email" placeholder="Email" />
              <input type="password" ref="password" name="password" placeholder="Password" />
              <button className="button">Create Account</button>
            </form>

          </div>
        </div>
      </div>
    );
  }
};
