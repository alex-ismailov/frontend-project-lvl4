// @ts-check
/* eslint-disable react/destructuring-assignment */

import React from 'react';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider } from 'react-redux';
import { setLocale } from 'yup';

import _ from 'lodash';
import resources from '../locales/index.js';
import i18n from '../i18n.js';
import createStore from './store.js';
import { addNewMessage } from '../features/messages/messagesSlice.js';
import App from './App.jsx';
import SocketContext from '../context/SocketContext.js';
import {
  addChannel,
  removeChannel,
  renameChannel,
} from '../features/channelsInfo/channelsSlice.js';
import yupDictionary from '../locales/yupDictionary.js';
import authContext from '../context/authContext.jsx';

export default async (socket) => {
  const store = createStore();
  setLocale(yupDictionary);

  const i18nInstance = i18n.createInstance();
  await i18nInstance
    .use(initReactI18next)
    .init({
      lng: 'ru',
      resources,
      keySeparator: false,
      interpolation: {
        escapeValue: false,
      },
    });

  socket.on('newMessage', (message) => {
    store.dispatch(addNewMessage({ message }));
  });

  socket.on('newChannel', (channel) => {
    store.dispatch(addChannel({ channel }));
  });

  socket.on('removeChannel', ({ id }) => {
    store.dispatch(removeChannel({ id }));
  });

  socket.on('renameChannel', (channel) => {
    store.dispatch(renameChannel({ channel }));
  });

  const SocketProvider = ({ children }) => {
    const sendMessage = (message) => socket.emit('newMessage', message, () => {});
    const addChannel = (channel) => socket.emit('newChannel', channel, () => {});
    const removeChannel = (channel) => socket.emit('removeChannel', channel, () => {});
    const renameChannel = (channel) => socket.emit('renameChannel', channel, () => {});

    return (
      <SocketContext.Provider value={{
        sendMessage, addChannel, removeChannel, renameChannel,
      }}
      >
        {children}
      </SocketContext.Provider>
    );
  };

  const AuthProvider = ({ children }) => {
    const getToken = () => localStorage.getItem('token');

    const isLoggedIn = () => _.has(localStorage, 'token');

    const logIn = (token, username) => {
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
    };

    const logOut = () => {
      localStorage.removeItem('username');
      localStorage.removeItem('token');
    };

    return (
      <authContext.Provider value={{
        getToken, isLoggedIn, logIn, logOut,
      }}
      >
        {children}
      </authContext.Provider>
    );
  };

  return (
    <Provider store={store}>
      <SocketProvider>
        <I18nextProvider i18n={i18nInstance}>
          <AuthProvider>
            <App />
          </AuthProvider>
        </I18nextProvider>
      </SocketProvider>
    </Provider>
  );
};
