/*(function () {*/
    'use strict';
    
    dmtApplication.factory("timesheetService", timesheetService);
    function timesheetService($http,__env,$window) {
           var service = {
          getAllTimesheets:getAllTimesheets, 
           create:create,
           update:update
                   
          }, url = __env.baseUrl + __env.context
       return service;
       function getAllTimesheets() {
                return $http.get(url + "/timeSheets/readAll");  
              }

    function create(jsonData) {
    return $http({
      url : url + '/timeSheets/create',
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
      url : url + '/timeSheets/update',
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