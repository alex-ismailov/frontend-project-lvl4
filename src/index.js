// @ts-check

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import '../assets/application.scss';
import ReactDOM from 'react-dom';
import { io } from 'socket.io-client';
import init from './app/init.jsx';
import initRollbar from './rollbar.js';

initRollbar();

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const socket = io();
const vdom = init(socket);
const container = document.querySelector('#chat');

ReactDOM.render(vdom, container);
