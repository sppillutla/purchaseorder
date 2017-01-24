

describe('PO factory test', function() {
        var poFactory;
        var podata;
	
	beforeEach(angular.mock.module('poApp'));
	beforeEach(inject(function(poFactoryExample) {
    		poFactory = poFactoryExample;
  	}));

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
