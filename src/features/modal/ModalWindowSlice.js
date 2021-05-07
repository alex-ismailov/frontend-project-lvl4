// @ts-check

import { createSlice } from '@reduxjs/toolkit';

export const modalTypesMap = {
  idle: 'idle',
  adding: 'adding',
  renaming: 'renaming',
  removing: 'removing',
};

export const buildModalConfig = (
  isVisible,
  type = null,
  channelId = null,
) => ({
  isVisible,
  type,
  channelId,
});

const slice = createSlice({
  name: 'modal',
  initialState: {
    isVisible: false,
    type: null,
    channelId: null,
  },
  reducers: {
    toggleModal: (state, { payload: { modalConfig } }) => modalConfig,
  },
});

export const { toggleModal } = slice.actions;

export default slice.reducer;
