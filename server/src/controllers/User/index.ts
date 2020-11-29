import { Context } from 'koa';
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
    responseJson(ctx, 200, 'data');
  }

  async info(ctx: Context) {
    try {
      const ss: any = await Users.findOne({ where: { name: 'hulin' } });
      responseJson(ctx, 200, ss.dataValues);
    } catch (error) {
      responseJson(ctx, 200, error);
    }
  }

  async updateInfo(ctx: Context) {
    responseJson(ctx, 200, 'data');
  }
}

export default new UserController();
