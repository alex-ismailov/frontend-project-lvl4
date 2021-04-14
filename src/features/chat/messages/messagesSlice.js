// @ts-check

import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    addNewMessage: (state, { payload: { message } }) => {
      // @ts-ignore
      state.push(message);
    },
    initMessages: (state, { payload: { messages } }) => messages,
  },
});

export const { addNewMessage, initMessages } = slice.actions;

export default slice.reducer;
