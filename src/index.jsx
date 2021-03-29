// @ts-check

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import '../assets/application.scss';

import React from 'react';
import ReactDOM from 'react-dom';

// @ts-ignore
import gon from 'gon';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './slices/channels.js';
import messagesReducer from './slices/messages.js';
import currentChannelIdReducer from './slices/currentChannelId.js';

import App from './App.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const preloadedState = { ...gon };
const store = configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
    currentChannelId: currentChannelIdReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  preloadedState,
});

const container = document.querySelector('#chat');

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  container,
);
