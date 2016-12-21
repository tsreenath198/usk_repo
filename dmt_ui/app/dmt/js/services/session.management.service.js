/*(function () {*/
    'use strict';
    
    dmtApplication.factory("SessionManagementService", SessionManagementService);
    function SessionManagementService($http,__env,$window) {
           var service = {
		        timeCheck: timeCheck,
            keepALive: keepALive,
            logout:logout,
            timedOut:timedOut,
            url:""       
		   };
    	 return service;
       function timeCheck() {
        		    //return $http.get(__env.baseUrl+__env.context+__env.sessionTimeCheck);
                return $http.get("./mock/time-check.json");
		   }

       function keepALive() {
                //return $http.get(__env.baseUrl+__env.context+__env.sessionKeepAlive);
                return $http.get("./mock/keep-alive.json");
       }
       function logout() {
                $window.location.replace(__env.baseUrl+__env.context+__env.logoutPath);
       }
       function timedOut() {
                $window.location.replace(__env.baseUrl+__env.context+__env.logoutPath);
       }

		    
    }
/*}());*/