/*(function() {*/
'use strict';
dmtApplication.controller("loginController", loginController);

function loginController($scope, loginService, Excel, $state, $mdDialog,$location,
		$mdToast, $timeout, $mdSidenav, $log) {
	var self = {
		init : init
	};
	function init() {
		
		$scope.record = {			
			"userName" : "",
			"password" : ""
		};
		$scope.validate = function(){
		loginService.validate($scope.record).then(function(response) {
				$location.path("/trainer");
			/*if(response === "true"){
				$location.path("/trainer");
			}else{
				$location.path("/login");
			}*/
			
		});
	};
		
	}
	init();

	return self;
};

