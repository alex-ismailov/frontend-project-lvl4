import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from '../features/channels/channelsSlice.js';
import messagesReducer from '../features/messages/messagesSlice.js';
import currentChannelIdReducer from '../features/channels/currentChannelIdSlice.js';

const normalize = (data) =>
  Object.entries(data).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: {
        [key]: value,
      },
    }),
    {}
  );

export default (initialData = null) => {
  const preloadedState = initialData ? normalize(initialData) : initialData;

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
