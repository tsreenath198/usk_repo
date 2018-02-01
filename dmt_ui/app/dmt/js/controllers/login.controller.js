/*(function() {*/
'use strict';
dmtApplication.controller("loginController", loginController);

function loginController($scope, loginService, Excel, $state, $mdDialog, $location,
	$mdToast, $timeout, $mdSidenav, $log) {
	var self = {
		init: init
	};

	function init() {
		$scope.record = {
			"username": "",
			"password": ""
		};
		$scope.login = function () {
			if ($scope.record.userName !== "" && $scope.record.password !== "") {
				$location.path("/dashboard");
				loginService.validate($scope.record).then(function (response) {

				});
			} else {
				alert("Provide Username and password");
			}
		};
	}
	init();
	return self;
};