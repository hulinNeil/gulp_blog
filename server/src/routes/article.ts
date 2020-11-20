import Router from 'koa-router';
import User from '../controllers/User';
import Auth from '../middleware/auth';

const router = new Router({ prefix: '/article' });

router.get('/detail', User.login); // 获取详情
router.post('/update', Auth, User.logout); // 更新文章
router.post('/create', Auth, User.changePassword); // 创建文章
router.post('/delete', Auth, User.resetPassword); // 删除文章
router.post('/vote', Auth, User.resetPassword); // 点赞
router.post('/collection', Auth, User.resetPassword); // 收藏

export default router;
