'use strict';

function register(apiRouter) {
  require('./alert/routes').register(apiRouter);
  require('./status/routes').register(apiRouter);
}

module.exports = {
  register
};
