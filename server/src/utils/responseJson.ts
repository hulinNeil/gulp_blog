import { ExtendableContext } from 'koa';
import { errMsg } from './errorCode';
import { getCurDateTime } from './tools';

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
  ctx.body = {
    status,
    message,
    data: { ...result },
    timestamp: getCurDateTime(),
  };
};
export default responseJson;
