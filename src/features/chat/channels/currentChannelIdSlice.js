// @ts-check
/* eslint no-param-reassign: 0 */

import { createSlice } from '@reduxjs/toolkit';
import { addChannel, removeChannel } from './channelsSlice';

const slice = createSlice({
  name: 'currentChannelId',
  initialState: null,
  reducers: {
    setCurrentChannelId: (state, { payload: { channelId } }) => {
      state = channelId;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addChannel, (state, action) => {
        const { id } = action.payload.channel;
        state = id;
        return state;
      })
      .addCase(removeChannel, (state) => {
        state = 1;
        return state;
      });
  },
});

export const { setCurrentChannelId } = slice.actions;

export default slice.reducer;
