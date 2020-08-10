'use strict';
import angular from 'angular';

let errorDefault = require('pages/error/error.html');
let error503 = require('pages/error/503.html');
let error500 = require('pages/error/500.html');
let error404 = require('pages/error/404.html');
let error403 = require('pages/error/403.html');

angular.module( 'dcApp.error' )
	.config( ErrorConfig );

ErrorConfig.$inject = [
	'$stateProvider'
];

function ErrorConfig( $stateProvider ) {
	$stateProvider.state( {
		name: 'error',
		url: '/error',
		templateUrl: errorDefault,
		controller: 'ErrorPageController',
		controllerAs: '$ctrl',
		/* Do not use this anywhere else */
		preventResolveExtend: true,
		requiresAuth: false
	} );
	$stateProvider.state( {
		name: 'error-503',
		url: '/503',
		templateUrl: error503,
		controller: 'ErrorPageController',
		controllerAs: '$ctrl',
		requiresAuth: false
	} );
	$stateProvider.state( {
		name: 'error-500',
		url: '/500',
		templateUrl: error500,
		controller: 'ErrorPageController',
		controllerAs: '$ctrl',
		requiresAuth: false
	} );
	$stateProvider.state( {
		name: 'error-404',
		url: '/404',
		templateUrl: error404,
		controller: 'ErrorPageController',
		controllerAs: '$ctrl',
		requiresAuth: false
	} );
	$stateProvider.state( {
		name: 'error-403',
		url: '/403',
		templateUrl: error403,
		controller: 'ErrorPageController',
		controllerAs: '$ctrl',
		requiresAuth: false
	} );

}
