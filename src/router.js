'use strict';

const apiRouter = require('@tabdigital/connect-router');
const components = require('./components');
const swagger = require('./swagger');
const env = require('./env');

const create = server => {
  const router = apiRouter();
  registerDiscovery(router);
  registerSwaggerRoutes(router);
  components.register(router, server);
  return router;
};

function registerSwaggerRoutes(router) {
  router.get({
    name: 'swagger-json',
    path: '/swagger.json',
    handlers: [(req, res) => res.send(toSwagger())],
  });
}

function registerDiscovery(router) {
  router.get({
    name: 'discovery',
    path: '/v1/api-service-alert',
    cache: 60,
    handlers: [(req, res, next) => {
      const body = {
        _links: {
          'api-service-alert:alert': `${env.apiServer.publicUrl}/v1/api-service-alert/alert`,
        }
      };
      res.send(body);
      next();
    }],
  });
}

function toSwagger() {
  const router = apiRouter();
  registerDiscovery(router);
  components.register(router);
  return router.toSwagger(swagger.info);
}

module.exports = {
  create,
};
