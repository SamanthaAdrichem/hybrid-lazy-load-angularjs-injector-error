'use strict';
import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import gettext from 'angular-gettext';

angular.module('dcApp.admin.publisher.register-queue', [
	'dcElements',
	uiRouter,
	gettext
] );

/* Module dependencies */
require('scripts/modules/elements/elements.module');

/* Module files */
require('pages/admin/publisher/register-queue/register-queue.controller');
require('pages/admin/publisher/register-queue/register-queue.routes');

