'use strict';
angular.module('poApp', [
	'poApp.controllers',
	'ui.router' //this is the dependency on ui.router module
]);
angular.module('poApp').config(function($stateProvider, $urlRouterProvider, $locationProvider) {
	$stateProvider.state('po', {
		url: 'po',
		controller: 'PoController',
		templateUrl: 'public/partials/po.html'
	}).state('product', {
		url: 'product',
		controller: 'ProductController',
		templateUrl: 'public/partials/product.html'
	});
	$urlRouterProvider.otherwise('/po');
	//$locationProvider.html5Mode(true);
});
