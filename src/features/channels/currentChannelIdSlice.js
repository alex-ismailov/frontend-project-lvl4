// @ts-check

import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'currentChannelId',
  initialState: null,
  reducers: {
    addCurrentChannelId: (state, { payload: { currentChannelId } }) => { // eslint-disable-line
      // TODO: logic
    },
  },
});

export const { addCurrentChannelId } = slice.actions;

export default slice.reducer;
