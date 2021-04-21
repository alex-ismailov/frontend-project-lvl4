// @ts-check

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import '../assets/application.scss';
// @ts-ignore
// import gon from 'gon';
import ReactDOM from 'react-dom';
import init from './app/init.jsx';
import initRollbar from './rollbar.js';

initRollbar();

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const container = document.querySelector('#chat');

const vdom = init();

ReactDOM.render(vdom, container);
