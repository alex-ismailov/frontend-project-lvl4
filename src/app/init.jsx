// @ts-check
/* eslint-disable react/destructuring-assignment */

import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { setLocale } from 'yup';
import i18n from '../i18n.js';
import createStore from './store.js';
import { addNewMessage } from '../features/chat/messages/messagesSlice.js';
import App from './App.jsx';
import { SocketProvider } from '../context/SocketContext.js';
import {
  addChannel,
  removeChannel,
  renameChannel,
} from '../features/chat/channels/channelsSlice.js';
import { setCurrentChannelId } from '../features/chat/channels/currentChannelIdSlice.js';
import yupDictionary from '../locales/yupDictionary.js';

export default (socket) => {
  const store = createStore();
  setLocale(yupDictionary);

  socket.on('newMessage', (message) => {
    store.dispatch(addNewMessage({ message }));
  });

  socket.on('newChannel', (channel) => {
    store.dispatch(addChannel({ channel }));
    store.dispatch(setCurrentChannelId({ channelId: channel.id }));
  });

  socket.on('removeChannel', ({ id }) => {
    store.dispatch(removeChannel({ id }));
    store.dispatch(setCurrentChannelId({ channelId: 1 }));
  });

  socket.on('renameChannel', (channel) => {
    store.dispatch(renameChannel({ channel }));
  });

  return (
    <Provider store={store}>
      <SocketProvider value={socket}>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </SocketProvider>
    </Provider>
  );
};
