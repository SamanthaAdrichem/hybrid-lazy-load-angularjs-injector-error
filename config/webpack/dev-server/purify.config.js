const path = require('path');
const glob = require('glob');
const PurifyCSSPlugin = require('purifycss-webpack');

export const devServerPurifyConfig = {
	plugins : [
		new PurifyCSSPlugin({
			// Give paths to parse for rules. These should be absolute!
			paths: glob.sync(path.join(__dirname, 'app')),
			moduleExtensions : ['.html','.ejs', '.js', '.ts', '.svg'],
			verbose : true,
			purifyOptions: {
				info: true,
				rejected: true
			}
		})
	]
};