// @ts-check

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { animateScroll as scroll } from 'react-scroll';

const Message = ({ message }) => {
  const { nickname, body } = message;
  return (
    <div className="text-break">
      <b>{nickname}</b>
      {`: ${body}`}
    </div>
  );
};

const Messages = () => {
  const currentChannelId = useSelector((state) => state.channelsInfo.currentChannelId);
  const messages = useSelector((state) => state.messages);
  const currentChannelMessages = messages.filter(
    ({ channelId }) => channelId === currentChannelId,
  );

  const scrollToBottom = () => scroll.scrollToBottom({
    containerId: 'messages-box',
    duration: 50,
    delay: 0,
    smooth: 'easeInOutQuart',
  });

  useEffect(() => {
    scrollToBottom();
  }, [currentChannelId, messages]);

  return (
    <div id="messages-box" className="chat-messages overflow-auto mb-3">
      {currentChannelMessages.map((message) => <Message key={message.id} message={message} />)}
    </div>
  );
};
export default Messages;
