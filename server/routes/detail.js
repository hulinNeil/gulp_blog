const mongoose = require('mongoose');
const {
	Article
} = require('../util/mongodb');
const getTags = require('../util/get_tags');
const dateFtt = require('../util/util').dateFtt;
const sendMail = require('../util/mail').sendMail;
const logger = require('../util/logger.js');

module.exports = async function detail(ctx) {
	let id = ctx.params.id;
	if (id.length === 12 || id.length === 24) {
		let sid = mongoose.Types.ObjectId(id);
		let result = await Article.findOne({
			_id: sid
		}).select('-markdown -__v');
		if (result) {
			let newResult = JSON.parse(JSON.stringify(result));
			Article.findByIdAndUpdate(sid, {
				read_times: ++newResult.read_times
			}, err => {
				if (err) {
					throw err;
				}
			});
			newResult.create_time = dateFtt(newResult.create_time, 'yyyy-MM-dd hh:mm:ss');
			newResult.hot_tags = await getTags();
			await ctx.render('detail', newResult);
			logger.info(`${newResult.title}被访问`, `内容···${new Date()} ---${ctx.request.header['user-agent']}`);
			return;
		}
	}
	await ctx.render('404');
}
