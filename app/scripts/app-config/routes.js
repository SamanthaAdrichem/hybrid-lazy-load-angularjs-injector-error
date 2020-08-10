'use strict';
import angular from 'angular';

angular.module('dcApp.config')
	.config( AppConfigRoutesConfig );


AppConfigRoutesConfig.$inject = [
	'$locationProvider',
	'$urlServiceProvider'
];

function AppConfigRoutesConfig(
	$locationProvider,
	$urlServiceProvider
) {
	$urlServiceProvider.config.strictMode(false);
	$urlServiceProvider.config.defaultSquashPolicy(true);
	$urlServiceProvider.deferIntercept();
	$urlServiceProvider.rules.when('', '/dashboard');
	$urlServiceProvider.rules.when('/', '/dashboard');
	$urlServiceProvider.rules.otherwise("/404");
	$locationProvider.html5Mode(true);
}
