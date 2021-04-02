// @ts-check

import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { updateText } from './slices/text.js';

import Channels from './components/Channels.jsx';
import Chat from './components/Chat.jsx';

const App = () => {
  const channels = useSelector((state) => state.channels);
  const currentChannelId = useSelector((state) => state.currentChannelId);
  const { text } = useSelector((state) => state.text);
  const dispatch = useDispatch();

  const handleInputText = ({ target: { value } }) => {
    dispatch(updateText({ newText: value }));
  };

  return (
    <Row className="h-100 pb-3">
      <Col xs={3} className="border-right">
        <Channels channels={channels} currentChannelId={currentChannelId} />
      </Col>
      <Col className="h-100">
        <Chat handleInputText={handleInputText} text={text} />
      </Col>
    </Row>
  );
};

export default App;
