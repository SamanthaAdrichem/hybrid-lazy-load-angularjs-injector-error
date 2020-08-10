import { rootPath } from '../../vars/paths.config';

export const typescriptAngularLoader = {
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: [
					{
						loader: 'awesome-typescript-loader',
						options: {
							configFileName: rootPath + '/tsconfig.app.json'
						}
					},
					{ loader: 'angular2-template-loader' }
				]
			}
		]
	}
};
