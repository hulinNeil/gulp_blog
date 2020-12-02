const errMsg = {
  200: 'success',
  404: 'not found',
  10000: 'service internal error',
  10001: 'the code has expired',
  10003: 'the phone/email is exist',
  10004: 'failed to send OTP',
  10005: 'login has expired',
  10006: 'building info data acquisition failure',
  10007: 'missing uuid parameter',
  10008: 'The start time and end time are invalid',
  10009: 'key is invalid',
  10010: 'failed to create visitor',
  10011: 'failed to get last visit record',
};

const errCode = {
  success: 200,
  noFound: 404,
  innerError: 10000,
  codeExpireError: 10001,
  addPassportError: 10002,
  phoneNumberError: 10003,
  OTPError: 10004,
  loginError: 10005,
  acquisitionDataError: 10006,
  lossUuidError: 10007,
  timeError: 10008,
  keyError: 10009,
  addVisitorError: 10010,
  getLastVisitError: 10011,
};

export { errCode, errMsg };
