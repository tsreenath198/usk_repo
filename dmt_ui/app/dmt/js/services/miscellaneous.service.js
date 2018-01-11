'use strict';
dmtApplication.factory("miscellaneousService", miscellaneousService);
function miscellaneousService($http, $window, __env) {
	var service = {
		getAllEmployees : getAllEmployees,
		getAllMonth:getAllMonth,
        getAllmiscellaneous:getAllmiscellaneous,
		create : create,
		update : update,
		deleteRow:deleteRow
	}, url = __env.baseUrl + __env.context
    return service;
    
	function getAllEmployees() {
		return $http.get(url +"/employees/readAll");
	}
	function getAllMonth() {
        return $http.get("./mock/month.json");
      }
    function getAllmiscellaneous() {
		return $http.get(url +"/miscellaneous/readAll");
	}
function deleteRow(data) {
		return $http({
			url : url +'/miscellaneous/delete?id='+data,
			method : "POST"
		}).then(function(response) {
			// success
		}, function(response) { // optional
			// failed
		});
	}
	function create(data) {
		return $http({
			url : url +'/miscellaneous/create',
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
			url :url +'/miscellaneous/update',
			method : "POST",
			data : data
		}).then(function(response) {
			// success
		}, function(response) { // optional
			// failed
		});
	}

}
