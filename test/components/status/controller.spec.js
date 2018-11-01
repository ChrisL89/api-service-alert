const controller = require('../../../src/components/status/controller');
const sinon = require('sinon');

describe('controller', function () {
  const sandbox = sinon.createSandbox();
  let res, resSendSpy, nextSpy;

  beforeEach(function () {
    resSendSpy = sandbox.spy();
    res = {
      send: resSendSpy,
    };
    nextSpy = sandbox.spy();
  });

  afterEach(function () {
    sandbox.restore();
    sandbox.reset();
  });

  describe('status', function () {
    it('should send an appropriate response when status called', function () {
      controller.get({}, res, nextSpy);

      sinon.assert.calledOnce(resSendSpy);
      sinon.assert.calledWith(resSendSpy, sinon.match(200), sinon.match.has('code', 200));
      sinon.assert.calledOnce(nextSpy);
    });
  });

  describe('details', function () {
    it('should send an appropriate response when details called', function () {
      controller.details({}, res, nextSpy);

      sinon.assert.calledOnce(resSendSpy);
      const hostnameMatch = sinon.match.has('hostname', sinon.match.string);
      const componentMatch = sinon.match.has('components', sinon.match.has('api-service-alert', sinon.match.string)).and(hostnameMatch);
      sinon.assert.calledWith(resSendSpy, sinon.match(200), componentMatch);
      sinon.assert.calledOnce(nextSpy);
    });
  });
});
