// @ts-check

import { createSlice } from '@reduxjs/toolkit';
import { initChannels, removeChannel } from '../channelsInfo/channelsSlice.js';

const slice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    addNewMessage: (state, { payload: { message } }) => {
      state.push(message);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(removeChannel, (state, action) => {
        const { id } = action.payload;
        return state.filter((message) => message.channelId !== id);
      })
      .addCase(initChannels, (state, action) => {
        const { messages } = action.payload.data;
        state.push(...messages);
      });
  },
});

export const { addNewMessage } = slice.actions;

export default slice.reducer;
