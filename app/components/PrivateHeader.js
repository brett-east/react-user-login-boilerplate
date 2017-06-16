import React from 'react';
import PropTypes from 'prop-types';
import { getTokenHeader, deauthenticateUser } from 'auth';
import axios from 'axios';

const handleLogout = (props) => {
  axios.delete('/auth/users/me/logout', {
    headers: {
      authorization: getTokenHeader()
    }
  }).then((res) => {
    if (res.status === 200) {
      deauthenticateUser(props);
    }
  }).catch((err) => {

  });
};

const PrivateHeader = (props) => {
  return (
    <div className="header">
      <div className="header__content">
        <h1 className="header__title">{props.title}</h1>
        <button className="button button--link-text" onClick={() => {handleLogout(props)}}>Logout</button>
      </div>
    </div>
  );
};

PrivateHeader.propTypes = {
  title: PropTypes.string.isRequired
};

export default PrivateHeader;
