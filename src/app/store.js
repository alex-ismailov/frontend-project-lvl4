import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from '../features/chat/channels/channelsSlice.js';
import messagesReducer from '../features/chat/messages/messagesSlice.js';
import currentChannelIdReducer from '../features/chat/channels/currentChannelIdSlice.js';
import modalReducer from '../features/modal/ModalWindowSlice.js';

export default () => {
  const store = configureStore({
    reducer: {
      channels: channelsReducer,
      messages: messagesReducer,
      currentChannelId: currentChannelIdReducer,
      modal: modalReducer,
    },
  });

  return store;
};
