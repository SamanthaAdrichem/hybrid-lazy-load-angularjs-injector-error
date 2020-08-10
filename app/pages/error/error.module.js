'use strict';

import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import gettext from 'angular-gettext';

(function() {

	angular.module( 'dcApp.error', [
		uiRouter,
		gettext
	] );

	/* Module dependencies */

	/* Module files */

	require( 'pages/error/error.routes' );
	require( 'pages/error/error.controller' );

})(angular);