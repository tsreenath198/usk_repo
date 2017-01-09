/*(function () {*/
    'use strict';
    
    dmtApplication.factory("TaskService", TaskService);
    function TaskService($http,__env,$window) {
           var service = {
           getAllTask: getAllTask, 
           create:create,
           update:update
                   
          }, url = __env.baseUrl + __env.context
       return service;
       function getAllTask() {
                return $http.get(url + "/toDos/readAll");  
              }

    function create(jsonData) {
    return $http({
      url : url + '/toDos/create',
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
      url : url + '/toDos/update',
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