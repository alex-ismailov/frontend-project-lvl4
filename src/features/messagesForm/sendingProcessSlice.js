// @ts-check

import { createSlice } from '@reduxjs/toolkit';
import sendingStateMap from './sendingStateMap.js';

const slice = createSlice({
  name: 'sendingProcess',
  initialState: sendingStateMap.idle,
  reducers: {
    handleSendingProcess: (state, { payload: { sendingState } }) => {
      console.log('DOMAIN DATA');
      console.log(state, sendingState);
      // state = sendingState;
    },
  },
});

export const { handleSendingProcess } = slice.actions;

export default slice.reducer;
