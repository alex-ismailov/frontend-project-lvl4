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
    initChannels: (state, { payload: { channels } }) => channels,
  },
});

export const { addChannel, removeChannel, initChannels } = slice.actions;

export default slice.reducer;
