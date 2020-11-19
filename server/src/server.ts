import Koa from 'koa';
import routes from './routes';

const app = new Koa();
routes(app);

app.on('error', (err, ctx) => {
  console.log('server error', err);
});

app.listen(3005, () => {
  console.log('app is running 3005');
});
