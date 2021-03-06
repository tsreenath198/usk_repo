'use strict';
dmtApplication.factory("salaryService", salaryService);
function salaryService($http, $window, __env) {
	var service = {
		getAllSalaries : getAllSalaries,
		getAllEmployees : getAllEmployees,
		getAllMonth : getAllMonth,
		getAllBatchesBasedOnEmployeeId:getAllBatchesBasedOnEmployeeId,
		create : create,
		update : update,
		deleteRow:deleteRow
	}, url = __env.baseUrl + __env.context
	return service;
	
	function getAllSalaries() {
		return $http.get(url + "/payroll/readAll");
	}
	function getAllEmployees() {
		return $http.get(url + "/employees/readAll");
	}
	function getAllMonth() {
    return $http.get("./mock/month.json");
  }

  function getAllBatchesBasedOnEmployeeId(id) {
	return $http.get(url + "/batches/readAllById?id="+id);
}

function deleteRow(data) {
		return $http({
			url : url + '/salary/delete?id='+data,
			method : "POST"
		}).then(function(response) {
			// success
		}, function(response) { // optional
			// failed
		});
	}
	function create(data) {
		return $http({
			url : url + '/salary/create',
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
			url : url + '/salary/update',
			method : "POST",
			data : data
		}).then(function(response) {
			// success
		}, function(response) { // optional
			// failed
		});
	}

}
