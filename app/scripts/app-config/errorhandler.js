'use strict';
import angular from 'angular';

angular.module('dcApp.config')
	.config( AppConfigErrorHandler )
	.filter('debug', DebugFilterEnclosure );

AppConfigErrorHandler.$inject = [
	'$provide'
];

function AppConfigErrorHandler(
	$provide
) {

	try {
		Error.stackTraceLimit = Infinity;
	} catch( e ) {
		// do nothing
	}

	/* SourceMap error handler fixes */
	$provide.decorator( '$exceptionHandler', ['$delegate', function($delegate) {
		return function(exception, cause) {
			$delegate(exception, cause);
			setTimeout(function() {
				throw exception;
			}, 0);
		};
	} ] );
}

function DebugFilterEnclosure() {
	return DebugFilter;
}

/**
 *
 * @param input
 * @returns {*}
 * @constructor
 */
function DebugFilter(input) {
	if (input === '') {
		console.log('[ empty string ]');
		return '[ empty string ]';
	}
	input = input || ('' + input);
	console.log( input );
	return input;
}
