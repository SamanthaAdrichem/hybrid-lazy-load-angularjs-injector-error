'use strict';
import angular from 'angular';

(function( angular ) {

	angular.module('dcApp.config')
		.config( AppConfigCompile );


	AppConfigCompile.$inject = [
		'$compileProvider'
	];

	function AppConfigCompile(
		$compileProvider
	) {

		$compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|data):/);
		$compileProvider.debugInfoEnabled(false);
	}

})( angular );