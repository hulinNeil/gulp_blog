import Koa from 'koa';
import routes from './routes';
import serve from 'koa-static';
import * as path from 'path';
import { koaSwagger } from 'koa2-swagger-ui';

const app = new Koa();

// 加载路由
routes(app);

// 加载静态资源
const publicSatic = serve(path.join(__dirname + '/public')); // 静态资源1
app.use(publicSatic);

// 添加swagger
app.use(
  koaSwagger({
    routePrefix: '/swagger',
    swaggerOptions: {
      url: '/swagger/index.json',
    },
  })
);

app.on('error', (err) => {
  console.log('server error', err);
});

app.listen(3005, () => {
  console.log('app is running 3005');
});