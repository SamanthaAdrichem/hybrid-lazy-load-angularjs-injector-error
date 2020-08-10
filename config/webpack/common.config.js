import {ANALYZE, APP_ENV, APP_VERSION, PRODUCT_LABEL} from "../vars/environment.config";
import {angularJsSrcPath, angularSrcPath, distPath, labelPath, modulePath, rootPath, vendorPath} from '../vars/paths.config';
import {fileLoader} from './loaders/file-loader.config';
import {javascriptLoader} from './loaders/javascript-loader.config';
import {stylesLoader} from './loaders/styles-loader.config';
import {templateLoader} from './loaders/template-loader.config';
import {translationLoader} from "./loaders/translation-loader.config";
import {typescriptAngularLoader} from './loaders/typescript-angular-loader';
import {webworkerLoader} from './loaders/web-worker-loader';

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

export let commonConfig;

commonConfig = {
	mode: APP_ENV,
	entry: {
		polyfills: angularSrcPath + '/polyfills.ts',
		app: angularSrcPath + '/main.ts',
	},
	resolve: {
		modules: [labelPath, angularJsSrcPath, angularSrcPath, vendorPath, modulePath, rootPath], // Order to search for import and require statements
		extensions: ['.js', '.ts'],
		alias: {
			'spin': 'spin.js',
		},
	},
	output: {
		path: distPath,
		publicPath: '/',
		filename: 'scripts/[name].js?v=' + APP_VERSION,
		// chunkFilename: 'name]~[id].chunk.js'
	},
	externals: function (context, request, callback) {
		if (/canvg|pdfmake/.test(request)) {
			return callback(null, "commonjs " + request);
		}
		callback();
	},
	optimization: {
		minimizer: [
			new TerserPlugin({
				cache: './cache/terser/',
				parallel: true,
				sourceMap: true,
				terserOptions: {
					extractComments: true,
					warnings: false,
					mangle: true, // Note `mangle.properties` is `false` by default.
					ie8: false,
					safari10: true,
				},
			}),
		],
		splitChunks: {
			chunks: 'all',
			automaticNameDelimiter: '~',
			name: true,
		},
	},
	plugins: [
		new CleanWebpackPlugin({
			cleanOnceBeforeBuildPatterns: ['dist'],
			cleanAfterEveryBuildPatterns: [],
			cleanStaleWebpackAssets: false,
			verbose: true,
			dry: false,
		}),
		new webpack.ContextReplacementPlugin(/\@angular(\\|\/)core(\\|\/)esm5/, angularJsSrcPath), // To solve angular 5 import bug
		new webpack.ContextReplacementPlugin(/\@angular(\\|\/)core(\\|\/)esm5/, angularSrcPath), // To solve angular 5 import bug
		new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /\/(en-gb|nl|nl-be|de|fr)\./), // To require the needed momentjs locales
		new webpack.DefinePlugin({
			'NODE_ENV': JSON.stringify(APP_ENV),
		}),
		new webpack.NormalModuleReplacementPlugin(
			/src\/config\/(test-app)\.config(\.ts)?/,
			angularSrcPath + '/config/' + PRODUCT_LABEL + '.config.ts',
		),
	],
};

if (true === ANALYZE) {
	commonConfig.plugins.push(new BundleAnalyzerPlugin());
}

commonConfig = webpackMerge(
	commonConfig,
	fileLoader,
	javascriptLoader,
	stylesLoader,
	templateLoader,
	translationLoader,
	typescriptAngularLoader,
	webworkerLoader,
);
