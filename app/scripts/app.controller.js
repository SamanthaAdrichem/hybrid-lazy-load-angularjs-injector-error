'use strict';
import angular from 'angular';

angular.module('dcApp')
	.controller( 'MainController', MainController );

MainController.$inject = [
	'$location',
	'$transitions',
];

function MainController(
	$location,
	$transitions,
) {

	let $ctrl = this;

	$ctrl.$onInit = onInit;

	function onInit() {
		$transitions.onError( {}, function( transition ) {
			let transitionError = transition.error();
			if ([4,6].indexOf(transitionError.type) !== -1)
			{
				$location.path( '/error' );
			}
		} );
	}

}
