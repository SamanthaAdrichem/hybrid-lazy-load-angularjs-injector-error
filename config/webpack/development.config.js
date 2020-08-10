import { commonConfig } from './common.config';
import { devServerConfig } from './dev-server/dev-server.config';
import { devServerSslConfig } from "./dev-server/ssl.config";
import { devServerStatsConfig } from "./dev-server/stats.config";
import { IS_DEV_SERVER } from '../vars/environment.config';

const webpackMerge = require('webpack-merge');

export let developmentConfig;

developmentConfig = {
};

developmentConfig = webpackMerge(
	commonConfig,
	developmentConfig
);

// only enable dev server config and hot module config if running dev server (prevents loads of hot module files to be generated unneeded)
if (IS_DEV_SERVER) {
	developmentConfig = webpackMerge(
		developmentConfig,
		devServerConfig,
		devServerSslConfig,
		devServerStatsConfig
	);
}
