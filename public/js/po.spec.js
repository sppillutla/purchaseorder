

describe('PO factory test', function() {
        var poFactory;
        var podata;
        var $controller;
	
	beforeEach(angular.mock.module('poApp'));
	beforeEach(inject(function(poFactoryExample) {
    		poFactory = poFactoryExample;
  	}));

  beforeEach(inject(function(_$controller_){
    $controller = _$controller_;
  }));
	it('newFunc should set the var1 to newValue', function() {
		var $scope = {};
      		var controller = $controller('PoController', { $scope: $scope });
		$scope.newFunc("myValue1");
		expect($scope.var2).toContain("myValue1");
  	});
	it('module should exist', function() {
		expect(poFactory).toBeDefined();
  	});
	it('module should get existing pos', function() {
		poFactory.getPO(function(err,data){
                 podata = data;
                 console.log("podata is " + podata);
                 expect(podata[0].ponumber).toContain('ponumber');
                });
  	});
});
