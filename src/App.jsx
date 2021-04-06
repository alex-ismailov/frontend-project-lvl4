// @ts-check

import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { addNewMessage } from './slices/messages.js';

import Channels from './components/Channels.jsx';
import MessageForm from './components/MessageForm.jsx';
import Messages from './components/Messages.jsx';

const App = ({ socket }) => {
  const { channels } = useSelector((state) => state.channels);
  const { currentChannelId } = useSelector((state) => state.currentChannelId);
  const { messages } = useSelector((state) => state.messages);
  const dispatch = useDispatch();

  socket.on('connect', () => {
    socket.on('newMessage', (arg) => {
      const {
        data: { attributes: message },
      } = arg;
      dispatch(addNewMessage({ message }));
    });
  });

  return (
    <Row className="h-100 pb-3">
      <Col xs={3} className="border-right">
        <Channels channels={channels} currentChannelId={currentChannelId} />
      </Col>
      <Col className="h-100">
        <div className="d-flex flex-column h-100">
          <Messages messages={messages} />
          <MessageForm currentChannelId={currentChannelId} />
        </div>
      </Col>
    </Row>
  );
};

export default App;
