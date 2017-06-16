import React from 'react';

import PrivateHeader from 'PrivateHeader';

export const Dashboard = (props) => {
  return (
    <div>
      <PrivateHeader title="login boilerplate" {...props}/>
    </div>
  );
};
