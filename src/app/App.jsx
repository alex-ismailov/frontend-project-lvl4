// @ts-check

import React from 'react';
import { Row, Col } from 'react-bootstrap';

import Channels from '../features/channels/Channels.jsx';
import MessageForm from '../features/messagesForm/MessageForm.jsx';
import Messages from '../features/messages/Messages.jsx';

const App = () => (
  <Row className="h-100 pb-3">
    <Col xs={3} className="border-right">
      <Channels />
    </Col>
    <Col className="h-100">
      <div className="d-flex flex-column h-100">
        <Messages />
        <MessageForm />
      </div>
    </Col>
  </Row>
);

export default App;
