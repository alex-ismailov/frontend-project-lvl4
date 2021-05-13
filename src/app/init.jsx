// @ts-check
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-shadow */

import React from 'react';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider } from 'react-redux';
import * as yup from 'yup';
import _ from 'lodash';
import i18n from 'i18next';
import resources from '../locales/index.js';
import createStore from './store.js';
import { addNewMessage } from '../features/messages/messagesSlice.js';
import App from './App.jsx';
import socketContext from '../context/socketContext.js';
import {
  addChannel,
  removeChannel,
  renameChannel,
} from '../features/channelsInfo/channelsSlice.js';
import yupDictionary from '../locales/yupDictionary.js';
import authContext from '../context/authContext.js';

export default async (socket) => {
  const store = createStore();
  yup.setLocale(yupDictionary);

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
    const sendMessage = (message) => {
      if (socket.disconnected) {
        throw new Error('networkError');
      }
      socket.emit('newMessage', message, _.noop);
    };

    const addChannel = (channel) => {
      if (socket.disconnected) {
        throw new Error('networkError');
      }
      socket.emit('newChannel', channel, _.noop);
    };

    const removeChannel = (channel) => {
      if (socket.disconnected) {
        throw new Error('networkError');
      }
      socket.emit('removeChannel', channel, _.noop);
    };

    const renameChannel = (channel) => {
      if (socket.disconnected) {
        throw new Error('networkError');
      }
      socket.emit('renameChannel', channel, _.noop);
    };

    return (
      <socketContext.Provider value={{
        sendMessage, addChannel, removeChannel, renameChannel,
      }}
      >
        {children}
      </socketContext.Provider>
    );
  };

  const AuthProvider = ({ children }) => {
    const getToken = () => localStorage.getItem('token');
    const getUsername = () => localStorage.getItem('username');
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
        getToken, getUsername, isLoggedIn, logIn, logOut,
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
