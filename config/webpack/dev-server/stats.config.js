import { angularJsSrcPath } from "../../vars/paths.config";

// https://webpack.js.org/configuration/stats/
export const devServerStatsConfig = {
	devServer: {
		stats: {
			assets: false,
			cached: true,
			children: false,
			chunks: false,
			chunkModules: true,
			chunkOrigins: true,
			context: angularJsSrcPath,
			colors: true,
			env: false,
			errors: true,
			errorDetails: true,
			hash: true,
			performance: true,
			publicPath: true,
			timings: true,
			version: true,
			warnings: true,
		}
	}
};
