const env = process.env.NODE_ENV;
var merge = require('lodash.merge');

let mainConfig = {
	'user': {
		'loginAttempts': 3,
		'log': 'trace'
	},
	'identity': {
		'log': 'trace'
	},
	'db': {
		'credentinals': {
			'database': process.env.DB_NAME || 'database',
			'username': process.env.DB_CRED_USERNAME || 'username',
			'password': process.env.DB_CRED_PASSWORD || 'password'
		},
		'gdprKey': process.env.DB_GDPR_KEY || false,
		'props': {
			'dialect': 'postgres',
			'host': process.env.DB_HOST || 'localhost',
			'port': process.env.DB_PORT || '5432',
			'define': {
				'freezeTableName': true
			}
		}
	},
	'httpserver': {
		'port': parseInt(process.env.HTTP_SERVER_PORT) || 3000,
		'publicPath': '/ui/administration/build/',
		'errorLog': 'trace',
		'permission': {
			'loginMethod': 'user.login',
			'logoutMethod': 'user.logout',
			'secret': process.env.HTTP_SERVER_SECRET || '152soos012o',
			'key': process.env.HTTP_SERVER_KEY || 'test',
			'proxy': 'true',
			'timeout': 3600000,
			'comment': 'memcached -p 8000',
			'memcachedStore': {
				'host': process.env.HTTP_SERVER_MEM_HOST || '127.0.0.1',
				'port': process.env.HTTP_SERVER_MEM_PORT || '8000',
				'_secret': ''
			}
		}
	}
};

let config = {
	dev: {
		
	},
	test: {

	},
	uat: {

	},
	prod: {

	}
};
// memcached -p 8000
if (!config[env]) {
	throw new Error('Missing env');
}
config[env] = merge(mainConfig, config[env]);
module.exports = config[env];
