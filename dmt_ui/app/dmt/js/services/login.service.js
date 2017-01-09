
'use strict';
dmtApplication.factory("loginService", loginService);
function loginService($http, $window, __env) {
	var service = {
		validate : validate
	}, url = __env.baseUrl + __env.context
	return service;
	
	function validate(data) {
		return $http({
			url : url + '/userDetails/readByValues',
			method : "POST",
			data : data
		}).then(function(response) {
			// success
		}, function(response) { // optional
			// failed
		});
	}
}
