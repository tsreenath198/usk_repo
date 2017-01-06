/*(function () {*/
    'use strict';
    
    dmtApplication.factory("TechnologyService", TechnologyService);
    function TechnologyService($http,__env,$window) {
           var service = {
           getAllTechnologies: getAllTechnologies, 
           create:create,
           update:update
                   
          }, url = __env.baseUrl + __env.context
       return service;
       function getAllTechnologies() {
                return $http.get(url + "/technologies/readAll");  
              }

    function create(jsonData) {
    return $http({
      url : url + '/technologies/create',
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
      url : url + '/technologies/update',
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