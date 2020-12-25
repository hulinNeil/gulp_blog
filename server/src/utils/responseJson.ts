import { ExtendableContext } from 'koa';
import { errMsg } from './errorCode';
import { getCurDateTime } from './tools';
import httpRequestContext from 'http-request-context';

/**
 * @param ctx
 * @param status
 * @param result
 * @param message
 */
const responseJson = (ctx: ExtendableContext, status: number = 200, result: Object = {}, msg: string = '') => {
  let message = msg;
  if (!msg) {
    message = errMsg[status];
  }
  const requestId = httpRequestContext.get('RequestId') || '';
  ctx.body = {
    status,
    message,
    data: { ...result },
    requestId,
    timestamp: getCurDateTime(),
  };
};
export default responseJson;
