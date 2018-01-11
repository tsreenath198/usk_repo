'use strict';

dmtApplication.factory("batchAttendanceService", batchAttendanceService);
function batchAttendanceService($http, __env, $window) {

	var service = {
		getAllBatchAttendances : getAllBatchAttendances,
		getAllBatches : getAllBatches,
		trainees:trainees,
		create : create,
		update: update,
		deleteRow:deleteRow

	},url = __env.baseUrl + __env.context
	return service;
	function getAllBatches() {
		return $http.get(url + "/batches/readAll");
	}
	function getAllBatchAttendances() {
		return $http.get(url + "/batchAttendances/readAll");
	}
	
	function trainees(batch_id) {
		return $http.get(url + "/trainees/readAllById?id="+batch_id);
	}

	function create(jsonData) {
		return $http({
			url : url + '/batchAttendances/create',
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
			url : url + '/batchAttendances/update',
			method : "POST",
			data : jsonData
		}).then(function(response) {
			// success
		}, function(response) { // optional
			// failed
		});
	}
	
	function deleteRow(data) {
		return $http({
			url : url + '/batchAttendances/delete?id='+data,
			method : "POST"
		}).then(function(response) {
			// success
		}, function(response) { // optional
			// failed
		});
	}
}