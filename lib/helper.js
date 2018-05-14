'use strict';

const {
  fixedTimeComparison
} = require('cryptiles');
const util = require('xutil');
const crypto = require('crypto');

const _ = util.merge({}, util);

_.verifySignature = (sign, rawBody) => {
  const signature = crypto
    .createHmac('sha1', process.env.SECRET_TOKEN)
    .update(rawBody)
    .digest('hex');
  return fixedTimeComparison(`sha1=${signature}`, sign);
};

_.containsChinese = str => {
  return /[\u4e00-\u9fa5]/.test(str);
};

module.exports = _;
