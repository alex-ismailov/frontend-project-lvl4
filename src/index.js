// @ts-check

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import '../assets/application.scss';
import ReactDOM from 'react-dom';
import { io } from 'socket.io-client';
import Rollbar from 'rollbar';
import init from './app/init.jsx';

const runApp = async () => {
  const mode = process.env.NODE_ENV;

  // eslint-disable-next-line
  const rollbar = new Rollbar({
    accessToken: process.env.ROLLBAR_TOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true,
    enabled: mode === 'production',
  });
  // log a generic message and send to rollbar
  rollbar.log('Test rollbar from heroku');
  console.log(`mode: ${mode}`);
  console.log(`process.env.ROLLBAR_TOKEN: ${process.env.ROLLBAR_TOKEN}`);

  if (mode !== 'production') {
    localStorage.debug = 'chat:*';
  }

  const socket = io();
  const vdom = await init(socket);
  const container = document.querySelector('#chat');

  ReactDOM.render(vdom, container);
};

runApp();
