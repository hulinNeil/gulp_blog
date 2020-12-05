import Router from 'koa-router';
import OtherController from '../controllers/Other';

const router = new Router();

router.get('/version', OtherController.version);
router.get('/test', OtherController.version);
router.get('/test/email', OtherController.testEmail);
router.get('/test/sms', OtherController.version);

export default router;
