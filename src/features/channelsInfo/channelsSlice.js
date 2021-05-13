// @ts-check
/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const GENERAL_ID = 1;

const slice = createSlice({
  name: 'channelsInfo',
  initialState: {
    channels: [],
    currentChannelId: GENERAL_ID,
  },
  reducers: {
    addChannel: (state, { payload: { channel } }) => {
      state.channels.push(channel);
      state.currentChannelId = channel.id;
    },
    removeChannel: (state, { payload: { id } }) => {
      state.channels = state.channels.filter((channel) => channel.id !== id);
      state.currentChannelId = GENERAL_ID;
    },
    renameChannel: (state, { payload: { channel: changedСhannel } }) => {
      const { id, name } = changedСhannel;
      state.channels = state.channels
        .map((channel) => (channel.id === id ? { ...channel, name } : channel));
    },
    initChannels: (state, { payload: { data } }) => {
      const { channels, currentChannelId } = data;
      state.channels = channels;
      state.currentChannelId = currentChannelId;
    },
    setCurrentChannelId: (state, { payload: { channelId } }) => {
      state.currentChannelId = channelId;
    },
  },
});

export const {
  addChannel,
  removeChannel,
  renameChannel,
  initChannels,
  setCurrentChannelId,
} = slice.actions;

export default slice.reducer;
