import config from './config';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import routes from './routes';
import serve from 'koa-static';
import * as path from 'path';
import { koaSwagger } from 'koa2-swagger-ui';
import traceMiddleware from './middleware/trace';
import httpRequestContext from 'http-request-context';

const app = new Koa();

// 加载 body 中间件
app.use(bodyParser());
// 添加 trace 中间件
app.use(httpRequestContext.koaMiddleware());
app.use(traceMiddleware);

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
  console.log('sevice error', err);
});

app.listen(config.port, () => {
  console.log(`App is running on ${config.port}`);
});
