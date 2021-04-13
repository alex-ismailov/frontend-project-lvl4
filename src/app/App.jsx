// @ts-check

import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Chat from '../features/chat/Chat.jsx';
import LoginForm from '../features/loginForm/LoginForm.jsx';
import NoMatch from '../features/noMatch/NoMatch.jsx';
import { UserNameProvider } from '../context/UserNameContext.js';

const App = () => (
  <div className="d-flex flex-column h-100">
    <Switch>
      <Route path="/login" render={() => <LoginForm />} />
      <Route
        exact
        path="/"
        render={() => {
          if (localStorage.token) {
            const { username } = localStorage;
            return (
              <UserNameProvider value={username}>
                <Chat />
              </UserNameProvider>
            );
          }
          return <Redirect push to="/login" />;
        }}
      />
      <Route path="*" render={() => <NoMatch />} />
    </Switch>
  </div>
);

export default App;
