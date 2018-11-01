'use strict';

const controller = require('./controller');

function register(apiRouter) {
  apiRouter.post({
    path: {
      name: 'alert',
      path: '/v1/api-service-alert/alert',
    },
    handlers: [controller.sendAlert]
  });
}

module.exports = {
  register,
};
