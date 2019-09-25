// 发送邮件功能
const nodemailer = require('nodemailer');
const schedule = require('node-schedule');

var transporter = nodemailer.createTransport({
	service: 'qq',
	auth: {
		user: '1289739946@qq.com',
		pass: 'mmkqtaeuqkqyidcg' //授权码,通过QQ获取
	}
});
var configObj = {
	from: '1289739946@qq.com', // 发送者
	to: '13349899620@189.cn,1289739946@qq.com', // 接受者,可以同时发送多个,以逗号隔开
	subject: '标题', // 标题
	text: '内容',
	attachments: [{ //添加附件
			filename: 'package.json',
			path: './package.json'
		},
		{
			filename: 'content.txt',
			content: '发送内容'
		}
	]
}

function mailOptions(obj = {}) {
	return Object.assign(JSON.parse(JSON.stringify(configObj)), obj);
}

function sendMail(obj) {
	transporter.sendMail(mailOptions(obj), function(err, info) {
		if (err) {
			console.log(err);
			return;
		}
		console.log('发送成功');
	});
}

function monitorTimeSendMail() {
	var rule = new schedule.RecurrenceRule();
	rule.dayOfWeek = [0, new schedule.Range(3, 6)];
	rule.hour = 15;
	rule.minute = 0;
	schedule.scheduleJob(rule, function() {
		let obj = {
			subject: '我是定时发送邮件的哦！',
			text: `现在的时间是${new Date()},by robot ☺`
		}
		sendMail(obj);
	});
}

module.exports = {
	monitorTimeSendMail,
	sendMail
};
