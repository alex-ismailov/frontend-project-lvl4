// @ts-check

import { createSlice } from '@reduxjs/toolkit';

export const loadingStatesMap = {
  idle: 'idle',
  loading: 'loading',
  success: 'success',
  failure: 'failure',
};

const slice = createSlice({
  name: 'loading',
  initialState: loadingStatesMap.idle,
  reducers: {
    setLoadingState: (state, { payload: { loadingState } }) => loadingState,
  },
});

export const { setLoadingState } = slice.actions;

export default slice.reducer;
