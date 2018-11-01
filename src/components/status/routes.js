'use strict';

const controller = require('./controller');

function register(apiRouter) {
  apiRouter.get({
    path: {
      name: 'status',
      path: '/v1/api-service-alert/status',
    },
    handlers: [controller.get]
  });

  apiRouter.get({
    path: {
      name: 'status-details',
      path: '/v1/api-service-alert/status/details',
    },
    handlers: [controller.details]
  });
}

module.exports = {
  register,
};