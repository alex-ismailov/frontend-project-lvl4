// @ts-check

import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Chat from '../features/chat/Chat.jsx';
import LoginForm from '../features/loginForm/LoginForm.jsx';
import NoMatch from '../features/noMatch/NoMatch.jsx';
import { UserNameProvider } from '../context/UserNameContext.js';

const App = () => (
  <div className="d-flex flex-column h-100">
    <nav className="mb-3 navbar navbar-expand-lg navbar-light bg-light">
      <a className="mr-auto navbar-brand" href="/">
        Hexlet Chat
      </a>
      {/* После авторизации здесь появляется кнопка выйти */}
      {/* { localStorage.token && <button type="button" className="btn btn-primary">Выйти</button>} */}
    </nav>
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
