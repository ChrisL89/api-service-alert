const controller = require('../../../src/components/alert/controller');
const sinon = require('sinon');
const fixtures = require('./fixtures');

describe('controller', function () {
  const sandbox = sinon.createSandbox();
  let res, resSendSpy, nextSpy;
  const sendAlertReq = {
    body: fixtures.SEND_ALERT_PAYLOAD,
  };

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

  describe('sendAlert', function () {
    const invalidReq = { body: 'invalide json object' };

    it('should throw an error when request body is not a valid json', function () {
      controller.sendAlert(invalidReq, res, nextSpy);
      sinon.assert.calledOnce(resSendSpy);
      sinon.assert.calledWith(resSendSpy, sinon.match.has('code', 'VALIDATION_ERROR').and(sinon.match.has('status', 503)).and(sinon.match.has('message', 'Request body is not a valid JSON object')));
      sinon.assert.calledOnce(nextSpy);
    });

    it('should send a alert message', function () {
      controller.sendAlert(sendAlertReq, res, nextSpy);
      sinon.assert.calledOnce(resSendSpy);
      sinon.assert.calledWith(resSendSpy, 'alert message sent with type: Critical');
      sinon.assert.calledOnce(nextSpy);
    });
  });
});
