'use strict';
angular.module('poApp', [
	'ui.router' //this is the dependency on ui.router module,
]);
angular.module('poApp').config(function($stateProvider, $urlRouterProvider, $locationProvider) {
	$stateProvider.state('po', {
		url: '/po',
		controller: 'PoController',
		templateUrl: 'partials/po.html'
	}).state('product', {
		url: '/product',
		controller: 'ProductController',
		templateUrl: 'partials/product.html'
	});
	$urlRouterProvider.otherwise('/po');
	//$locationProvider.html5Mode(true);
});
