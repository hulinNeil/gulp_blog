import Router from 'koa-router';
import VersionController from '../controllers/Version';

const router = new Router({ prefix: '/version' });

router.get('/', VersionController.version);

export default router;
