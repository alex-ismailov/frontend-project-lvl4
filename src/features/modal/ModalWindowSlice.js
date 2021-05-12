// @ts-check
/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'modal',
  initialState: {
    isVisible: false,
    type: null,
    channelId: null,
  },
  reducers: {
    openModalWindow: (state, { payload }) => {
      payload.isVisible = true;
      return payload;
    },
    closeModalWindow: (state) => {
      state = { isVisible: false, type: null, channelId: null };
      return state;
    },
  },
});

export const { openModalWindow, closeModalWindow } = slice.actions;

export default slice.reducer;
