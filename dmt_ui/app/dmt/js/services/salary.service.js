'use strict';
dmtApplication.factory("salaryService", salaryService);
function salaryService($http, $window, __env) {
	var service = {
		getAllSalaries : getAllSalaries,
		getAllEmployees : getAllEmployees,
		create : create,
		update : update
	}, url = __env.baseUrl + __env.context
	return service;
	
	function getAllSalaries() {
		return $http.get(url + "/salary/readAll");
	}
	function getAllEmployees() {
		return $http.get(url + "/employees/readAll");
	}

	function create(data) {
		return $http({
			url : url + '/salary/create',
			method : "POST",
			data : data
		}).then(function(response) {
			// success
		}, function(response) { // optional
			// failed
		});
	}
	function update(data) {
		return $http({
			url : url + '/salary/update',
			method : "POST",
			data : data
		}).then(function(response) {
			// success
		}, function(response) { // optional
			// failed
		});
	}

}
