// @ts-check

import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'channels',
  initialState: {
    channels: [],
  },
  reducers: {
    addChannel: (state, { payload: { channel } }) => { // eslint-disable-line
      // TODO: logic
    },
  },
});

export const { addChannel } = slice.actions;

export default slice.reducer;
