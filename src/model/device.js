'use strict';
const strummer = require('strummer');

const DeviceMatcherFields = Object.freeze({
  venueId: new strummer.string(),
  terminalId: new strummer.string(),
  deviceId: new strummer.string(),
  deviceType: new strummer.string(),
  wageringId: new strummer.string()
});

const DeviceMatcher = new strummer.objectWithOnly(DeviceMatcherFields);
const DeviceFields = Object.freeze(Object.keys(DeviceMatcherFields));

class Device {
  constructor(obj) {
    const unmatchedList = DeviceMatcher.match(obj);
    if (unmatchedList.length > 0) {
      throw new Error('Cannot parse Device information object');
    }
    Object.assign(this, {
      venueId: String(obj.venueId),
      terminalId: String(obj.terminalId),
      deviceId: String(obj.deviceId),
      deviceType: String(obj.deviceType),
      wageringId: String(obj.wageringId)
    });
  }

}

Device.fields = DeviceFields;
Device.matcher = DeviceMatcher;
Device.matcherFields = DeviceMatcherFields;

module.exports = Device;