import React from 'react';
import { Provider } from 'react-redux';
import { io } from 'socket.io-client';
import { UserNameProvider } from '../context/UserNameContext.js';
import createStore from './store.js';
import App from './App.jsx';

export default (preloadedState, userName) => {
  const store = createStore(preloadedState);
  const socket = io();

  // Здесь надо как-то инициализировать контроллер,
  // который будет обновлять state.messages
  socket.on('newMessage', ({ data: { attributes } }) => {
    console.log(attributes);
    // импортированная функция из ...
    // которая диспатчит новое сообщение в state
  });

  return (
    <Provider store={store}>
      <UserNameProvider value={userName}>
        <App socket={socket} />
      </UserNameProvider>
    </Provider>
  );
};
