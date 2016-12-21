'use strict';
    dmtApplication.factory("LogoutService", LogoutService);
    function LogoutService(__env,$window) {
       var service = {
		        logout: logout
       };
    	  return service;
       function logout() {
           $window.location.replace(__env.baseUrl+__env.context+__env.logoutPath);
		   }
	    
    }

