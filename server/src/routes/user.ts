import Router from 'koa-router';
import User from '../controllers/User';
import Auth from '../middleware/auth';

const router = new Router({ prefix: '/user' });

router.post('/login', User.login);
router.post('/logout', Auth, User.logout);
router.post('/changePassword', Auth, User.changePassword);
router.post('/resetPassword', User.resetPassword);
router.post('/sendOtp', User.sendOtp);
router.post('/register', User.register);
router.get('/info', User.info); // 获取用户信息
router.post('/update', User.updateInfo); // 更行用户信息
router.post('/vote', User.updateInfo); // 关注用户
router.get('/voteList', User.updateInfo); // 获取已关注用户列表

export default router;
