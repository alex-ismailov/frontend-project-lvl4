// @ts-check

import React from 'react';
import { useSelector } from 'react-redux';

import {
  Row, Col,
} from 'react-bootstrap';

import Channels from './components/Channels.jsx';
import Chat from './components/Chat.jsx';

const App = () => {
  // @ts-ignore
  const channels = useSelector((state) => state.channels);
  // @ts-ignore
  const currentChannelId = useSelector((state) => state.currentChannelId);

  return (
    <Row className="h-100 pb-3">
      <Col xs={3} className="border-right">
        <Channels
          channels={channels}
          currentChannelId={currentChannelId}
        />
      </Col>
      <Col className="h-100">
        <Chat />
      </Col>
    </Row>
  );
};

export default App;
