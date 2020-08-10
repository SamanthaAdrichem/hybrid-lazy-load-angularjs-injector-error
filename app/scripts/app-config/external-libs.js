'use strict';
import angular from 'angular';
import 'angular-animate';

/**
 * Animate.CSS
 */
require('animate.css/animate.css');

angular.module('dcApp.config')
	.constant("$sessionStorage", window.sessionStorage);
