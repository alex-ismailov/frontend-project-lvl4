// @ts-check

import React, { useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import _ from 'lodash';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import routes from '../../common/routes.js';
import Channels from './channels/Channels.jsx';
import Messages from './messages/Messages.jsx';
import MessageForm from './messagesForm/MessageForm.jsx';
import Header from '../../common/Header.jsx';
import { setCurrentChannelId } from './channels/currentChannelIdSlice.js';
import { initChannels } from './channels/channelsSlice.js';
import { initMessages } from './messages/messagesSlice.js';

const ExitButton = () => {
  const { t } = useTranslation();
  const history = useHistory();

  const handleClick = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <Button onClick={handleClick} variant="primary">
      {t('exit')}
    </Button>
  );
};

const fetchData = async (dispatch) => {
  const token = localStorage.getItem('token');
  try {
    const res = await axios.get(routes.data(), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const { channels, messages, currentChannelId } = res.data;
    dispatch(setCurrentChannelId({ channelId: currentChannelId }));
    dispatch(initChannels({ channels }));
    dispatch(initMessages({ messages }));
  } catch (error) {
    console.log(error);
  }
};

const Chat = () => {
  console.log(`rendering of <Chat/>: ${_.uniqueId()}`);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData(dispatch);
  }, [dispatch]);

  return (
    <>
      <Header render={() => <ExitButton />} />
      <Row className="flex-grow-1 h-75 pb-3">
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
    </>
  );
};

export default Chat;

// console.log(`rendering of LoginForm: ${_.uniqueId()}`);
