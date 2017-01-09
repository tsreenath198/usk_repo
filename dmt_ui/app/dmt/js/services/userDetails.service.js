/*(function () {*/
    'use strict';
    
    dmtApplication.factory("UserDetailsService", UserDetailsService);
    function UserDetailsService($http,__env,$window) {
           var service = {
           getAllUserDetails: getAllUserDetails, 
           create:create,
           update:update
                   
          }, url = __env.baseUrl + __env.context
       return service;
       function getAllUserDetails() {
                return $http.get(url + "/userDetails/readAll");  
              }

    function create(jsonData) {
    return $http({
      url : url + '/userDetails/create',
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
      url : url + '/userDetails/update',
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