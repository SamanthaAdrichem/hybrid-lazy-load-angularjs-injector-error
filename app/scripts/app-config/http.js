'use strict';
import angular from 'angular';

angular.module('dcApp.config')
	.config( AppConfigHttp )
	.factory('appConfigFixedCacheInterceptor', appConfigFixedCacheInterceptor);


AppConfigHttp.$inject = [
	'$httpProvider',
	'$qProvider'
];

function AppConfigHttp(
	$httpProvider,
	$qProvider
) {
	/* Fix for Internet to clear API Authentication Cache */
	document.execCommand('ClearAuthenticationCache', 'false');
	$httpProvider.interceptors.push('appConfigFixedCacheInterceptor');

	// Normally this has a production check, but I had to delete so much for this demo.
	$qProvider.errorOnUnhandledRejections(false);
}

appConfigFixedCacheInterceptor.$inject = [
	'$templateCache'
];

function appConfigFixedCacheInterceptor( $templateCache ) {
	return {
		request: function( config ) {
			if (-1 === config.url.indexOf('://') && undefined === $templateCache.get( config.url )  ) {
				config.url += '?' + appVersion;
			}
			return config;
		}
	}
}
