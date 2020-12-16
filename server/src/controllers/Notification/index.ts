import { Context } from 'koa';
import { emailService, responseJson, redis } from '../../utils';
import { EmailParams, SMSParams } from './interface';

class NotificationController {
  async senEmailOtp(ctx: Context) {
    const { email } = ctx.request.body as EmailParams;
    try {
      const opt = NotificationController.getRandom();

      const result = await redis.set(`opt_${email}`, opt, 'EX', 60 * 5); // 模式是EX(seconds), 过期时间是5min
      if (result === 'OK') {
        emailService.sendOtp(email, opt);
        responseJson(ctx, 200);
      } else {
        responseJson(ctx, 10000, 'save opt error.');
      }
    } catch (error) {
      console.error('send otp error', error);
      responseJson(ctx, 10000, error);
    }
  }
  async senSmsOtp(ctx: Context) {
    const { phone } = ctx.request.body as SMSParams;
    try {
      const opt = NotificationController.getRandom();

      const result = await redis.set(`opt_${phone}`, opt, 'EX', 60 * 5); // 模式是EX(seconds), 过期时间是5min
      if (result === 'OK') {
        // SmsService.sendOtp(phone, opt); // 发送短信
        responseJson(ctx, 200);
      } else {
        responseJson(ctx, 10000, 'save opt error.');
      }
    } catch (error) {
      console.error('send otp error', error);
      responseJson(ctx, 10000, error);
    }
  }

  static getRandom = () => {
    return String(Math.floor(Math.random() * 1000000));
  };
}

export default new NotificationController();
