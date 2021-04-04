// @ts-check

import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import Channels from './components/Channels.jsx';
import Chat from './components/Chat.jsx';

const App = () => {
  const channels = useSelector((state) => state.channels);
  const currentChannelId = useSelector((state) => state.currentChannelId);

  return (
    <Row className="h-100 pb-3">
      <Col xs={3} className="border-right">
        <Channels channels={channels} currentChannelId={currentChannelId} />
      </Col>
      <Col className="h-100">
        <Chat />
      </Col>
    </Row>
  );
};

export default App;
