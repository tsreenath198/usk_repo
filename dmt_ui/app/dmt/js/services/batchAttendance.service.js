'use strict';

dmtApplication.factory("batchAttendanceService", batchAttendanceService);
function batchAttendanceService($http, __env, $window) {

	var service = {
		getAllBatchAttendances : getAllBatchAttendances,
		trainees:trainees,
		create : create,
		update: update

	},url = __env.baseUrl + __env.context
	return service;
	function getAllBatchAttendances() {
		return $http.get(url + "/batches/readAll");
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
}