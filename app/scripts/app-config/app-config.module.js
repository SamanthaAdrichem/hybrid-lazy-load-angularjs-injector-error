'use strict';
import angular from 'angular';
import ngRollbar from 'ng-rollbar';
import uiRouter from '@uirouter/angularjs';
import { upgradeModule } from "@uirouter/angular-hybrid";

angular.module('dcApp.config', [
	ngRollbar,
	uiRouter,
	upgradeModule.name
]);

/* Config files */
require('scripts/app-config/compile');
require('scripts/app-config/errorhandler');
require('scripts/app-config/external-libs');
require('scripts/app-config/http');
require('scripts/app-config/routes');
