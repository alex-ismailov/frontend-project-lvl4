// @ts-check

import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Chat from '../features/chat/Chat.jsx';
import LoginForm from '../features/loginForm/LoginForm.jsx';
import NoMatch from '../features/noMatch/NoMatch.jsx';

const isLoggedIn = () => {
  const res = !!localStorage.getItem('token');
  console.log(res);
  return res;
};
// const isLoggedIn = () => {
//   console.log('isLoggedIn works');
//   return false;
// };

const App = () => (
  <div className="d-flex flex-column h-100">
    <nav className="mb-3 navbar navbar-expand-lg navbar-light bg-light">
      <a className="mr-auto navbar-brand" href="/">
        Hexlet Chat
      </a>
      {/* После авторизации здесь появляется кнопка выйти */}
    </nav>
    <Router>
      <Switch>
        <Route exact path="/">
          {isLoggedIn() ? <Chat /> : <Redirect to="/login" />}
        </Route>
        <Route path="/login">
          <LoginForm />
          {/* {isLoggedIn() ? <Redirect to="/"/> : <LoginForm /> } */}
        </Route>
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </Router>
  </div>
);

export default App;
