'use strict';

const rsmq = require('rsmq');
const env = require('../env');

const options = {
  host: env.apiServer.redisHost,
  port: env.apiServer.redisPort,
  ns: env.apiServer.redisNamespace
};

const RedisSMQ = new rsmq(options);

module.exports = RedisSMQ;
