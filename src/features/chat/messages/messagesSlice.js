// @ts-check

import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    addNewMessage: (state, { payload: { messages } }) => {
      // @ts-ignore
      state.push(...messages);
    },
    initMessages: (state, { payload: { messages } }) => state.concat(messages),
  },
});

export const { addNewMessage, initMessages } = slice.actions;

export default slice.reducer;
