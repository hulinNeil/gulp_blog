import Koa, { Context } from 'koa';
import { responseJson } from '../../utils';
import Users from '../../models/Users';

class UserController {
  async login(ctx: Context) {
    responseJson(ctx, 200, 'data');
  }
  async logout(ctx: Context) {
    responseJson(ctx, 200, 'data');
  }

  async changePassword(ctx: Context) {
    responseJson(ctx, 200, 'data');
  }

  async resetPassword(ctx: Context) {
    responseJson(ctx, 200, 'data');
  }

  async sendOtp(ctx: Context) {
    responseJson(ctx, 200, 'data');
  }

  async register(ctx: Context) {
    try {
      console.log(ctx.request.body);
      const { name, email, phone } = ctx.request.body;
      // 这里需要手动校验name和email是否存在，存在的话返回false，否则会直接抛出错误
      const user = await Users.create({ name, email, phone });
      console.log(user);
      return user ? responseJson(ctx, 200, user) : responseJson(ctx, 404);
    } catch (error) {
      console.error('create user error', error);
      responseJson(ctx, 10000, error);
    }
  }

  async info(ctx: Context) {
    try {
      const user = await Users.findOne({ where: { id: ctx.query.id }, raw: true });
      return user ? responseJson(ctx, 200, user) : responseJson(ctx, 404);
    } catch (error) {
      console.error('get user info error', error);
      responseJson(ctx, 10000, error);
    }
  }

  async updateInfo(ctx: Context) {
    responseJson(ctx, 200, 'data');
  }
}

export default new UserController();
