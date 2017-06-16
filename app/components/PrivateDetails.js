import React from 'react';
import axios from 'axios';
import { getTokenHeader, deauthenticateUser } from 'auth';

class PrivateDetails extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      id: ''
    };
  }
  componentWillMount() {
    axios.get('/auth/users/me', {
      headers: {
        'Authorization': getTokenHeader()
      }
    }).then((res) => {
      this.setState({
        email: res.data.email,
        id: res.data._id
      });
    }).catch((err) => {
      deauthenticateUser(this.props);
    });
  }
  render() {
      return (
      <div>
        <p>Email is {this.state.email}</p>
        <p>Id is {this.state.id}</p>
      </div>
    );
  }
};

export default PrivateDetails;
