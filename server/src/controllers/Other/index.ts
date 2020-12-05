import { Context } from 'koa';
import { responseJson, emailService } from '../../utils';

interface EmailParams {
  template?: string;
}

class OtherController {
  async version(ctx: Context) {
    const data = {
      curVersion: '1.0.0',
      versions: [
        {
          version: '1.0.0',
          date: '2020-12-14 16:00:00',
          content: {
            feature: '1. 初次创建服务',
          },
        },
      ],
    };
    responseJson(ctx, 200, data);
  }

  async testEmail(ctx: Context) {
    const { template } = ctx.query as EmailParams;
    let code = 200;
    let result = {};
    const emailAddress = ['1289739946@qq.com'];
    try {
      if (template) {
        result = await emailService.sendHtmlEmail(emailAddress, 'test template', template);
      } else {
        result = emailService.sendTextEmail(emailAddress, 'test title', 'test body');
      }
    } catch (error) {
      console.log('send email error', error);
      result = error;
      code = 10000;
    }
    responseJson(ctx, code, result);
  }
}

export default new OtherController();
