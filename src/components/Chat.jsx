import React from 'react';
import MessageForm from './MessageForm.jsx';
import Messages from './Messages.jsx';

const Chat = () => (
  // const { handleInputText, text } = props;

  <div className="d-flex flex-column h-100">
    <Messages />
    <MessageForm />
  </div>
);
export default Chat;
