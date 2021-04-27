import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';

const buildMessage = ({ id, nickname, body }) => (
  <div key={id} className="text-break">
    <b>{nickname}</b>: {body}
  </div>
);

const Messages = () => {
  const currentChannelId = useSelector((state) => state.currentChannelId);
  const messages = useSelector((state) => state.messages);
  const currentChannelMessages = messages.filter(
    ({ channelId }) => channelId === currentChannelId
  );
  const messagesContainer = useRef();

  const scrolPageDown = () => {
    const scroll =
      messagesContainer.current.scrollHeight -
      messagesContainer.current.clientHeight;
    messagesContainer.current.scrollTo(0, scroll);
  };

  useEffect(() => {
    scrolPageDown();
  });

  return (
    <div
      ref={messagesContainer}
      id="messages-box"
      className="chat-messages overflow-auto mb-3"
    >
      {currentChannelMessages && currentChannelMessages.map(buildMessage)}
    </div>
  );
};
export default Messages;
