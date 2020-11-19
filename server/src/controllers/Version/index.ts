import { Context } from 'koa';
import { responseJson } from '../../utils';

class VersionController {
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
}

export default new VersionController();
