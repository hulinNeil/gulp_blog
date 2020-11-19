const log4js = require('log4js');

const options = {
	appenders: {
		console: {
			type: 'console'
		},
		data_file: {
			type: 'dateFile',
			filename: './logs/log',
			alwaysIncludePattern: true,
			maxLogSize: 20971520, // file max size
			daysToKeep: 15, // save time
			pattern: '_yyyy_MM_dd.log'
		}
	},
	categories: {
		default: {
			appenders: ['console'],
			level: 'all'
		},
		converto: {
			appenders: ['data_file'],
			level: 'all'
		}
	}
};

log4js.configure(options);

module.exports = log4js.getLogger('converto');
