// @ts-check

import { createSlice } from '@reduxjs/toolkit';
import { removeChannel } from '../channels/channelsSlice.js';

const slice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    addNewMessage: (state, { payload: { message } }) => {
      state.push(message);
    },
    initMessages: (state, { payload: { messages } }) => messages,
  },
  extraReducers: (builder) => {
    builder.addCase(removeChannel, (state, action) => {
      const { id } = action.payload;
      return state.filter((message) => message.channelId !== id);
    });
  },
});

export const { addNewMessage, initMessages } = slice.actions;

export default slice.reducer;
