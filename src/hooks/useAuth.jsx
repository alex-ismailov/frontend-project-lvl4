// @ts-check

import { useContext } from 'react';

import authContext from '../context/authContext.jsx';

const useAuth = () => useContext(authContext);

export default useAuth;
