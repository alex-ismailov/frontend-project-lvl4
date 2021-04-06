// @ts-check

import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'messages',
  initialState: {
    messages: [],
  },
  reducers: {
    addNewMessage: (state, { payload: { message } }) => {
      // @ts-ignore
      state.messages.push(message);
    },
  },
});

export const { addNewMessage } = slice.actions;

export default slice.reducer;
