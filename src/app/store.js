import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from '../features/chat/channels/channelsSlice.js';
import messagesReducer from '../features/chat/messages/messagesSlice.js';
import currentChannelIdReducer from '../features/chat/channels/currentChannelIdSlice.js';

export default (preloadedState = null) => {
  const store = configureStore({
    reducer: {
      channels: channelsReducer,
      messages: messagesReducer,
      currentChannelId: currentChannelIdReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    preloadedState,
  });

  return store;
};
