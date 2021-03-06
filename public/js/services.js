angular.module('poApp')

.value("version","1.0")

.factory('poFactoryExample', function ($http) {
    var data = {
        ponumber: ''
    };

    return {
        getPO: function (cb) {
$http({
  method: 'GET',
  url: 'http://localhost:3000/purchaseorder/api/v1/po'
}).then(function(data) {
                        console.log("data is " + data);
                        console.log("json parse of data is " + JSON.stringify(data));
                        return cb(null,data);
                });

        }
    };

})
 


.service('SubmitPOService', ['$http', '$q', function SubmitPOService($http, $q ){

        function submitPO(poObject){
            var deferred = $q.defer();
            $http.post('/purchaseorder/api/v1/po',poObject)
                .success(function(response){

                    deferred.resolve(response);

                })
                .error(function(err){
                    deferred.reject(err);
                });


            return deferred.promise;

        };


        return {
            submitPO : submitPO 
        };
    }]);

