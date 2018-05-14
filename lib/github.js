'use strict';

const GitHub = require('@octokit/rest');

const github = new GitHub({
  debug: process.env.NODE_ENV === 'development'
});

github.authenticate({
  type: 'token',
  token: process.env.GITHUB_TOKEN || 'xxxxxx'
});

module.exports = github;
