'use strict';

dmtApplication.factory("batchService", batchService);
function batchService($http, __env, $window) {

	var service = {
		getAllBatches : getAllBatches,
		getAllTrainers:getAllTrainers,
		getAllTimeConstants : getAllTimeConstants,
		getAllPaidStatus : getAllPaidStatus,
		getAllReceivedStatus : getAllReceivedStatus,
		getAllStatus : getAllStatus,
		getAllTechnologies : getAllTechnologies,
		create : create,
		update : update

	}, url = __env.baseUrl + __env.context
	return service;

	function getAllBatches() {
		return $http.get(url + "/batches/readAll");
	}
	function getAllTrainers() {
		return $http.get(url + "/trainers/readAll");
	}
	function getAllTimeConstants() {
		return $http.get("./mock/timeConstants.json");
	}

	function getAllPaidStatus() {
		return $http.get("./mock/paidStatusConstants.json");
	}
	function getAllReceivedStatus() {
		return $http.get("./mock/receivedStatusConstants.json");
	}
	function getAllStatus() {
		return $http.get("./mock/feeStatus.json");
	}
	function getAllTechnologies() {
		return $http.get(url + "/technologies/readAll");
	}

	function create(jsonData) {
		return $http({
			url : url + '/batches/create',
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
			url : url + '/batches/update',
			method : "POST",
			data : jsonData
		}).then(function(response) {
			// success
		}, function(response) { // optional
			// failed
		});
	}
}
