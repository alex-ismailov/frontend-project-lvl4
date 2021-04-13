import React from 'react';
import { Row, Col } from 'react-bootstrap';
import _ from 'lodash';
import Channels from './channels/Channels.jsx';
import Messages from './messages/Messages.jsx';
import MessageForm from './messagesForm/MessageForm.jsx';

// const Chat = () => (
//   <Row className="flex-grow-1 h-75 pb-3">
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
// );

const Chat = () => {
  console.log(`rendering of <Chat/>: ${_.uniqueId()}`);
  return (
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
  );
};

export default Chat;

console.log(`rendering of LoginForm: ${_.uniqueId()}`);
