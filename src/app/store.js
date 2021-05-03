import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from '../features/chat/channels/channelsSlice.js';
import messagesReducer from '../features/chat/messages/messagesSlice.js';
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
