// @ts-check

import { createSlice } from '@reduxjs/toolkit';
import sendingStateMap from './sendingStateMap.js';

const slice = createSlice({
  name: 'sendingProcessError',
  initialState: sendingStateMap.idle,
  reducers: {
    handleSendingProcessError: (state, { payload: { sendingStateError } }) => {
      // state = sendingStateError;
      console.log(state);
      console.log(sendingStateError);
    },
  },
});

export const { handleSendingProcessError } = slice.actions;

export default slice.reducer;
