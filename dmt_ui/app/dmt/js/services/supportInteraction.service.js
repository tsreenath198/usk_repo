/*(function () {*/
'use strict';

dmtApplication.factory("supportInteractionService", supportInteractionService);
function supportInteractionService($http, __env, $window) {

	var service = {
		getAllSupportInteractions : getAllSupportInteractions,
		getAllEmployees : getAllEmployees,
		getAllTrainees : getAllTrainees,
		create : create,
		update: update

	},url = __env.baseUrl + __env.context
	return service;
	function getAllSupportInteractions() {
		return $http.get(url + "/supportInteractions/readAll");
	}

	function getAllEmployees() {
		return $http.get(url + "/employees/readAll");
	}
	function getAllTrainees() {
		return $http.get(url + "/trainees/readAll");
	}
	function create(jsonData) {
		return $http({
			url : url + '/supportInteractions/create',
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
			url : url + '/supportInteractions/update',
			method : "POST",
			data : jsonData
		}).then(function(response) {
			// success
		}, function(response) { // optional
			// failed
		});
	}



	

	
}

/* }()); */