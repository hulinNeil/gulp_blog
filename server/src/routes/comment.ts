import Router from 'koa-router';
import User from '../controllers/User';
import Auth from '../middleware/auth';

const router = new Router({ prefix: '/comment' });

router.get('/list', User.login); // 获取文章评论列表
router.post('/create', Auth, User.changePassword); // 创建文章评论
router.post('/delete', Auth, User.resetPassword); // 删除评论
router.get('/latest', Auth, User.resetPassword); // 获取当前用户最新评论

export default router;
