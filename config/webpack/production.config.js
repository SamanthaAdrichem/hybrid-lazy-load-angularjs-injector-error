const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');

import { commonConfig }                   from './common.config';
import {angularJsSrcPath, angularSrcPath} from "../vars/paths.config";

export let productionConfig;
productionConfig = {
	plugins: [
		new CopyWebpackPlugin([ { from: '.htaccess' } ], { context: angularJsSrcPath } ),
		new webpack.LoaderOptionsPlugin({ minimize: true }),
		new webpack.NormalModuleReplacementPlugin(
			/src\/environments\/environment(\.ts)?/,
			angularSrcPath + '/environments/environment.prod.ts'
		)
	]
};

productionConfig  = webpackMerge(
	commonConfig,
	productionConfig
);
