'use strict';
dmtApplication.factory("courseService", courseService);
function courseService($http, $window, __env) {
	var service = {
		getAllCourses : getAllCourses,
		getAllTechnologies : getAllTechnologies,
		create : create
	}, url = __env.baseUrl + __env.context,
	data =  {
			
			"technologyId": 34,
			"name": "anging Dimensions an",
			"estHrs": 1,
			"createdDate": "2015-02-27",
			"updatedDate": "2015-02-27",
			"description": "java"
			};
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
			data : data
		}).then(function(response) {
			// success
		}, function(response) { // optional
			// failed
		});
	}

}
