import Application from 'koa';
import Router from 'koa-router';
import fs from 'fs';

const router = (app: Application) => {
  fs.readdirSync(__dirname).forEach(async (file) => {
    if (file.includes('index')) {
      return;
    }
    const route: Router = require(`./${file}`).default;
    app.use(route.routes()).use(route.allowedMethods());
  });
};

export default router;
