// @ts-check

import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'channels',
  initialState: [],
  reducers: {
    addChannel: (state, { payload: { channel } }) => {
      state.push(channel);
    },
    removeChannel: (state, { payload: { id } }) =>
      state.filter((channel) => channel.id !== id),
    renameChannel: (state, { payload: { channel: changedСhannel } }) => {
      const { id, name } = changedСhannel;
      return state.map((channel) =>
        channel.id === id ? { ...channel, name } : channel
      );
    },
    initChannels: (state, { payload: { channels } }) => channels,
  },
});

export const {
  addChannel,
  removeChannel,
  renameChannel,
  initChannels,
} = slice.actions;

export default slice.reducer;
