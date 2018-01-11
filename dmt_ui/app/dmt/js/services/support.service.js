'use strict';
dmtApplication.factory("supportService", supportService);
function supportService($http, $window, __env) {
	var service = {
		getAllSupports : getAllSupports,
		getAllStatus : getAllStatus,
		create : create,
		update:update,
		deleteRow:deleteRow,
		getAllEmployees : getAllEmployees,
		getAllTrainees : getAllTrainees,
		getAllTrainers : getAllTrainers,
		getAlltimeConstants : getAlltimeConstants,
		getAllpaidByConstants : getAllpaidByConstants,
		getAllreceivedConstants : getAllreceivedConstants,
		getAllpaidConstants : getAllpaidConstants
	}, url = __env.baseUrl + __env.context;
	return service;
	function getAllSupports() {
		return $http.get(url + "/supports/readAll");
	}
	function create(data) {
		return $http({
			url : url + '/supports/create',
			method : "POST",
			data : data
		}).then(function(response) {
			// success
		}, function(response) { // optional
			// failed
		});
	}
	function deleteRow(id) {
		return $http({
			url : url + '/supports/delete?id='+id,
			method : "POST"
		}).then(function(response) {
			// success
		}, function(response) { // optional
			// failed
		});
	}
	function update(data) {
		return $http({
			url : url + '/supports/update',
			method : "POST",
			data : data
		}).then(function(response) {
			// success
		}, function(response) { // optional
			// failed
		});
	}
	function getAllStatus() {
		return $http.get("./mock/feeStatus.json");
	}
	function getAllEmployees() {
		return $http.get(url + "/employees/readAll");
	}
	function getAllTrainees() {
		return $http.get(url + "/trainees/readAll");
	}
	function getAllTrainers() {
		return $http.get(url + "/trainers/readAll");
	}

	function getAlltimeConstants() {
		return $http.get("./mock/timeConstants.json");
	}
	function getAllpaidByConstants() {
		return $http.get("./mock/paidByConstants.json");
	}
	function getAllreceivedConstants() {
		return $http.get("./mock/receivedStatusConstants.json");
	}
	function getAllpaidConstants() {
		return $http.get("./mock/paidStatusConstants.json");
	}


}
