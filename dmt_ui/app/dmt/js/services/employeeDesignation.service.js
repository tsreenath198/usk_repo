/*(function () {*/
    'use strict';
    
    dmtApplication.factory("employeeDesignationService", employeeDesignationService);
    function employeeDesignationService($http,__env,$window) {
           var service = {
           getAllEmployeeDesignations:getAllEmployeeDesignations, 
           create:create,
           update:update,
           deleteRow:deleteRow       
          }, url = __env.baseUrl + __env.context
       return service;
       function getAllEmployeeDesignations() {
                return $http.get(url + "/employeesDesignation/readAll");  
              }

    function create(jsonData) {
    return $http({
      url : url + '/employeesDesignation/create',
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
      url : url + '/employeesDesignation/update',
      method : "POST",
      data : jsonData
    }).then(function(response) {
      // success
    }, function(response) { // optional
      // failed
    });
  }
  function deleteRow(data) {
    return $http({
      url : url + '/employeesDesignation/delete?id='+data,
      method : "POST"
    }).then(function(response) {
      // success
    }, function(response) { // optional
      // failed
    });
  }

        
    }
/*}());*/