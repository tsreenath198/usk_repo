'use strict';
dmtApplication.factory("oppurtunityTrackerService", oppurtunityTrackerService);
function oppurtunityTrackerService($http, $window, __env) {
	var service = {
		getAllOpportunity : getAllOpportunity,
		getAllEmployees : getAllEmployees,
		getAllProvidedFor:getAllProvidedFor,
		create : create,
		update : update
	}, url = __env.baseUrl + __env.context
	return service;
	
	function getAllOpportunity() {
		return $http.get(url + "/opportunityTrackers/readAll");
	}
	function getAllEmployees() {
		return $http.get(url + "/employees/readAll");
	}
	function getAllProvidedFor(type) {
		return $http.get(url + "/"+type+"s/readAll");
	}

	function create(jsonData) {
		return $http({
			url : url + '/opportunityTrackers/create',
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
			url : url + '/opportunityTrackers/update',
			method : "POST",
			data : jsonData
		}).then(function(response) {
			// success
		}, function(response) { // optional
			// failed
		});
	}

}
