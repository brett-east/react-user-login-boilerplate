import React from 'react';

import PrivateHeader from 'PrivateHeader';
import PrivateDetails from 'PrivateDetails';

export const Dashboard = (props) => {
  return (
    <div>
      <PrivateHeader title="Login Boilerplate" {...props}/>
      <div className="page-content">
        <PrivateDetails {...props} />
      </div>
    </div>
  );
};
