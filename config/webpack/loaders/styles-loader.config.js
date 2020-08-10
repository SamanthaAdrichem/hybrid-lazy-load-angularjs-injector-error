import {APP_VERSION, PRODUCT_LABEL}   from '../../vars/environment.config';
import {angularJsSrcPath, configPath} from '../../vars/paths.config';

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

let cssOptions = { sourceMap: true };
let cssNanoOptions = {
	normalizeWhitespace: false,
	discardEmpty: true,
	discardUnused: false,
	discardComments: {
		removeAll: true
	},
	discardDuplicates: true,
	mergeIdents: false,
	reduceIdents: false,
	safe: true
};

let postCssOptions = {
	config: {
		ctx: {
			cssnano: cssNanoOptions,
		},
		path: configPath + '/postcss.config.js'
	},
	sourceMap: true
};

let sassOptions = {
	sassOptions: {
		includePaths: [
			angularJsSrcPath + '/styles/_base/_' + PRODUCT_LABEL,
			angularJsSrcPath + '/styles/_base'
		],
	},
	sourceMap: true
};

export const stylesLoader = {
	module: {
		rules: [
			{
				test: /\.s?css$/,
				use: [
					{ loader: MiniCssExtractPlugin.loader },
					{ loader: 'css-loader', options: cssOptions },
					{ loader: 'postcss-loader', options: postCssOptions },
					{ loader: 'sass-loader', options: sassOptions }
				]
			}
		]
	},
	plugins : [
		new MiniCssExtractPlugin({
			filename: "styles/style.css?v=" + APP_VERSION,
			allChunks: true
		}),
		new OptimizeCssAssetsPlugin({
			cssProcessor: require('cssnano'),
			cssProcessorPluginOptions: {
				preset: ['default', cssNanoOptions],
			},
			canPrint: true
		})
	]
};
