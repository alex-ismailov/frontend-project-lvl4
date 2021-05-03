// @ts-check

import React, { useEffect, useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import routes from '../common/routes.js';
import Channels from './channelsInfo/Channels.jsx';
import Messages from './messages/Messages.jsx';
import MessageForm from './messagesForm/MessageForm.jsx';
import Header from '../common/Header.jsx';
import { setCurrentChannelId, initChannels } from './channelsInfo/channelsSlice.js';
import { initMessages } from './messages/messagesSlice.js';
import ModalWindow from './modal/ModalWindow.jsx';
import useAuth from '../hooks/useAuth.jsx';

const Spinner = () => (
  <div className="h-100 d-flex justify-content-center align-items-center">
    <div className="spinner-border text-secondary" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);

const ExitButton = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const auth = useAuth();

  const handleLogOut = () => {
    // @ts-ignore
    auth.logOut();
    history.push('/');
  };

  return (
    <Button onClick={handleLogOut} variant="primary">
      {t('exit')}
    </Button>
  );
};

const Chat = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(routes.data(), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { channels, messages, currentChannelId } = response.data;
      // Надо сделать один вызов, а остальные части должны отработать
      // через extraReducers
      dispatch(setCurrentChannelId({ channelId: currentChannelId }));
      dispatch(initChannels({ channels }));
      dispatch(initMessages({ messages }));
      setIsLoading(false);
      // ************************************
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Header>
        <ExitButton />
      </Header>
      <Row className="d-flex flex-column flex-sm-row flex-grow-1 h-75 pb-3">
        <Col sm={3} className="border-right mb-1">
          <Channels />
        </Col>
        <Col className="h-100 overflow-auto pb-1">
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
