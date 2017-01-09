'use strict';

dmtApplication.factory("BatchAttendanceService", BatchAttendanceService);
function BatchAttendanceService($http, __env, $window) {

	var service = {
		getAllBatchAttendances : getAllBatchAttendances,
		traineesList:traineesList,
		/*create : create,
		update: update*/

	},url = __env.baseUrl + __env.context
	return service;
	function getAllBatchAttendances() {
		return $http.get(url + "/batches/readAll");
	}
	
	function traineesList(jsonData) {
		return $http.getById(url + "/trainees/readAll");
	}

	/*function create(jsonData) {
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
	}*/	
}