// @ts-check

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import '../assets/application.scss';
import ReactDOM from 'react-dom';
import { io } from 'socket.io-client';
import Rollbar from 'rollbar';
import init from './app/init.jsx';

const mode = process.env.NODE_ENV;

// eslint-disable-next-line
new Rollbar({
  accessToken: process.env.ROLLBAR_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
  enabled: mode === 'production',
});

if (mode !== 'production') {
  localStorage.debug = 'chat:*';
}

const socket = io();
// const vdom = await init(socket);
// const container = document.querySelector('#chat');

// ReactDOM.render(vdom, container);

const container = document.querySelector('#chat');
init(socket).then((vdom) => {
  ReactDOM.render(vdom, container);
});
