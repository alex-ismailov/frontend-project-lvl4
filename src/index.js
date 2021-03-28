// @ts-check

import 'core-js/stable';
import 'regenerator-runtime/runtime';

import '../assets/application.scss';

import gon from 'gon';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const container = document.querySelector('#chat');

ReactDOM.render(
  <App />,
  container,
);

// for dev mode, remove on prod
console.log('it works!');
console.log('gon', gon);
