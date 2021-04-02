// @ts-check
/* eslint no-param-reassign: 0 */

import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'text',
  initialState: {
    text: '',
  },
  reducers: {
    updateText: (state, { payload: { newText } }) => {
      state.text = newText;
    },
    // TODO: implement extraReducers: on addMessage
    // example =>
    // extraReducers: (builder) => {
    //   builder.addCase(tasksActions.addTask, (state) => {
    //     state.text = '';
    //   });
    // },
  },
});

export const { updateText } = slice.actions;

export default slice.reducer;
