// @ts-check

import { createSlice } from '@reduxjs/toolkit';

const GENERAL_ID = 1;

const slice = createSlice({
  name: 'channelsInfo',
  initialState: {
    channels: [],
    currentChannelId: 1,
  },
  reducers: {
    addChannel: (state, { payload: { channel } }) => {
      state.channels.push(channel);
      state.currentChannelId = channel.id;
      return state;
    },
    removeChannel: (state, { payload: { id } }) => {
      state.channels = state.channels.filter((channel) => channel.id !== id);
      state.currentChannelId = GENERAL_ID;
      return state;
    },
    renameChannel: (state, { payload: { channel: changedСhannel } }) => {
      const { id, name } = changedСhannel;
      state.channels = state.channels
        .map((channel) => (channel.id === id ? { ...channel, name } : channel));
      return state;
    },
    initChannels: (state, { payload: { channels } }) => {
      state.channels = channels;
      return state;
    },
    setCurrentChannelId: (state, { payload: { channelId } }) => {
      state.currentChannelId = channelId;
      return state;
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
