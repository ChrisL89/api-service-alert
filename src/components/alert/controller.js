'use strict';
const Alert = require('../../model/alert');
const log = require('../../log');
const ApiError = require('../../utils/ApiError');
const publisher = require('../../publisher/publisher');
const env = require('../../env');

function sendAlert(req, res, next) {

  const body = req.body;

  try {
    if (typeof req.body !== 'object') {
      res.send(ApiError({
        code: ApiError.code.VALIDATION_ERROR,
        status: ApiError.status.VALIDATION_ERROR,
        message: 'Request body is not a valid JSON object'
      }));
      return next();
    }
    const alert = new Alert(req.body);

    log.info('Publishing message to redis');
    publisher.sendMessage({qname: env.apiServer.redisQueueName, message: JSON.stringify(alert)}, function (err, resp) {
      if (resp) {
        log.info(`Message sent. ID: ${resp} - Message: ${JSON.stringify(alert)}`);
      } else {
        log.error(`ERROR: ${err} - RESP: ${resp}`);
      }
    });
  } catch (e) {
    res.send(ApiError({
      code: ApiError.code.BAD_REQUEST_ERROR,
      status: ApiError.status.BAD_REQUEST_ERROR,
      message: 'Unknown error, not able to process request'
    }));
    return next();
  }
  res.send(`alert message sent with type: ${body.type}`);
  next();
}

module.exports = {
  sendAlert
};
