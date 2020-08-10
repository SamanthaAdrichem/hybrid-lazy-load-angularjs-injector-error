import { PRODUCT_LABEL } from "./environment.config";

const path = require('path');

export const rootPath = path.resolve(__dirname + '/../../');

export const angularJsSrcPath = path.resolve(rootPath + '/app');
export const angularSrcPath = path.resolve(rootPath + '/src');
export const configPath = path.resolve( rootPath + '/config');
export const distPath = path.resolve( rootPath + '/dist');
export const labelPath = path.resolve( rootPath + '/app/layout/' + PRODUCT_LABEL );
export const modulePath = path.resolve(rootPath + '/node_modules');
export const vendorPath = path.resolve(rootPath + '/app/vendor');

export function getFavIcon() {
	switch(PRODUCT_LABEL) {
		default:
			return 'favicon.ico';
	}
	return '';
}
