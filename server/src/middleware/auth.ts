import { Context, Next } from 'koa';
// import { JWT } from '../utils';

const Auth = async (ctx: Context, next: Next) => {
  // const { authorization = '' } = ctx.request.header;
  // const token = authorization.replace('Bearer ', '');
  // const info = JWT.verify(token);
  // if (info) {
  //   ctx.state.info = info;
  // } else {
  //   ctx.throw(401, 'token error');
  // }
  console.log('校验token');
  next();
};

export default Auth;
