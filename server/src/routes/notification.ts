import Router from 'koa-router';
import Notification from '../controllers/Notification';
import Auth from '../middleware/auth';

const router = new Router({ prefix: '/notification' });

router.post('/email/opt', Notification.senEmailOtp); // 发送短信验证码
router.post('/sms/opt', Auth, Notification.senSmsOtp); // 发送邮件验证码

export default router;
