'use strict';
dmtApplication.factory("clientService", clientService);
function clientService($http, $window, __env) {
	var service = {
		getAllClients : getAllClients,
		getAllTechnologies : getAllTechnologies,
		create : create,
		update : update,
		deleteRow:deleteRow,
		getContactsById:getContactsById
	}, url = __env.baseUrl + __env.context
	return service;
	
	function getAllClients() {
		return $http.get(url + "/clients/readAll");
	}
	function getAllTechnologies() {
		return $http.get(url + "/technologies/readAll");
	}
	function getContactsById(data) {
		return $http({
			url : url + '/contacts/readByValues',
			method : "POST",
			data : data
		});
	}

	function create(jsonData) {
		return $http({
			url : url + '/clients/create',
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
			url : url + '/clients/update',
			method : "POST",
			data : jsonData
		}).then(function(response) {
			// success
		}, function(response) { // optional
			// failed
		});
	}
	function deleteRow(id) {
		return $http({
			url : url + '/clients/delete?id='+id,
			method : "POST"
		}).then(function(response) {
			// success
		}, function(response) { // optional
			// failed
		});
	}

}
