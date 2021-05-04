// @ts-check

import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from '../features/channelsInfo/channelsSlice.js';
import messagesReducer from '../features/messages/messagesSlice.js';
import modalReducer from '../features/modal/ModalWindowSlice.js';

export default () => {
  const store = configureStore({
    reducer: {
      channelsInfo: channelsReducer,
      messages: messagesReducer,
      modal: modalReducer,
    },
  });

  return store;
};
