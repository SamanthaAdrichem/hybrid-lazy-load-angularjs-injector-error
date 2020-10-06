'use strict';
import angular from 'angular';
import ngRollbar from 'ng-rollbar';

angular.module('dcApp.config', [
	ngRollbar,
]);

/* Config files */
require('scripts/app-config/compile');
require('scripts/app-config/errorhandler');
require('scripts/app-config/external-libs');
require('scripts/app-config/http');
require('scripts/app-config/routes');
