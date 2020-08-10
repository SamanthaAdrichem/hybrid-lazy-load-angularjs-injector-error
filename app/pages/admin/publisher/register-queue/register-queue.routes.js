'use strict';
import angular from 'angular';

let templateUrl = require('pages/admin/publisher/register-queue/register-queue.html');

angular.module('dcApp.admin.publisher.register-queue')
	.config( AdminPublisherRegisterQueueConfig );

AdminPublisherRegisterQueueConfig.$inject = [
	'$stateProvider'
];

function AdminPublisherRegisterQueueConfig(
	$stateProvider
) {

	$stateProvider.state(  {
		templateUrl: templateUrl,
		controller: 'AdminPublisherRegisterQueueController',
		controllerAs: '$ctrl',
		permissions: null,
		requiresAuth: false,
		name: 'admin-publisher-register-queue',
		url: '/admin/publisher/register-queue/:edit/:registrationId',
		params: {
			edit : { dynamic : true, value: "" },
			registrationId : { dynamic : true, value: "" }
		}
	} );

}
