// @ts-check

import { useContext } from 'react';

import SocketContext from '../context/SocketContext.js';

const useSocket = () => useContext(SocketContext);

export default useSocket;
