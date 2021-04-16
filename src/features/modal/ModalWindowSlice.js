// @ts-check

import { createSlice } from '@reduxjs/toolkit';

export const modalTypesMap = {
  idle: 'idle',
  adding: 'adding',
  renaming: 'renaming',
  removing: 'removing',
};

const slice = createSlice({
  name: 'modal',
  initialState: {
    isVisible: false,
    type: modalTypesMap.idle,
  },
  reducers: {
    // addChannel: (state, { payload: { channel } }) => { // eslint-disable-line
    //   state.push(channel);
    // },
    handleModal: (state, { payload: { modalConfig } }) => modalConfig, // Вожзможно лучше просто вернуть modalConfig
  },
});

export const { handleModal } = slice.actions;

export default slice.reducer;
