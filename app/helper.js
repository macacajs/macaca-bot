'use strict';

const {
  fixedTimeComparison,
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

_.fixMarkdownImage = str => {
  const re = /(\[[\w\d\s]+\]\(.+(jpg|png|jpeg)\))/;
  return str.replace(re, '!$1');
};

// currently the only transformation is fixing markdown
// more post-translation transformations can be added here in the future
_.transformBody = str => {
  return _.fixMarkdownImage(str);
};

module.exports = _;
