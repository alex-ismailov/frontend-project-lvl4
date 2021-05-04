// @ts-check

import { useContext } from 'react';

import socketContext from '../context/socketContext.js';

const useSocket = () => useContext(socketContext);

export default useSocket;
