/*(function () {*/
'use strict';

dmtApplication.factory("TrainerService", TrainerService);
function TrainerService($http, __env, $window) {

	var service = {
		getAllTrainers : getAllTrainers,
		getAllEmployees : getAllEmployees,
		getAllTechnologies : getAllTechnologies,
		create : create,
		update: update,
		deleteRow:deleteRow

	},url = __env.baseUrl + __env.context
	return service;
	function getAllTrainers() {
		return $http.get(url + "/trainers/readAll");
	}

	function getAllEmployees() {
		return $http.get(url + "/employees/readAll");
	}
	function getAllTechnologies() {
		return $http.get(url + "/technologies/readAll");
	}
	function create(jsonData) {
		return $http({
			url : url + '/trainers/create',
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
			url : url + '/trainers/update',
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
			url : url + '/trainers/delete?id='+data,
			method : "POST"
		}).then(function(response) {
			// success
		}, function(response) { // optional
			// failed
		});
	}	
}

/* }()); */