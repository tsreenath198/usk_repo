'use strict';
dmtApplication.factory("clientService", clientService);
function clientService($http, $window, __env) {
	var service = {
		getAllTasks : getAllTasks,
		getAllStatus : getAllStatus,
		getAllEmployees : getAllEmployees
	}, url = __env.baseUrl + __env.context;
	return service;
	function getAllTasks() {
		return $http.get(url + "/taskLists/readAll");
	}
	function getAllStatus() {
		return $http.get("./mock/status.json");
	}
	function getAllEmployees() {
		return $http.get(url + "/employees/readAll");
	}
}
