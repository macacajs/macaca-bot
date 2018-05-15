'use strict';

const Koa = require('koa');
const Router = require('koa-router');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');

const _ = require('./helper');
const actionsHandle = require('./actions');

module.exports = () => {
  const router = new Router();

  router
    .get('/', (ctx) => {
      ctx.body = 'Macaca bot';
    })
    .post('*', async (ctx) => {
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

  const app = new Koa();

  app
    .use(logger())
    .use(bodyParser())
    .use(router.routes())
    .use(router.allowedMethods());

  const port = process.env.HTTP_PORT || 9500;

  app.listen(port);

  console.log(`Listening on http://${_.ipv4}:${port}`);
};
