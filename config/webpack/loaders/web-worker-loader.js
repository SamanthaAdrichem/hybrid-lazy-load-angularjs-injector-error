export const webworkerLoader = {
	module: {
		rules: [
			{
				test: /\.worker\.js$/,
				use: [
					{
						loader: 'worker-loader',
						options: { name: '[name].[hash].js' }
					},
					{
						loader: 'babel-loader',
						options: {
							cacheDirectory: true
						}
					}
				]
			}
		]
	}
};