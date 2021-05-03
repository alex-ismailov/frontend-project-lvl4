// @ts-check

import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'channelsInfo',
  initialState: {
    channels: [],
    currentChannelId: 1,
  },
  reducers: {
    addChannel: (state, { payload: { channel } }) => {
      state.channels.push(channel);
    },
    removeChannel: (state, { payload: { id } }) => {
      state.channels = state.channels.filter((channel) => channel.id !== id);
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
    // extraReducers: (builder) => {
    //   builder
    //     .addCase(addChannel, (state, action) => {
    //       const { id } = action.payload.channel;
    //       console.log(action);
    //       // state.currentChannelId = id;
    //       // return state;
    //     })
    //     .addCase(removeChannel, (state) => {
    //       // state.currentChannelId = 1;
    //       // return state;
    //     });
    // },
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
