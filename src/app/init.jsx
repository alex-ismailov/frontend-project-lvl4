import React from 'react';
import { Provider } from 'react-redux';
import { UserNameProvider } from '../context/UserNameContext.js';
import App from './App.jsx';

export default (store, socket, userName) => (
  <Provider store={store}>
    <UserNameProvider value={userName}>
      <App socket={socket} />
    </UserNameProvider>
  </Provider>
);
