import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './slices/channels.js';
import messagesReducer from './slices/messages.js';

import currentChannelIdReducer from './slices/currentChannelId.js';
import { UserNameProvider } from './context/UserNameContext.js';
import App from './App.jsx';

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

export default (gon, socket, userName) => {
  const preloadedState = normalize(gon);
  const store = configureStore({
    reducer: {
      channels: channelsReducer,
      messages: messagesReducer,
      currentChannelId: currentChannelIdReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    preloadedState,
  });

  return (
    <Provider store={store}>
      <UserNameProvider value={userName}>
        <App socket={socket} />
      </UserNameProvider>
    </Provider>
  );
};
