'use strict';

const strummer = require('strummer');

const CONFIG = new strummer.object({
  version: {
    releaseVersion: strummer.string({optional: true})
  },
  log: {
    logFile: strummer.string({optional: true}),
    logLevel: strummer.string({optional: true})
  },
  debug: {
    showStackTrace: strummer.string()
  },
  apiServer: {
    publicUrl: strummer.string(),
    serverPort: strummer.number({parse: true}),
    redisHost: strummer.string(),
    redisPort: strummer.number({parse: true}),
    redisQueueName: strummer.string(),
    redisNamespace: strummer.string()
  }
});

module.exports = {
  CONFIG
};
