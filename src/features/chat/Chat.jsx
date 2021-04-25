// @ts-check

import React, { useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
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
import ModalWindow from '../modal/ModalWindow.jsx';

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
    const response = await axios.get(routes.data(), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const { channels, messages, currentChannelId } = response.data;
    dispatch(setCurrentChannelId({ channelId: currentChannelId }));
    dispatch(initChannels({ channels }));
    dispatch(initMessages({ messages }));
  } catch (error) {
    console.log(error);
  }
};

const Chat = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData(dispatch);
  }, [dispatch]);

  return (
    <>
      <Header>
        <ExitButton />
      </Header>
      <Row className="d-flex flex-column flex-sm-row flex-grow-1 h-75 pb-3 row">
        <Col sm={3} className="border-right">
          <Channels />
        </Col>
        <Col>
          <div className="d-flex flex-column h-100">
            <Messages />
            <MessageForm />
          </div>
        </Col>
      </Row>
      <ModalWindow />
    </>
  );
};

export default Chat;
