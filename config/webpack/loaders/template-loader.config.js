import { angularJsSrcPath, angularSrcPath }           from './../../vars/paths.config';
import { labelPath }                  from "../../vars/paths.config";
import { APP_VERSION, PRODUCT_LABEL } from "../../vars/environment.config";

const HtmlWebpackPlugin = require('html-webpack-plugin');

export const templateLoader = {
	module: {
		rules: [
			{
				test: /\.a2\.html$/,
				exclude: [angularSrcPath],
				use: [
					{
						loader: 'html-loader',
						options: {
							root: angularJsSrcPath,
							removeComments: true,
							collapseWhitespace: true,

							// angular 2 templates break if these are omitted
							removeAttributeQuotes: false,
							keepClosingSlash: true,
							caseSensitive: true,
							conservativeCollapse: true,
						}
					}
				]
			},
			{
				test: /\.html$/,
				include: [angularSrcPath],
				exclude: [angularJsSrcPath],
				use: [
					{
						loader: 'html-loader',
						options: {
							root: angularSrcPath,
							removeComments: true,
							collapseWhitespace: true,

							// angular 2 templates break if these are omitted
							removeAttributeQuotes: false,
							keepClosingSlash: true,
							caseSensitive: true,
							conservativeCollapse: true,
						}
					}
				]
			},
			{
				test: /^(?!.*\.a2\.html$).*\.html$/,
				exclude: [angularSrcPath],
				use: [
					{
						loader: 'ngtemplate-loader',
						options: {
							relativeTo : angularJsSrcPath
						}
					},
					{
						loader: 'html-loader',
						options: {
							root: angularJsSrcPath,
							removeComments: true,
							collapseWhitespace: true
						}
					}
				]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: angularSrcPath + '/index.ejs',
			label: getLabelFavIcon(),
			pageTitle: PRODUCT_LABEL .charAt( 0 ).toUpperCase() + PRODUCT_LABEL.slice( 1 ),
			pageLogo: getLabelLogo(),
			pageDescription: getLabelDescription(),
			pageHeaderColor: getHeaderColor(),
			appVersion: APP_VERSION
		})
	]
};

function getLabelDescription() {
	switch(PRODUCT_LABEL) {
		default:
			return 'Some description';
	}
}

function getLabelFavIcon() {
	switch(PRODUCT_LABEL) {
		default:
			return '/favicon.ico';
	}
}

function getLabelLogo() {
	switch(PRODUCT_LABEL) {
		default:
			return 'https://localhost/logo.png';
	}
}

function getHeaderColor() {
	switch (PRODUCT_LABEL){
		default:
			return '#FF00FF';
	}
}
