// @ts-check

import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'messages',
  initialState: {
    messages: [],
  },
  reducers: {
    addMessage: (state, { payload: { message } }) => { // eslint-disable-line
      // TODO: logic
    },
  },
});

export const { addMessage } = slice.actions;

export default slice.reducer;
