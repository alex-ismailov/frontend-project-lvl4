import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from '../features/chat/channels/channelsSlice.js';
import messagesReducer from '../features/chat/messages/messagesSlice.js';
import currentChannelIdReducer from '../features/chat/channels/currentChannelIdSlice.js';
import modalReducer from '../features/modal/ModalWindowSlice.js';
import loadingReducer from './loadingSlice.js';

export default (preloadedState = {}) => {
  const store = configureStore({
    reducer: {
      channels: channelsReducer,
      messages: messagesReducer,
      currentChannelId: currentChannelIdReducer,
      modal: modalReducer,
      loading: loadingReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    preloadedState,
  });

  return store;
};
