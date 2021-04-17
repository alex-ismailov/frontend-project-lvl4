import React from 'react';
import '../i18n.js';
import { Provider } from 'react-redux';
import { io } from 'socket.io-client';
import { BrowserRouter } from 'react-router-dom';
import { setLocale } from 'yup';
import createStore from './store.js';
import { addNewMessage } from '../features/chat/messages/messagesSlice.js';
import App from './App.jsx';
import { SocketProvider } from '../context/SocketContext.js';
import { addChannel } from '../features/chat/channels/channelsSlice.js';
import { setCurrentChannelId } from '../features/chat/channels/currentChannelIdSlice.js';
import yupDictionary from '../locales/yupDictionary.js';

export default (preloadedState = {}) => {
  const store = createStore(preloadedState);

  setLocale(yupDictionary);

  const socket = io();
  socket.on('newMessage', (message) => {
    store.dispatch(addNewMessage({ message }));
  });

  socket.on('newChannel', (channel) => {
    store.dispatch(addChannel({ channel }));
    store.dispatch(setCurrentChannelId({ channelId: channel.id }));
  });

  return (
    <Provider store={store}>
      <BrowserRouter>
        <SocketProvider value={socket}>
          <App />
        </SocketProvider>
      </BrowserRouter>
    </Provider>
  );
};
