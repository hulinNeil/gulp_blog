import { Context } from 'koa';
import { responseJson } from '../../utils';

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
    responseJson(ctx, 200, 'data');
  }

  async updateInfo(ctx: Context) {
    responseJson(ctx, 200, 'data');
  }
}

export default new UserController();
