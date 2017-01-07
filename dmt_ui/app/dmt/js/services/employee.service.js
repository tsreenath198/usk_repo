'use strict';

dmtApplication.factory("EmployeeService", EmployeeService);
function EmployeeService($http, __env, $window) {

	var service = {
		getAllEmployees : getAllEmployees,
		getAllRoles:getAllRoles,
		create : create,
		update : update

	}, url = __env.baseUrl + __env.context
	return service;
	function getAllEmployees() {
		return $http.get(url + "/employees/readAll");
	}
	
	function getAllRoles() {
		return $http.get("./mock/roleConstants.json");
	}

	function create(jsonData) {
		return $http({
			url : url + '/employees/create',
			method : "POST",
			data : jsonData
		}).then(function(response) {
			// success
		}, function(response) { // optional
			// failed
		});
	}

	function update(data) {
		return $http({
			url : url + '/employees/update',
			method : "POST",
			data : data
		}).then(function(response) {
			// success
			console.log("suc");
		}, function(response) { // optional
			// failed
			console.log("fai");
		});
	}
}
