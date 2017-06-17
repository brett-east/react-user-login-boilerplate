import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <div className="panel-view">
      <div className="panel-view__panel">
        <div className="panel-view__column">
          <h1>Page Not Found</h1>
          <p>Hmm, we're unable to find that page.</p>
          <Link className="button button--link" to="/">HEAD HOME</Link>
      </div>
      </div>
    </div>
  );
}
