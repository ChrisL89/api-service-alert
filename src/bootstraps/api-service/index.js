'use strict';

const env = require('../../env');
const server = require('./server');
const log = require('../../log');
const publisher = require('../../publisher/publisher');
const util = require('util');

async function service(next) {
  const app = server.create();
  app.listen(env.apiServer.serverPort, next);

  log.info(`API Service is available at ${env.apiServer.publicUrl}:${env.apiServer.serverPort}`);

  //Initialize redis
  const createQueueAync = util.promisify(publisher.createQueue);
  try {
    await createQueueAync({qname: env.apiServer.redisQueueName});
    log.info('Redis queue has been created');
  } catch (err) {
    log.error('Failed to create redis queue', err);
  }
}

module.exports = service;
