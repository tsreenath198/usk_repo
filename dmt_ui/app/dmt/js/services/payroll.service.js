'use strict';
dmtApplication.factory("payrollService", payrollService);
function payrollService($http, $window, __env) {
	var service = {
		getAllPayRolls : getAllPayRolls,
		getAllEmployees : getAllEmployees,
		create : create,
		update : update,
		deleteRow:deleteRow
	}, url = __env.baseUrl + __env.context
	return service;
	
	function getAllPayRolls() {
		return $http.get(url +"/payroll/readAll");
	}
	function getAllEmployees() {
		return $http.get(url +"/employees/readAll");
	}
	function getAllMonth() {
    return $http.get("./mock/month.json");
  }  

function deleteRow(data) {
		return $http({
			url : url +'/payroll/delete?id='+data,
			method : "POST"
		}).then(function(response) {
			// success
		}, function(response) { // optional
			// failed
		});
	}
	function create(data) {
		return $http({
			url : url +'/payroll/readByMonthAndId',
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
			url :url +'/dmt_rest_service/payroll/update',
			method : "POST",
			data : data
		}).then(function(response) {
			// success
		}, function(response) { // optional
			// failed
		});
	}

}
