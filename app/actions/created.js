'use strict';

const translate = require('google-translate-api');

const _ = require('../helper');
const github = require('../github');
const pkg = require('../../package');

module.exports = async payload => {
  let {
    body,
    user,
  } = payload.comment;

  if (user.login === pkg.name) {
    return;
  }

  if (!_.containsChinese(body)) {
    return;
  }

  body = (await translate(body.replace(/<!--[\w\W\r\n]*?-->/gmi, ''), {
    from: 'zh-CN',
    to: 'en',
  })).text;

  const res = [
    `This is the translated issue comment: @${user.login}`,
    '\n',
    '\n',
    '<hr/>',
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

