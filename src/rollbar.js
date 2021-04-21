import Rollbar from 'rollbar';

export default () =>
  new Rollbar({
    accessToken: 'f80df8e493384bfca8fb6a00025e0fe8',
    captureUncaught: true,
    captureUnhandledRejections: true,
  });
