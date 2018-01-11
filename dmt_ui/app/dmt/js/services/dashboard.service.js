/*(function () {*/
    'use strict';
    
    dmtApplication.factory("DashboardService", DashboardService);
    function DashboardService($http,__env,$window,$rootScope) {
           var service = {
		        getAllApplications: getAllApplications,
            getApplicationByName: getApplicationByName,
            saveApplication:saveApplication,
            deleteApplication:deleteApplication,

          }, url = __env.baseUrl + __env.context
    	 return service;
       function getAllApplications() {
        		   
      return $http.get(url+"/dashboardSummary/readAll");
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