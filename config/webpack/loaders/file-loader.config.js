import {labelPath, angularJsSrcPath, modulePath, getFavIcon} from "../../vars/paths.config";

const CopyWebpackPlugin = require('copy-webpack-plugin');

let extensionsToCopy = ['gif', 'jpg', 'jpeg', 'png', 'webp', 'mp3', 'ttf', 'eot', 'ogg', 'svg', 'woff', 'woff2', 'ico'];
let expression = new RegExp('\.(' + extensionsToCopy.join('|') + ')$');

export const fileLoader = {
	module: {
		rules: [
			{
				test: expression,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[path][name].[ext]?[hash]',
							context: angularJsSrcPath,
							esModule: false
						}
					}
				]
			}
		]
	},
	plugins: [
		new CopyWebpackPlugin(
			[ // relative to app/layout/label
				{ from: getFavIcon() },
				{ from: 'logo.png' }
			],
			{ context: labelPath }
		),
		new CopyWebpackPlugin(
			[ // relative to app/layout/label
				{ from: 'images/browser/**' },
				{ from: 'images/profile/**' },
				{ from: 'images/device/**' },
				{ from: 'images/platform/**' },
				{ from: '.htaccess' },
				{ from: 'version.js' },

				// Api files
				{ from: 'api/index.php', to: 'api/' },
				{ from: 'api/.htaccess', to: 'api/' }
			],
			{ context: angularJsSrcPath }
		),
		new CopyWebpackPlugin(
			[ // relative to app (not /vendor, otherwise you'll need to set all to paths )
				{ from: 'vendor/amcharts/dist/amcharts/**' },
				{ from: 'vendor/webshim-1.16.0/js-webshim/minified/**' },
				{ from: 'vendor/amcharts/dist/images/**' },
				{ from: 'vendor/fullcalendar/dist/**' },
				{ from: 'vendor/minicolor-picker/jquery.minicolors.min.js', to: 'vendor/minicolor-picker/jquery.minicolors.min.js' },
				{ from: 'vendor/minicolor-picker/jquery.minicolors.css', to: 'vendor/minicolor-picker/jquery.minicolors.css' },
				{ from: 'vendor/minicolor-picker/jquery.minicolors.png', to: 'vendor/minicolor-picker/jquery.minicolors.png' },
				{ from: 'vendor/howler.js/dist/howler.min.js', to: 'vendor/howler.js/dist/howler.min.js' }
			],
			{ context: angularJsSrcPath }
		),
		new CopyWebpackPlugin(
			[
				{ from: 'codemirror/lib/codemirror.js', to: 'vendor/codemirror/lib/codemirror.js' },
				{ from: 'codemirror/addon/runmode/colorize.js', to: 'vendor/codemirror/addon/runmode/colorize.js' },
				{ from: 'codemirror/addon/runmode/runmode.js', to: 'vendor/codemirror/addon/runmode/runmode.js' },
				{ from: 'codemirror/mode/javascript/javascript.js', to: 'vendor/codemirror/mode/javascript/javascript.js' },
				{ from: 'codemirror/mode/clike/clike.js', to: 'vendor/codemirror/mode/clike/clike.js' },
				{ from: 'codemirror/mode/css/css.js', to: 'vendor/codemirror/mode/css/css.js' },
				{ from: 'codemirror/mode/xml/xml.js', to: 'vendor/codemirror/mode/xml/xml.js' },
				{ from: 'codemirror/mode/php/php.js', to: 'vendor/codemirror/mode/php/php.js' },
				{ from: 'codemirror/mode/htmlmixed/htmlmixed.js', to: 'vendor/codemirror/mode/htmlmixed/htmlmixed.js' }
			],
			{context: modulePath}
		)
	]
};
