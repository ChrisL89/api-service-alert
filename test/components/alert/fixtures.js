const DEVICE_PAYLOAD = {
  venueId: '25',
  terminalId: '88',
  deviceId: '4',
  deviceType: 'EBT',
  wageringId: '3330F484-3C0A-4459-965C-A810B8AFA646'
};

const SEND_ALERT_PAYLOAD = {
  type: 'Critical',
  message: '$700 AML threshhold has been triggered by customer:123',
  component: 'AML',
  alertCode: 'C001',
  datetime: '2018-08-30T01:40:09.00Z',
  deviceInfo: DEVICE_PAYLOAD,
};

module.exports = {
  SEND_ALERT_PAYLOAD
};
