'use strict';

require('dotenv').config();

const configSchema = require('./config-schema');
const env = {
  version: {
    releaseVersion: process.env.RELEASE_VERSION,
  },
  log: {
    logFile: process.env.LOG_FILE,
    logLevel: process.env.LOG_LEVEL,
  },
  debug: {
    showStackTrace: process.env.SHOW_STACK_TRACE,
  }
};

env.apiServer = {
  //Main url for the web service endpoint
  publicUrl: process.env.PUBLIC_URL,
  //Web service port number
  serverPort: process.env.SERVER_PORT,
  redisHost: process.env.REDIS_HOST,
  redisPort: process.env.REDIS_PORT,
  //Redis queue name(queue used to store alert messages)
  redisQueueName: process.env.REDIS_QUEUE_NAME,
  //Redis queue name prefix
  redisNamespace: process.env.REDIS_NAMESPACE
};

const errors = configSchema.CONFIG.match(env);
if (errors.length > 0) {
  throw new Error(`Environment variable validation failed, error: ${JSON.stringify(errors)}`);
}

module.exports = env;