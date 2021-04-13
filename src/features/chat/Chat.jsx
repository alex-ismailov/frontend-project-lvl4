import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import _ from 'lodash';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Channels from './channels/Channels.jsx';
import Messages from './messages/Messages.jsx';
import MessageForm from './messagesForm/MessageForm.jsx';
import Header from '../../common/Header.jsx';

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

const Chat = () => {
  console.log(`rendering of <Chat/>: ${_.uniqueId()}`);
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

console.log(`rendering of LoginForm: ${_.uniqueId()}`);
