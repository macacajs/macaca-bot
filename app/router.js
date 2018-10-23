'use strict';

const _ = require('./helper');
const actionsHandle = require('./actions');

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router } = app;
  router
    .get('/', ctx => {
      ctx.body = 'Macaca bot';
    })
    .post('*', async ctx => {
      const sign = ctx.request.headers['x-hub-signature'];
      const rawBody = ctx.request.rawBody;

      if (!_.verifySignature(sign, rawBody)) {
        ctx.status = 403;
        return;
      }

      try {
        await actionsHandle(ctx);
      } catch (e) {
        console.log(e);
      }

      ctx.body = 'Macaca bot';
    });
};
