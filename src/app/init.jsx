import React from 'react';
import '../i18n.js';
import { Provider } from 'react-redux';
import { io } from 'socket.io-client';
import { BrowserRouter } from 'react-router-dom';
import { UserNameProvider } from '../context/UserNameContext.js';
import createStore from './store.js';
import { addNewMessage } from '../features/chat/messages/messagesSlice.js';
import App from './App.jsx';

export default (preloadedState, userName) => {
  const store = createStore(preloadedState);

  const socket = io();
  socket.on('newMessage', (arg) => {
    const {
      data: { attributes: message },
    } = arg;
    store.dispatch(addNewMessage({ message }));
  });

  return (
    <Provider store={store}>
      <UserNameProvider value={userName}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UserNameProvider>
    </Provider>
  );
};
