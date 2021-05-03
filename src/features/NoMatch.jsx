import React from 'react';
import { useLocation } from 'react-router-dom';

const NoMatch = () => {
  const location = useLocation();

  return (
    <div>
      <h1>404</h1>
      <h3>
        Not found
        {' '}
        <code>{location.pathname}</code>
      </h3>
      <p>Maybe this page moved? Got deleted?</p>
      <hr />
      <p>
        Let`s go
        {' '}
        <a href="/">HOME</a>
        {' '}
        and try from there.
      </p>
    </div>
  );
};

export default NoMatch;
