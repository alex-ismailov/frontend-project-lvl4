// @ts-check
/* eslint no-param-reassign: 0 */

import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'currentChannelId',
  initialState: null,
  reducers: {
    setCurrentChannelId: (state, { payload: { channelId } }) => {
      state = channelId;
      return state;
    },
  },
});

export const { setCurrentChannelId } = slice.actions;

export default slice.reducer;
