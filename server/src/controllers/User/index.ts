import { Context } from 'koa';
import { responseJson } from '../../utils';
import Users from '../../models/Users';
import { Op } from 'sequelize';

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
      const { name, email, phone, password } = ctx.request.body;
      const subsistentUser = await Users.findOne({
        where: {
          [Op.or]: { name, email, phone },
        },
        raw: true,
      });
      if (subsistentUser) {
        return responseJson(ctx, 10003);
      }
      const user = await Users.create({ name, email, phone, password: password || 'admin123456' });
      return user ? responseJson(ctx, 200) : responseJson(ctx, 404);
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
