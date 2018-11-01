'use strict';

const APILogger = require('@tabdigital/api-logger');
const pkg = require('../package.json');
const env = require('./env');

module.exports = new APILogger({
  level: env.log.logLevel,
  name: pkg.name
});
