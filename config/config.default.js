'use strict';

module.exports = appInfo => {
  const config = exports = {
    security: {
      csrf: {
        enable: false,
        ignoreJSON: true,
      },
    },
    multipart: {
      mode: 'file',
    },
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1541643285937_739';

  // add your config here
  config.middleware = [];

  return config;
};
