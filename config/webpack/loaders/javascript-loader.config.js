import {angularSrcPath} from '../../vars/paths.config';
import { APP_ENV }      from "../../vars/environment.config";

const webpack = require('webpack');
const IgnorePlugin = webpack.IgnorePlugin;


export const javascriptLoader = {
	devtool: APP_ENV === 'development'
		? 'cheap-module-eval-source-map'	// Source maps + reference to source map file for development
		: 'hidden-source-map',				// Source maps without reference to source map file in original source for production
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: [angularSrcPath],
				use: [
					{
						loader: 'babel-loader',
						options: {
							cacheDirectory: true,
							plugins: ["@babel/plugin-syntax-dynamic-import"]
						}
					}
				]
			},
			{
				test: require.resolve('jquery'),
				use: [
					{
						loader: 'expose-loader',
						options: 'jQuery'
					},
					{
						loader: 'expose-loader',
						options: '$'
					}
				]
			},
			{
				test: require.resolve('angular'),
				use: [
					{
						loader: 'expose-loader',
						options: 'angular'
					}
				]
			}
		]
	},
	plugins: [
		new webpack.ProvidePlugin(
			{
				'window.jQuery': 'jquery',
				'jQuery': 'jquery',
				'$': 'jquery',
				'_': 'lodash'
			}
		),
		// alaSql imports way too much, though you might need something if that is the case exclude it here
		new IgnorePlugin(/(^fs$|cptable|^es6-promise$|^net$|^tls$|^forever-agent$|^tough-cookie$|^path$|^request$|react-native|^vertx$)/)
	]
};
