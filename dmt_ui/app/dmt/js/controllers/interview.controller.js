/*(function() {*/
'use strict';
dmtApplication.controller("interviewController", interviewController);

function interviewController($scope, interviewService, Excel, $state, $mdDialog,
	$mdToast, $timeout, $mdSidenav, $log, $rootScope) {
	var self = {
		init: init
	};

	function init() {

		$rootScope.currentController = 'Interview';
		$scope.currentPage = 'Create';
		$rootScope.currentDataEnable = true;
		var current = $state.current.name;
		$scope.currentState = current.split(/[\s.]+/);
		$scope.currentRoute = $scope.currentState[$scope.currentState.length - 1];
		$scope.customFullscreen = false;
		$scope.updatePage = false;
		$scope.interviewsData = [];
		$scope.collection = [];
		$scope.selected = [];
		$scope.headerEnable = {};
		$scope.exportData = [];
		$scope.headers = [{
			"key": "interviewer",
			"value": "Interviewer"
		}, {
			"key": "clientName",
			"value": "Client Name"
		}, {
			"key": "employeeName",
			"value": "Employee Name"
		}]

		$scope.headerEnable = {
			"clientName": false
		}, {
			"clientName": false
		}, {
			"employeeName": false
		};

		$scope.record = {
			"traineeId": "",
			"assistedBy": "",
			"clientId": "",
			"interviewer": "",
			"time": "",
			"status": "",
			"createdDate": "",
			"paidStatus": "",
			"receivedStatus": "",
			"description": "",
			"date": "",
			"technologyId": "",
			"invoice": ""
		};

		interviewService.getAllEmployees().then(function (response) {
			$scope.employees = response.data;
		});
		interviewService.getAllTrainees().then(function (response) {
			$scope.trainees = response.data;
		});
		interviewService.getAllClients().then(function (response) {
			$scope.clients = response.data;
		});
		interviewService.getAllTechnologies().then(function (response) {
			$scope.technologies = response.data;
		});
		interviewService.getAllTimes().then(function (response) {
			$scope.times = response.data;
		});
		interviewService.getAllPaidStatus().then(function (response) {
			$scope.paidStatuses = response.data;
		});
		interviewService.getAllReceivedStatus().then(function (response) {
			$scope.receivedStatuses = response.data;
		});
		interviewService.getAllStatus().then(function (response) {
			$scope.statuses = response.data;
		});

		$scope.loading = true;
		interviewService.getAllInterviews().then(function (response) {
			$scope.interviewsData = response.data;
			$scope.interviewsLength = response.data.length;
			$rootScope.currentTableLength = 'Records Count :' + response.data.length;
			//console.log($scope.tasksData);
			$scope.interviewsOptions = [200, 300];
			$scope.interviewPage = {
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

		var deregisterListener = $rootScope.$on("CallInterviewSearchMethod", function (event, args) {
			if ($rootScope.$$listeners["CallInterviewSearchMethod"].length > 1) {
				$rootScope.$$listeners["CallInterviewSearchMethod"].pop();
			}
			$scope.filterByText = args.text;
		});

		$scope.saveRecord = function () {
			//console.log($scope.record);
			interviewService.create($scope.record).then(function (response) {});
			$scope.cancelRecord();
			window.location.reload();
		}

		$scope.cancelRecord = function () {
			$mdSidenav('right').close().then(function () {
				$log.debug("close RIGHT is done");
			});
		};
		$scope.rowData = function (row) {
			$scope.currentPage = 'Update';
			$scope.rowData = row;
			$scope.updatePage = true;
			$scope.record = {

				"traineeId": row.traineeId,
				"assistedBy": row.assistedBy,
				"clientId": row.clientId,
				"interviewer": row.interviewer,
				"time": row.time,
				"status": row.status,
				"updatedDate": "",
				"paidStatus": row.paidStatus,
				"receivedStatus": row.receivedStatus,
				"description": row.description,
				"date": new Date(row.date),
				"technologyId": row.technologyId,
				"invoice": row.invoice,
				"id": row.id
			};
		};

		var deregisterListener = $rootScope.$on("CallInterviewMethod", function () {
			$scope.currentPage = "Create";
			if ($rootScope.$$listeners["CallInterviewMethod"].length > 1) {
				$rootScope.$$listeners["CallInterviewMethod"].pop();
			}
			$scope.toggleRight();
			$scope.emptyForm();
		});

		$scope.updateRecord = function () {
			interviewService.update($scope.record).then(function (response) {});
			$scope.cancelRecord();
			window.location.reload();
			$scope.currentPage = 'Create';
		}
		$scope.emptyForm = function () {
			$scope.updatePage = false;
			$scope.record = {
				"traineeId": "",
				"assistedBy": "",
				"clientId": "",
				"interviewer": "",
				"time": "",
				"status": "",
				"paidStatus": "",
				"receivedStatus": "",
				"description": "",
				"date": "",
				"technologyId": "",
				"invoice": ""
			};
		};

		$scope.rowSelect = function (row) {
			$scope.selected.push(row);
			//	console.log($scope.selected);
		};
		$scope.headerCheckbox = false;

		$scope.selectAll = function () {

			if (!$scope.headerCheckbox) {
				for (var i in $scope.interviewsData) {
					$scope.interviewsData[i]["checkboxValue"] = 'on';
					$scope.selected.push($scope.interviewsData[i]);
				};
				$scope.headerCheckbox = ($scope.headerCheckbox == false) ? true : false;
			} else if ($scope.headerCheckbox) {
				for (var i in $scope.interviewsData) {
					$scope.interviewsData[i]["checkboxValue"] = 'off';
					$scope.selected = [];
				};
				$scope.headerCheckbox = ($scope.headerCheckbox == true) ? false : true;
			};
			//console.log($scope.selected);
		};

		$scope.deleteRow = function (ev, row) {
			// Appending dialog to document.body to cover sidenav in docs app

			var confirm = $mdDialog
				.confirm()
				.title('Are you sure want to Delete Record?')

				.ariaLabel('Lucky day').targetEvent(ev).ok(
					'Ok').cancel('Cancel');

			$mdDialog.show(confirm).then(function () {
				interviewService.deleteRow(row.id).then(function (response) {});
				window.location.reload();
			}, function () {
				$scope.status = 'You decided to keep your Task.';
			});


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
	}
	init();
	var originatorEv;
	this.openMenu = function ($mdOpenMenu, ev) {
		originatorEv = ev;
		$mdOpenMenu(ev);
	};
	$scope.menuItemClick = function (index, key) {

		if (key == 'interviewer') {
			$scope.interviewer = true;
			$scope.clientName = false;
			$scope.employeeName = false;
		} else if (key == 'clientName') {
			$scope.interviewer = false;
			$scope.clientName = true;
			$scope.employeeName = false;

		} else if (key == 'employeeName') {
			$scope.interviewer = false;
			$scope.clientName = false;
			$scope.employeeName = true;
		}
	};

	return self;
};

dmtApplication.directive('createInterview', function ($state) {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: function () {
			var current = $state.current.name;
			return '../dmt/pages/' + current + '/' + current + '.record.html';
		}
	};
});