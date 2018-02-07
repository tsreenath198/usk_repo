/*(function () {*/
    'use strict';
    
    dmtApplication.factory("technologyService", technologyService);
    function technologyService($http,__env,$window) {
           var service = {
           getAllTechnologies: getAllTechnologies, 
           getAllTrainersBasedOnTechnologyName:getAllTrainersBasedOnTechnologyName,
           create:create,
           update:update,
           deleteRow:deleteRow
                   
          }, url = __env.baseUrl + __env.context
       return service;
       function getAllTechnologies() {
                return $http.get(url + "/technology/readAll");  
              }

              function getAllTrainersBasedOnTechnologyName(id) {
    return $http.get(url + "/trainers/readAllById?id="+id);
  }

    function create(jsonData) {
    return $http({
      url : url + '/technology/create',
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
      url : url + '/technology/update',
      method : "POST",
      data : jsonData
    });
  }
  function deleteRow(id) {
    return $http({
      url : url + '/technology/delete?id='+id,
      method : "POST"
    }).then(function(response) {
      // success
    }, function(response) { // optional
      // failed
    });
  }
      

        
    }
/*}());*/