// @ts-check
/* eslint implicit-arrow-linebreak: 0 */

const host = '';
const prefix = 'api/v1';

export default {
  channelsPath: () => [host, prefix, 'channels'].join('/'),
  channelPath: (id) => [host, prefix, 'channels', id].join('/'),
  channelMessagesPath: (id) =>
    [host, prefix, 'channels', id, 'messages'].join('/'),
  loginPath: () => [host, prefix, 'login'].join('/'),
  data: () => [host, prefix, 'data'].join('/'), // /api/v1/data
};
