export const APP_ENV = process.env.NODE_ENV === 'production'
	? 'production'
	: 'development';

export const PRODUCT_LABEL = 'test-app';

export const APP_VERSION = process.env.NODE_APP_VERSION
	? process.env.NODE_APP_VERSION
	: new Date().getTime();

export const ENABLE_PURIFY = process.env.PURIFY === 'true' ? true : false;

export const ANALYZE = process.env.ANALYZE === 'true' ? true : false;

export const IS_DEV_SERVER = process.argv[1].indexOf('webpack-dev-server') !== -1;
