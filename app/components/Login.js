import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import validator from 'validator';

import { authenticateUser } from 'auth';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ''
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

    axios({
      method: 'post',
      url: '/auth/users/login',
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
      if (err.response) {
        this.setState({
          error: err.response.data.message
        });
      }
    });

  }
  render() {
    return (
      <div className="panel-view">
        <div className="panel-view__panel">
          <div className="panel-view__column">
            <h1>Some app name</h1>

            <p>Welcome back!</p>
            <Link to="/">Don't have an account?</Link>
          </div>
          <div className="panel-view__column">
            <h2>Login</h2>

            {this.state.error ? <p>{this.state.error}</p> : undefined}

            <form onSubmit={this.onSubmit.bind(this)} noValidate className="panel-view__form">
              <input type="email" ref="email" name="email" placeholder="Email" />
              <input type="password" ref="password" name="password" placeholder="Password" />
              <button className="button">Login</button>
            </form>

        </div>
        </div>
      </div>
    );
  }
};
