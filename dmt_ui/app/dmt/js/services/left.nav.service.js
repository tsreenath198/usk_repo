'use strict';
dmtApplication.factory("leftNavService", leftNavService);
function leftNavService($http, $window, __env) {
	var service = {
		getAllTabs : getAllTabs		
	};
	return service;	
	function getAllTabs() {
		return $http.get("./mock/tabs.json");
	}

}
