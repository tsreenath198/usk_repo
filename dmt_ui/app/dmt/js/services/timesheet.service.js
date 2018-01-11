 'use strict';
      
      dmtApplication.factory("timesheetService", timesheetService);
      function timesheetService($http,__env,$window) {
             var service = {
            getAllTimesheets:getAllTimesheets, 
             create:create,
             update:update,
             deleteRow:deleteRow,
             getAllTimes:getAllTimes,
             getAllCategories:getAllCategories,
             getAllEmployees:getAllEmployees,
             getTasksById:getTasksById
                     
            }, url = __env.baseUrl + __env.context
         return service;
         function getAllTimesheets() {
                  return $http.get(url + "/timeSheets/readAll");  
                }
          function getAllEmployees() {
                  return $http.get(url + "/employees/readAll");  
                }      

        function getAllTimes() {
          return $http.get("./mock/timeConstants.json");
        }
        function getAllCategories() {
          return $http.get("./mock/timesheetCategory.json");
        }
        function getTasksById(data) {
        return $http({
         url : url + '/toDos/readAllById',
         method : "POST",
         data : data
      });
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
    function deleteRow(id) {
      return $http({
        url : url + '/timeSheets/delete?id='+id,
        method : "POST"
      }).then(function(response) {
        // success
      }, function(response) { // optional
        // failed
      });
    }
        

          
      }