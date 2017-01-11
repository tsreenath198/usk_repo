/*(function () {*/
    'use strict';
    
    dmtApplication.factory("invoiceService", invoiceService);
    function invoiceService($http,__env,$window) {
           var service = {
          getAllInVoices:getAllInVoices, 
           create:create,
           update:update
                   
          }, url = __env.baseUrl + __env.context
       return service;
       function getAllInVoices() {
                return $http.get(url + "/invoices/readAll");  
              }

    function create(jsonData) {
    return $http({
      url : url + '/invoices/create',
      method : "POST",
      data : jsonData
    }).then(function(response) {
      // success
    }, function(response) { // optional
      // failed
    });
  }
  
  function update(jsonData) {
    return $http({
      url : url + '/invoices/update',
      method : "POST",
      data : jsonData
    }).then(function(response) {
      // success
    }, function(response) { // optional
      // failed
    });
  }
      

		    
    }
/*}());*/