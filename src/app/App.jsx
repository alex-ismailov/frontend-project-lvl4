// @ts-check

import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Chat from '../features/chat/Chat.jsx';
import LoginForm from '../features/loginForm/LoginForm.jsx';

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
          <Chat />
        </Route>
        <Route path="/login">
          <LoginForm />
        </Route>
      </Switch>
    </Router>
  </div>
);

export default App;

// Раньше Легаси код стартовал с этого
// <Row className="h-100 pb-3">
//     <Col xs={3} className="border-right">
//       <Channels />
//     </Col>
//     <Col className="h-100">
//       <div className="d-flex flex-column h-100">
//         <Messages />
//         <MessageForm />
//       </div>
//     </Col>
//   </Row>
