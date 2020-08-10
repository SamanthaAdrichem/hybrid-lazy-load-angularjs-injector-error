import webpack from 'webpack';
import { ENABLE_PURIFY } from "../../vars/environment.config";
import { devServerPurifyConfig } from "./purify.config";

const webpackMerge = require('webpack-merge');

export let devServerConfig;

devServerConfig = {
	devServer: {
		historyApiFallback: true,
		public : 'localhost:8080',
		hot: true,
		open: true,
		progress: true
	},
	plugins : [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin()
	]
};

if (ENABLE_PURIFY) {
	devServerConfig = webpackMerge(
		devServerConfig,
		devServerPurifyConfig
	);
}
