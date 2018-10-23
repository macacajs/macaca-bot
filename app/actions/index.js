'use strict';

const openedAction = require('./opened');
const createdAction = require('./created');

module.exports = async ctx => {
  const body = ctx.request.body;

  /*
   * body.action
   *
   * closed: issue closed
   * reopened: issue reopened
   * opened: issue opened
   * created: commend created
   * labeled: issue labeled
   * assigned: issue assigned
   * unassigned: issue assigned
   */
  switch (body.action) {
    case 'opened':
      await openedAction(body);
      break;
    case 'created':
      await createdAction(body);
      break;
    default:
      break;
  }
};

