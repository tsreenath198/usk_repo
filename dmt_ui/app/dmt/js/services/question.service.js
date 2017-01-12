'use strict';
dmtApplication.factory("questionService", questionService);
function questionService($http, $window, __env) {
	var service = {
		getAllQuestion : getAllQuestion,
		//getAllQuestion : getAllQuestion,
		create : create,
		update : update
	}, url = __env.baseUrl + __env.context
	return service;
	
	function getAllQuestion() {
		return $http.get(url + "/questions/readAll");
	}
	

	function create(jsonData) {
		return $http({
			url : url + '/questions/create',
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
			url : url + '/questions/update',
			method : "POST",
			data : jsonData
		}).then(function(response) {
			// success
		}, function(response) { // optional
			// failed
		});
	}

}
