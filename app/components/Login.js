import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

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
      this.setState({
        error: err
      });
    });

  }
  render() {
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Login</h1>

          {this.state.error ? <p>{this.state.error}</p> : undefined}

          <form onSubmit={this.onSubmit.bind(this)} noValidate className="boxed-view__form">
            <input type="email" ref="email" name="email" placeholder="Email" />
            <input type="password" ref="password" name="password" placeholder="Password" />
            <button className="button">Login</button>
          </form>

          <Link to="/">Don't have an account?</Link>
        </div>
      </div>
    );
  }
};
