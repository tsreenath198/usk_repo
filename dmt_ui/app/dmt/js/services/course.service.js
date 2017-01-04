'use strict';
dmtApplication.factory("courseService", courseService);
function courseService($http, $window, __env) {
	var service = {
		getAllCourses : getAllCourses,
		getAllTechnologies : getAllTechnologies,
		create : create,
		update : update
	}, url = __env.baseUrl + __env.context
	return service;
	
	function getAllCourses() {
		return $http.get(url + "/courses/readAll");
	}
	function getAllTechnologies() {
		return $http.get(url + "/technologies/readAll");
	}

	function create(jsonData) {
		return $http({
			url : url + '/courses/create',
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
			url : url + '/courses/update',
			method : "POST",
			data : jsonData
		}).then(function(response) {
			// success
		}, function(response) { // optional
			// failed
		});
	}

}
