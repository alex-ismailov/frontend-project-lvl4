import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addNewMessage } from './messagesSlice.js';

const buildMessage = ({ id, nickname, body }) => (
  <div key={id} className="text-break">
    <b>{nickname}</b>: {body}
  </div>
);

const Messages = ({ socket }) => {
  const { messages } = useSelector((state) => state.messages);
  const dispatch = useDispatch();

  socket.on('connect', () => {
    socket.on('newMessage', (arg) => {
      const {
        data: { attributes: message },
      } = arg;
      dispatch(addNewMessage({ message }));
    });
  });

  return (
    <div id="messages-box" className="chat-messages overflow-auto mb-3">
      {messages && messages.map(buildMessage)}
    </div>
  );
};
export default Messages;
