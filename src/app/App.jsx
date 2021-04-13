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

// const App = () => (
//   <div className="d-flex flex-column h-100">
//     <nav className="mb-3 navbar navbar-expand-lg navbar-light bg-light">
//       <a className="mr-auto navbar-brand" href="/">
//         Hexlet Chat
//       </a>
//       {/* После авторизации здесь появляется кнопка выйти */}
//     </nav>
//     <Router>
//       <Switch>
//         <Route exact path="/">
//           {/* <Chat /> */}
//           { localStorage.token ? <Chat /> : <Redirect push to="/login" /> }
//         </Route>
//         <Route path="/login">
//           <LoginForm />
//           {/* { localStorage.token ? <Chat /> : <Redirect to="/login" /> } */}
//         </Route>
//         <Route path="*">
//           <NoMatch />
//         </Route>
//       </Switch>
//     </Router>
//   </div>
// );

const App = () => {
  console.log(localStorage);

  return (
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
            {/* <Chat /> */}
            {localStorage.token ? <Chat /> : <Redirect push to="/login" />}
          </Route>
          <Route path="/login">
            <LoginForm />
            {/* { localStorage.token ? <Chat /> : <Redirect to="/login" /> } */}
          </Route>
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
