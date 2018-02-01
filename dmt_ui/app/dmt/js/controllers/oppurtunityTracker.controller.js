/*(function() {*/
'use strict';
dmtApplication.controller("oppurtunityTrackerController", oppurtunityTrackerController);

function oppurtunityTrackerController($scope, oppurtunityTrackerService, Excel, $state, $mdDialog,
	$mdToast, $timeout, $mdSidenav, $log, $rootScope) {
	var self = {
		init: init
	};

	function init() {
		$rootScope.currentController = 'Oppurtunity Tracker';
		$scope.currentPage = 'Create';
		var current = $state.current.name;
		$scope.currentState = current.split(/[\s.]+/);
		$scope.currentRoute = $scope.currentState[$scope.currentState.length - 1];
		$scope.customFullscreen = false;
		$scope.updatePage = false;
		$scope.oppurtunityTrackersData = [];
		$scope.collection = [];
		$scope.selected = [];
		$scope.headerEnable = {};
		$scope.exportData = [];

		$scope.types = [{
			"key": "trainee",
			"value": "Trainee"
		}, {
			"key": "trainer",
			"value": "Trainer"
		}, {
			"key": "client",
			"value": "Client"
		}, {
			"key": "employee",
			"value": "Employee"
		}];
		$scope.categories = [{
			"key": "training",
			"value": "Training"
		}, {
			"key": "support",
			"value": "Support"
		}, {
			"key": "interview",
			"value": "Interview"
		}, {
			"key": "resume",
			"value": "Resume"
		}];
		$scope.paidStatus = [{
			"key": "yes",
			"value": "Yes"
		}, {
			"key": "no",
			"value": "No"
		}];

		$scope.record = {
			"type": "",
			"providedBy": "",
			"providedFor": "",
			"opportunityDate": "",
			"category": "",
			"paid": ""
		};
		oppurtunityTrackerService.getAllEmployees().then(function (response) {
			$scope.employees = response.data;
		});

		$scope.loading = true;
		oppurtunityTrackerService.getAllOpportunity().then(function (response) {
			$scope.oppurtunityTrackersData = response.data;
			$scope.oppurtunityTrackersLength = response.data.length;
			$rootScope.currentTableLength = 'Records Count :' + response.data.length;
			$scope.oppurtunityTrackersOptions = [200, 300];
			$scope.oppurtunityTrackerPage = {
				pageSelect: true
			};
			$scope.query = {
				order: 'name',
				limit: 100,
				page: 1
			};
			$scope.loading = false;
		}, function (error) {
			alert("failed");
			$scope.loading = false;
		});

		var deregisterListener = $rootScope.$on("CalloppurtunityTrackerSearchMethod", function (event, args) {
			if ($rootScope.$$listeners["CalloppurtunityTrackerSearchMethod"].length > 1) {
				$rootScope.$$listeners["CalloppurtunityTrackerSearchMethod"].pop();
			}
			$scope.filterByText = args.text;
		});

		var deregisterListener = $rootScope.$on("CallOppurtunityTrackerMethod", function () {

			if ($rootScope.$$listeners["CallOppurtunityTrackerMethod"].length > 1) {
				$rootScope.$$listeners["CallOppurtunityTrackerMethod"].pop();
			}
			$scope.currentPage = "Create";
			$scope.toggleRight();
			$scope.emptyForm();
			// $scope.destroyListener();
		});

	};
	init();

	$scope.changed = function (test) {
		var checked = test.toLowerCase();
		oppurtunityTrackerService.getAllProvidedFor(checked).then(function (response) {
			console.log(response.data);
			$scope.provides = response.data;
		});

	};

	$scope.saveRecord = function () {
		oppurtunityTrackerService.create($scope.record).then(function (response) {
			//	console.log("resp", response);
		});
		$scope.cancelRecord();
		$scope.currentPage = "Create";
		window.location.reload();
	};

	$scope.cancelRecord = function () {
		$mdSidenav('right').close().then(function () {
			$log.debug("close RIGHT is done");
		});
	}

	$scope.setRowData = function (row) {

		$scope.currentPage = 'Update';
		$scope.rowData = row;
		$scope.updatePage = true;

		$scope.changed(row.type);
		$scope.record = {
			"type": row.type,
			"providedBy": row.providedById,
			"providedFor": row.providedFor,
			"opportunityDate": new Date(row.opportunityDate),
			"category": row.category,
			"paid": row.paid,
			"id": row.id
		};
	};
	$scope.updateRecord = function () {
		oppurtunityTrackerService.update($scope.record).then(function (response) {

		});
		$scope.cancelRecord();
		$scope.currentPage = "Create";
		window.location.reload();
	}
	$scope.emptyForm = function () {
		$scope.updatePage = false;
		$scope.record = {
			"type": "",
			"providedBy": "",
			"providedFor": "",
			"opportunityDate": "",
			"category": "",
			"paid": ""
		};

	};

	$scope.rowSelect = function (row) {
		$scope.selected.push(row);
		//	console.log($scope.selected);	
	};
	$scope.headerCheckbox = false;
	$scope.selectAll = function () {
		if (!$scope.headerCheckbox) {
			for (var i in $scope.oppurtunityTrackersData) {
				$scope.oppurtunityTrackersData[i]["checkboxValue"] = 'on';
				$scope.selected.push($scope.oppurtunityTrackersData[i]);
			};
			$scope.headerCheckbox = ($scope.headerCheckbox == false) ? true : false;
		} else if ($scope.headerCheckbox) {
			for (var i in $scope.oppurtunityTrackersData) {
				$scope.oppurtunityTrackersData[i]["checkboxValue"] = 'off';
				$scope.selected = [];
			};
			$scope.headerCheckbox = ($scope.headerCheckbox == true) ? false : true;
		};
		//	console.log($scope.selected);
	};

	$scope.deleteRow = function (ev, row) {

		var confirm = $mdDialog
			.confirm()
			.title('Are you sure want to Delete Record?')

			.ariaLabel('Lucky day').targetEvent(ev).ok(
				'Ok').cancel('Cancel');

		$mdDialog
			.show(confirm)
			.then(
				function () {
					oppurtunityTrackerService.deleteRow(row.id).then(function (response) {
						//	console.log("resp", response);
					});
					window.location.reload();
				},
				function () {
					$scope.status = 'You decided to keep your Task.';
				});

	};

	$scope.exportData = function (tableId) {
		// $scope.tasksOptions = [ $scope.tasksData.length ];
		var exportHref = Excel.tableToExcel(tableId, 'sheet name');
		$timeout(function () {
			location.href = exportHref;
		}, 100); // trigger download
	};

	/* Tooltip Starrts */

	$scope.demo = {
		showTooltip: false,
		tipDirection: ''
	};

	$scope.demo.delayTooltip = undefined;
	$scope.$watch('demo.delayTooltip', function (val) {
		$scope.demo.delayTooltip = parseInt(val, 10) || 0;
	});

	$scope.$watch('demo.tipDirection', function (val) {
		if (val && val.length) {
			$scope.demo.showTooltip = true;
		}
	});
	/* Tooltip Ends */

	/* Side nav starts */
	$scope.toggleLeft = buildDelayedToggler('left');
	$scope.toggleRight = buildToggler('right');
	$scope.isOpenRight = function () {
		return $mdSidenav('right').isOpen();
	};

	function debounce(func, wait, context) {
		var timer;

		return function debounced() {
			var context = $scope,
				args = Array.prototype.slice
				.call(arguments);
			$timeout.cancel(timer);
			timer = $timeout(function () {
				timer = undefined;
				func.apply(context, args);
			}, wait || 10);
		};
	}

	function buildDelayedToggler(navID) {
		return debounce(function () {
			// Component lookup should always be available since we are not
			// using `ng-if`
			$mdSidenav(navID).toggle().then(function () {
				$log.debug("toggle " + navID + " is done");
			});
		}, 200);
	}

	function buildToggler(navID) {

		return function () {
			// Component lookup should always be available since we are not
			// using `ng-if`
			$mdSidenav(navID).toggle().then(function () {
				$log.debug("toggle " + navID + " is done");
			});
		}
	}
	/* Side nav ends */

	return self;
};

dmtApplication.directive('createOppurtunity', function ($state) {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: function () {
			var current = $state.current.name;
			return '../dmt/pages/' + current + '/' + current + '.record.html';
		}
	};
});