'use strict';

const strummer = require('strummer');
const Device = require('./device');

const AlertMatcherFields = Object.freeze({
  type: new strummer.string(),
  message: new strummer.string(),
  component: new strummer.string(),
  alertCode: new strummer.string(),
  datetime: new strummer.isoDate(),
  deviceInfo: Device.matcher

});

const AlertMatcher = new strummer.object(AlertMatcherFields);

const AlertFields = Object.freeze(Object.keys(AlertMatcherFields));

class Alert {
  constructor(obj) {
    const unmatchedList = AlertMatcher.match(obj);
    if (unmatchedList.length > 0) {
      throw new Error('Cannot parse Alert object');
    }

    //get datetime object
    const datetime = obj.datetime instanceof Date ? obj.datetime : new Date(obj.datetime);

    //Assign object
    Object.assign(this, {
      type: String(obj.type),
      message: String(obj.message),
      component: String(obj.component),
      alertCode: String(obj.alertCode),
      //convert to timestamp
      timestamp: datetime.getTime(),
      deviceInfo: obj.deviceInfo instanceof Device ? obj.deviceInfo : new Device(obj.deviceInfo)
    });
  }
}

Alert.fields = AlertFields;
Alert.matcher = AlertMatcher;
Alert.matcherFields = AlertMatcherFields;

module.exports = Alert;