import React from 'react';
import '../i18n.js';
import { Provider } from 'react-redux';
import { io } from 'socket.io-client';
import { BrowserRouter } from 'react-router-dom';
import createStore from './store.js';
import { addNewMessage } from '../features/chat/messages/messagesSlice.js';
import App from './App.jsx';
import { SocketProvider } from '../context/SocketContext.js';

export default (preloadedState = {}) => {
  const store = createStore(preloadedState);

  const socket = io();
  socket.on('newMessage', (message) => {
    store.dispatch(addNewMessage({ message }));
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
