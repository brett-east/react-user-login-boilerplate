import React from 'react';

import PrivateHeader from 'PrivateHeader';
import PrivateDetails from 'PrivateDetails';

export const Dashboard = (props) => {
  return (
    <div>
      <PrivateHeader title="login boilerplate" {...props}/>
      <PrivateDetails {...props} />
    </div>
  );
};
