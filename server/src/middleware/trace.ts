import { Context, Next } from 'koa';
import { v4 as uuid } from 'uuid';
import httpRequestContext from 'http-request-context';
import { responseJson } from '../utils';

const traceMiddleware = async (ctx: Context, next: Next) => {
  httpRequestContext.set('RequestId', uuid());
  try {
    const startTime = Date.now();
    await next();
    const endTime = Date.now();
    const { method, path, status } = ctx;
    const params = JSON.stringify(ctx.request.body);
    const diffTime = endTime - startTime;
    console.log(`Request Method: ${method}, Request Path: ${path}, Response Code: ${status}, Request Body: ${params}, Time: ${diffTime} ms`);
    if (ctx.status === 404) {
      return responseJson(ctx, 404, { url: path });
    }
  } catch (err) {
    const status = err.statusCode || err.status || 500;
    responseJson(ctx, status, {}, err.message);
    ctx.app.emit('error', err, ctx);
  }
};
export default traceMiddleware;
