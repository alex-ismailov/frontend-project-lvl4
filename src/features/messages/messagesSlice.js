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
  },
});

export const { addNewMessage } = slice.actions;

export default slice.reducer;
