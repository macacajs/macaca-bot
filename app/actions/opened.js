'use strict';

const translate = require('google-translate-api');

const _ = require('../helper');
const github = require('../github');

module.exports = async payload => {
  let {
    title,
    body,
  } = payload.issue;

  if (!_.containsChinese(title) && !_.containsChinese(body)) {
    return;
  }

  if (_.containsChinese(title)) {
    title = (await translate(title, {
      from: 'zh-CN',
      to: 'en',
    })).text;
  }

  if (_.containsChinese(body)) {
    body = (await translate(body.replace(/<!--[\w\W\r\n]*?-->/gmi, ''), {
      from: 'zh-CN',
      to: 'en',
    })).text;
  }

  const res = [
    'This is the translated issue:',
    '\n',
    '\n',
    '<hr/>',
    '\n',
    '\n',
    `# ${title}`,
    '\n',
    '\n',
    body,
  ];

  github.issues.createComment({
    owner: payload.repository.owner.login,
    repo: payload.repository.name,
    number: payload.issue.number,
    body: res.join(''),
  });
};

