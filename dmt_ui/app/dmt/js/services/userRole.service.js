/*(function () {*/
    'use strict';
    
    dmtApplication.factory("userRoleService", userRoleService);
    function userRoleService($http,__env,$window) {
           var service = {
           getAllUserRoles:getAllUserRoles, 
           create:create,
           update:update
                   
          }, url = __env.baseUrl + __env.context
       return service;
       function getAllUserRoles() {
                return $http.get(url + "/userRoles/readAll");  
              }

    function create(jsonData) {
    return $http({
      url : url + '/userRoles/create',
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