const CopyWebpackPlugin = require('copy-webpack-plugin');

import { modulePath, angularJsSrcPath } from "../../vars/paths.config";

export const translationLoader = {
	module: {
		rules: [
			{
				test: /\.po$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: 'translations/lang_[name].json?[hash]',
							context: angularJsSrcPath,
							esModule: false
						}
					},
					'angular-gettext-loader?format=json'
				]
			}
		]
	},
	plugins: [
		new CopyWebpackPlugin(
			[
				{ from: 'translations/countries_de.json', to: 'translations/' },
				{ from: 'translations/countries_en.json', to: 'translations/' },
				{ from: 'translations/countries_fr.json', to: 'translations/' },
				{ from: 'translations/countries_nl.json', to: 'translations/' }
			],
			{ context: angularJsSrcPath }
		),
		new CopyWebpackPlugin(
			[
				{ from: 'angular-i18n/angular-locale_de-de.js', to: 'locales/' },
				{ from: 'angular-i18n/angular-locale_de.js', to: 'locales/' },
				{ from: 'angular-i18n/angular-locale_en-gb.js', to: 'locales/' },
				{ from: 'angular-i18n/angular-locale_en-us.js', to: 'locales/' },
				{ from: 'angular-i18n/angular-locale_en.js', to: 'locales/' },
				{ from: 'angular-i18n/angular-locale_fr-be.js', to: 'locales/' },
				{ from: 'angular-i18n/angular-locale_fr-fr.js', to: 'locales/' },
				{ from: 'angular-i18n/angular-locale_fr.js', to: 'locales/' },
				{ from: 'angular-i18n/angular-locale_nl-be.js', to: 'locales/' },
				{ from: 'angular-i18n/angular-locale_nl-nl.js', to: 'locales/' },
				{ from: 'angular-i18n/angular-locale_nl.js', to: 'locales/' }
			],
			{ context: modulePath }
		)
	]
};
