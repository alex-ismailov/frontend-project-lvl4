import React from 'react';

const buildMessage = ({ id, nickname, body }) => (
  <div key={id} className="text-break">
    <b>{nickname}</b>: {body}
  </div>
);

const Messages = ({ messages }) => (
  <div id="messages-box" className="chat-messages overflow-auto mb-3">
    {messages && messages.map(buildMessage)}
  </div>
);

export default Messages;
