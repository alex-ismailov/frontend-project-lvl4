// @ts-check

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import '../assets/application.scss';
// @ts-ignore
import gon from 'gon';
import ReactDOM from 'react-dom';
import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './slices/channels.js';
import messagesReducer from './slices/messages.js';
import currentChannelIdReducer from './slices/currentChannelId.js';
import init from './init.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

// *****************************************
// src/index.js В случае с реактом это не просто вызов функции, а полноценное монтирование.
// Также все зависимости можно заводить здесь (rollbar, i18n, store) и прокидывать в аппу
// init.jsx - задача этого файла вернуть кусок jsx который надо будет рендерить

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

const vdom = init(store);
ReactDOM.render(vdom, container);
