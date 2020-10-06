'use strict';
import angular from 'angular';

angular.module( 'dcApp.admin.publisher.register-queue' )
	.controller( 'AdminPublisherRegisterQueueController', AdminPublisherRegisterQueueController );

AdminPublisherRegisterQueueController.$inject = [
	'$state'
];

function AdminPublisherRegisterQueueController(
	$state
) {

	let $ctrl = this;

	$ctrl.goToDashboard = goToDashboard;
	$ctrl.goToLazyChild = goToLazyChild;

	function goToDashboard() {
		$state.go('core-dashboard');
	}

	function goToLazyChild() {
		$state.go('search');
	}
}
