'use strict';
dmtApplication.factory("interviewService", interviewService);
function interviewService($http, $window, __env) {
	var service = {
		getAllInterviews : getAllInterviews,
		create:create,
		update:update,
		getAllTrainees : getAllTrainees,
		getAllEmployees : getAllEmployees,
		getAllClients:getAllClients,
		getAllTimes:getAllTimes,
		getAllPaidStatus:getAllPaidStatus,
		getAllReceivedStatus:getAllReceivedStatus,
		getAllStatus:getAllStatus
	}, url = __env.baseUrl + __env.context;
	return service;
	function getAllInterviews() {
		return $http.get(url + "/interviews/readAll"); 
	}

	function create(data) {
		return $http({
			url : url + '/interviews/create',
			method : "POST",
			data : data
		}).then(function(response) {
			console.log("success");
			// success
		}, function(response) { // optional
			// failed
		});
	}
	function update(data) {
		return $http({
			url : url + '/interviews/update',
			method : "POST",
			data : data
		}).then(function(response) {
			console.log("success");
			// success
		}, function(response) { // optional
			// failed
		});
	}
	function getAllTrainees() {
		return $http.get(url+"/trainees/readAll");
	}
	function getAllEmployees() {
		return $http.get(url + "/employees/readAll");
	}
	function getAllClients() {
		return $http.get(url + "/clients/readAll");
	}
	function getAllTimes() {
		return $http.get("./mock/timeConstants.json");
	}
	function getAllPaidStatus() {
		return $http.get("./mock/paidStatusConstants.json");
	}
	function getAllReceivedStatus() {
		return $http.get("./mock/receivedStatusConstants.json");
	}function getAllStatus() {
		return $http.get("./mock/feeStatus.json");
	}
}
