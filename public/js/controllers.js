'use strict';

/* Controllers */

angular.module('poApp.controllers', []).
controller('PoController', function($scope, $http) {
 
	$scope.getPO = function(){

		$http.get('/purchaseorder/api/v1/po').
			success(function(data, status, headers, config) {
			$scope.po = data;
		});
	}
	
	$scope.submitPO = function() {
		var poData = {};
		poData.ponumber= $scope.ponumber;
		poData.podate= $scope.podate;
		poData.vendor= $scope.vendor;
		console.log("poData is " + poData);

	    $http.post('/purchaseorder/api/v1/po',poData)
	    .success(function(data, status, headers, config) {
	        console.log("Successfully registered po " + data);  
	    }).error(function(data, status, headers, config) { // optional
	       console.log("po registration failed " + data);     
    	});
	}
});


angular.module('poApp.controllers').controller('ProductController', function($scope,$http) {
	
	$scope.getProduct = function(){

		$http.get('/purchaseorder/api/v1/product').
			success(function(data, status, headers, config) {
			$scope.products = data;
		});
	}

	$scope.submitProductForm = function() {
		var productData = {};
		productData.productName= $scope.productName;
		productData.productPrice= $scope.productPrice;
		console.log("productData is " + productData);

	    $http.post('/purchaseorder/api/v1/product',productData)
	    .success(function(data, status, headers, config) {
	        console.log("Successfully registered product " + data);  
	    }).error(function(data, status, headers, config) { // optional
	       console.log("product registration failed " + data);     
    	});
	}

});

