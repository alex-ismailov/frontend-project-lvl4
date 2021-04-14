// @ts-check

import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'channels',
  initialState: [],
  reducers: {
    addChannel: (state, { payload: { channel } }) => { // eslint-disable-line
      state.push(channel);
    },
    initChannels: (state, { payload: { channels } }) => channels,
  },
});

export const { addChannel, initChannels } = slice.actions;

export default slice.reducer;
