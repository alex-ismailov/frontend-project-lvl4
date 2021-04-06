// @ts-check

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import '../assets/application.scss';
// @ts-ignore
import gon from 'gon';
import ReactDOM from 'react-dom';
import { io } from 'socket.io-client';
import Cookies from 'js-cookie';
import faker from 'faker';
import init from './init.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

if (!Cookies.get('userName')) {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const randomNumber = faker.random.number(99);
  const fakeName = `${firstName}.${lastName}${randomNumber}`;
  Cookies.set('userName', fakeName, { expires: 30 });
}

const userName = Cookies.get('userName');
const socket = io();
const container = document.querySelector('#chat');

const vdom = init(gon, socket, userName);
ReactDOM.render(vdom, container);
