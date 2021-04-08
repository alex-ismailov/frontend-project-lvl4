import React from 'react';
import { useSelector } from 'react-redux';

const buildMessage = ({ id, nickname, body }) => (
  <div key={id} className="text-break">
    <b>{nickname}</b>: {body}
  </div>
);

const Messages = () => {
  const messages = useSelector((state) => state.messages);

  return (
    <div id="messages-box" className="chat-messages overflow-auto mb-3">
      {messages && messages.map(buildMessage)}
    </div>
  );
};
export default Messages;
