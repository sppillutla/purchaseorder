'use strict';

/* Controllers */

angular.module('poApp').
controller('PoController', function($rootScope,$timeout,$filter,$scope, $http,poFactoryExample,SubmitPOService,version,$window) {

 
	$scope.getPO = function(){
		console.log("rootScope.globalusername is " + $rootScope.globalusername); 
		$scope.username = "john";
		$scope.username = $filter('uppercase')($scope.username);

             console.log("username is " + $scope.username);
             console.log("scope.pos before is " + $scope.pos);
             poFactoryExample.getPO(function(err,data){
                      if(!err){
			$scope.pos = data;	
                      }
		});
             console.log("scope.pos after is " + $scope.pos);
             console.log("value version is " + version);
	}
	
$scope.promise = $timeout($scope.getPO, 1000);
	$scope.submitPO = function() {
		var poData = {};
		poData.ponumber= $scope.ponumber;
		poData.podate= $scope.podate;
		poData.vendor= $scope.povendor;
		console.log("poData is " + JSON.stringify(poData));

	SubmitPOService.submitPO(poData)
	.then(function(data){
	        console.log("Successfully registered po " + data);  
		
	}).catch(function(data){

	       console.log("po registration failed " + data);     
	});
	
	}
});


angular.module('poApp').controller('ProductController', function($rootScope,$scope,$http) {
$rootScope.globalusername = 'John';	
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

