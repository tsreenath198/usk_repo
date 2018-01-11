'use strict';
dmtApplication.factory("expenseService", expenseService);
function expenseService($http, $window, __env) {
	var service = {
        getAllEmployees : getAllEmployees,
        getAllexpenses:getAllexpenses,
		create : create,
		update : update,
		deleteRow:deleteRow
	}, url = __env.baseUrl + __env.context
    return service;
    
	function getAllEmployees() {
		return $http.get(url +"/employees/readAll");
    }
    function getAllexpenses() {
		return $http.get(url +"/expenses/readAll");
	}
function deleteRow(data) {
		return $http({
			url : url +'/expenses/delete?id='+data,
			method : "POST"
		}).then(function(response) {
			// success
		}, function(response) { // optional
			// failed
		});
	}
	function create(data) {
		return $http({
			url : url +'/expenses/create',
			method : "POST",
			data : data
		}).then(function(response) {
			// success
		}, function(response) { // optional
			// failed
		});
	}
	function update(data) {
		return $http({
			url :url +'/expenses/update',
			method : "POST",
			data : data
		}).then(function(response) {
			// success
		}, function(response) { // optional
			// failed
		});
	}

}
