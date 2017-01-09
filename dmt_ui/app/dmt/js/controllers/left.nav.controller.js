/*(function() {*/
'use strict';
dmtApplication.controller("leftNavController", leftNavController);

function leftNavController($scope, leftNavService, Excel, $state, $mdDialog,
		$mdToast, $timeout, $mdSidenav, $log) {
	var self = {
		init : init,
		buildToggler:buildToggler
	};
	function init() {
			
			leftNavService.getAllTabs().then(function(response) {
			$scope.leftTabs = response.data;
		});


	}
	function buildToggler(componentId) {
              return function() {
                $mdSidenav(componentId).toggle();
              }
        }
        $scope.init = self.init;
        $scope.toggleNavigationLeft = buildToggler('left');
	init();

	return self;
};


