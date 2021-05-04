// @ts-check

import React from 'react';
import {
  BrowserRouter, Switch, Route, Redirect,
} from 'react-router-dom';
import Chat from '../features/Chat.jsx';
import LoginPage from '../features/LoginPage.jsx';
import NoMatch from '../features/NoMatch.jsx';
import useAuth from '../hooks/useAuth.js';
import SignupPage from '../features/SignupPage.jsx';

const App = () => {
  const auth = useAuth();

  return (
    <div className="d-flex flex-column h-100">
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={({ location }) => (auth.isLoggedIn()
              ? (
                <Chat />
              ) : (
                <Redirect to={{ pathname: '/login', state: { from: location } }} />
              ))}
          />
          <Route path="/login" render={() => <LoginPage />} />
          <Route path="/signup" render={() => <SignupPage />} />
          <Route path="*" render={() => <NoMatch />} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
