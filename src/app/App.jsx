// @ts-check

import React from 'react';
import {
  BrowserRouter, Switch, Route, Redirect,
} from 'react-router-dom';
import _ from 'lodash';
import Chat from '../features/Chat.jsx';
import LoginPage from '../features/loginPage/LoginPage.jsx';
import NoMatch from '../features/noMatch/NoMatch.jsx';
import authContext from '../context/authContext.jsx';
import useAuth from '../hooks/useAuth.jsx';
import SignupPage from '../features/signupPage/SignupPage.jsx';

const AuthProvider = ({ children }) => {
  const isLoggedIn = () => _.has(localStorage, 'token');

  const logIn = (token, username) => {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
  };

  const logOut = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
  };

  return (
    <authContext.Provider value={{ isLoggedIn, logIn, logOut }}>
      {children}
    </authContext.Provider>
  );
};

const ChatRoute = ({ children, path }) => {
  const auth = useAuth();

  return (
    <Route
      path={path}
      // @ts-ignore
      render={({ location }) => (auth.isLoggedIn()
        ? (
          children
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: location } }} />
        ))}
    />
  );
};

const App = () => (
  <div className="d-flex flex-column h-100">
    <AuthProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/login" render={() => <LoginPage />} />
          <Route path="/signup" render={() => <SignupPage />} />
          <ChatRoute path="/">
            <Chat />
          </ChatRoute>
          <Route path="*" render={() => <NoMatch />} />
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  </div>
);

export default App;
