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
    toggleModal: (state, { payload: { modalConfig } }) => modalConfig,
  },
});

export const { toggleModal } = slice.actions;

export default slice.reducer;
