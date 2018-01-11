'use strict';
dmtApplication.factory("evaluationService", evaluationService);
function evaluationService($http, $window, __env) {
	var service = {
        getAllEmployees : getAllEmployees,
        getAllMonth:getAllMonth,
        getAllEvaluations:getAllEvaluations,
		create : create,
		update : update,
		deleteRow:deleteRow
	}, url = __env.baseUrl + __env.context
    return service;
    
	function getAllEmployees() {
		return $http.get(url+"/employees/readAll");
    }
    function getAllMonth() {
        return $http.get("./mock/month.json");
      }
    function getAllEvaluations() {
		return $http.get(url+"/evaluation/readAll");
	}
function deleteRow(data) {
		return $http({
			url : url +'/evaluation/delete?id='+data,
			method : "POST"
		}).then(function(response) {
			// success
		}, function(response) { // optional
			// failed
		});
	}
	function create(data) {
		return $http({
			url : url +'/evaluation/create',
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
			url :url +'/evaluation/update',
			method : "POST",
			data : data
		}).then(function(response) {
			// success
		}, function(response) { // optional
			// failed
		});
	}

}
