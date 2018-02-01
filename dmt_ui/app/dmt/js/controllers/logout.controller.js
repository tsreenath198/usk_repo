/*(function () {*/
'use strict';

dmtApplication.controller("LogoutController", LogoutController);

function LogoutController($scope, LogoutService) {
	var vm = this;
	vm.logout = logout;
	var logout = function () {
		LogoutService.logout();
	};
	logout();

}
/*}());*/