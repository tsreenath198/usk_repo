'use strict';
dmtApplication.factory("resumeService", resumeService);
function resumeService($http, $window, __env) {
	var service = {
        getAllResumes:getAllResumes,
        getAllEmployees : getAllEmployees,
        getAllTrainees:getAllTrainees,
        getAllPaidStatus:getAllPaidStatus,
        getAllReceivedStatus:getAllReceivedStatus,
		    create : create,
		    update : update,
		    deleteRow:deleteRow
	}, url = __env.baseUrl + __env.context
    return service;
    
    function getAllResumes() {
		return $http.get(url +"/resumes/readAll");
    } 
	function getAllEmployees() {
		return $http.get(url +"/employees/readAll");
    }
    function getAllTrainees() {
		return $http.get(url +"/trainees/readAll");
    }
    function getAllPaidStatus() {
		return $http.get("./mock/paidStatusConstants.json");
	}
	function getAllReceivedStatus() {
		return $http.get("./mock/receivedStatusConstants.json");
	}
	function create(data) {
		debugger;
		return $http({
			url : url +'/resumes/create',
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
			url :url +'/resumes/update',
			method : "POST",
			data : data
		}).then(function(response) {
			// success
		}, function(response) { // optional
			// failed
		});
    }
    function deleteRow(data) {
		return $http({
			url : url +'/resumes/delete?id='+data,
			method : "POST"
		}).then(function(response) {
			// success
		}, function(response) { // optional
			// failed
		});
	}
}