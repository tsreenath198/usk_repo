/*(function () {*/
    'use strict';
    
    dmtApplication.factory("DashboardService", DashboardService);
    function DashboardService($http,__env,$window) {
           var service = {
		        getAllApplications: getAllApplications,
            getApplicationByName: getApplicationByName,
            saveApplication:saveApplication,
            deleteApplication:deleteApplication,

          };
    	 return service;
       function getAllApplications() {
        		    //return $http.get(__env.baseUrl+__env.context+__env.api+"/app");
                return $http.get("http://localhost:8011/dmt_rest_service/dashboardSummary/readAll");
		   }

       function getApplicationByName(data) {
                //return $http.get(__env.baseUrl+__env.context+__env.api+"/app/"+name);
                return $http.get("./mock/applications.json");
       }
       function saveApplication(data) {
         //return $http.post(__env.baseUrl+__env.context+__env.api+"/app");
                return $http.get("./mock/applications.json");
       }
       function deleteApplication(data) {
               //return $http.delete(__env.baseUrl+__env.context+__env.api+"/app/"+name);
                return $http.get("./mock/applications.json");
       }

		    
    }
/*}());*/