import React from 'react';

import PrivateHeader from 'PrivateHeader';

export const Dashboard = (props) => {
  console.log(props);
  return (
    <div>
      <PrivateHeader title="login boilerplate" />
    </div>
  );
};
