// @ts-check
/* eslint-disable react/destructuring-assignment */

import React from 'react';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider } from 'react-redux';
import { setLocale } from 'yup';

import resources from '../locales/index.js';
import i18n from '../i18n.js';
import createStore from './store.js';
import { addNewMessage } from '../features/messages/messagesSlice.js';
import App from './App.jsx';
import { SocketProvider } from '../context/SocketContext.js';
import {
  addChannel,
  removeChannel,
  renameChannel,
} from '../features/channelsInfo/channelsSlice.js';
import yupDictionary from '../locales/yupDictionary.js';

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

  return (
    <Provider store={store}>
      <SocketProvider value={socket}>
        <I18nextProvider i18n={i18nInstance}>
          <App />
        </I18nextProvider>
      </SocketProvider>
    </Provider>
  );
};
