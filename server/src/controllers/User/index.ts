import { Context } from 'koa';
import { emailService, responseJson } from '../../utils';
import Users from '../../models/Users';
import { Op } from 'sequelize';
import { LoginParams, RegisterParams } from './interface';

class UserController {
  async login(ctx: Context) {
    const { username, password } = ctx.request.body as LoginParams;
    try {
      const user = await Users.findOne({ where: { name: username, password }, raw: true });
      return user ? responseJson(ctx, 200, user) : responseJson(ctx, 404, 'account password error.');
    } catch (error) {
      console.error('login error', error);
      responseJson(ctx, 10000, error);
    }
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
      const { name, email, phone, password } = ctx.request.body as RegisterParams;
      const subsistentUser = await Users.findOne({
        where: {
          [Op.or]: { name, email, phone },
        },
        raw: true,
      });
      if (subsistentUser) {
        return responseJson(ctx, 10003);
      }
      const passwordSync = password || 'admin123456';
      const user = await Users.create({ name, email, phone, password: passwordSync });
      if (user) {
        emailService.sendRegisterSuccess(email, name, passwordSync);
      }
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
