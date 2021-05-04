// @ts-check

import { useContext } from 'react';

import authContext from '../context/authContext.js';

const useAuth = () => useContext(authContext);

export default useAuth;
