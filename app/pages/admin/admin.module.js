'use strict';
import angular from 'angular';

angular.module('dcApp.admin', [
	'dcApp.admin.publisher.register-queue',
]);

/* Module dependencies */
require('pages/admin/publisher/register-queue/register-queue.module');
