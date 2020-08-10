'use strict';

import angular from 'angular';
// Enable this line and the .run line to enable uiRouter visualizer
// import { visualizer } from '@uirouter/visualizer';

angular.module('dcApp', [
	'dcApp.config',

	/* Pages */
	'dcApp.admin',
	'dcApp.common'
]);
// Enable this line and the import line to enable uiRouter visualizer
// angular.module('dcApp').run(['$uiRouter', ($uiRouter) => visualizer($uiRouter) ]);

/* Config files */
require('scripts/app-config/app-config.module');
require('scripts/helper/downloadfix');
require('scripts/helper/helper');

/* main module files */
require('scripts/app.controller');

/* Other main modules */
require('pages/admin/admin.module');
require('pages/common.module');
