/*(function() {*/
'use strict';
dmtApplication.controller("supportController", supportController);

function supportController($scope, supportService, Excel, $state, $mdDialog,
		$mdToast, $timeout, $mdSidenav, $log) {
	var self = {
		init : init
	};
	function init() {
		// console.log($state.current.name);
		var current = $state.current.name;
		$scope.currentState = current.split(/[\s.]+/);
		$scope.currentRoute = $scope.currentState[$scope.currentState.length - 1];
		$scope.customFullscreen = false;
		$scope.updatePage = false;
		$scope.supportsData = [];
		$scope.collection = [];
		$scope.selected = [];
		$scope.headerEnable = {};
		$scope.exportData = [];
		$scope.headers = [ "endClient", "technologyUsed", "allottedTime" ];

		$scope.headerEnable = {
			"endClient" : false
		}, {
			"technologyUsed" : false
		}, {
			"allottedTime" : false
		};

		$scope.record = {
			"traineeId" : "",
			"supportedBy" : "",
			"trainerId" : "",
			"startDate" : "",
			"endDate" : "",
			"allottedTime" : "",
			"endClient" : "",
			"status" : "1 - Not Started",
			"paidStatus" : "2 - Not Paid",
			"receivedStatus" : "2 - Not Received",
			"technologyUsed" : "",			
			"createdDate":"",
			"description":"",
			"paidBy" : ""
		};
		supportService.getAllStatus().then(function(response) {
			$scope.statuses = response.data;
		});
		supportService.getAllEmployees().then(function(response) {
			$scope.employees = response.data;
		});

		supportService.getAllTrainees().then(function(response) {
			$scope.trainees = response.data;
		});
		supportService.getAllTrainers().then(function(response) {
			$scope.trainers = response.data;
		});
		supportService.getAlltimeConstants().then(function(response) {
			$scope.timeConstants = response.data;
		});
		supportService.getAllpaidByConstants().then(function(response) {
			$scope.paidByConstants = response.data;
		});
		supportService.getAllreceivedConstants().then(function(response) {
			$scope.receivedConstants = response.data;
		});
		supportService.getAllpaidConstants().then(function(response) {
			$scope.paidConstants = response.data;
		});
$scope.progressBar = true;
		supportService.getAllSupports().then(function(response) {

			$scope.supportsData = response.data;
			//console.log($scope.supportsData);
			$scope.supportsLength = response.data.length;
			$scope.supportsOptions = [ 200 , 300];
			$scope.supportPage = {
				pageSelect : true
			};
			$scope.query = {
				order : 'name',
				limit : 100,
				page : 1
			};
			$scope.progressBar = false;
		}, function(error) {

		});

		$scope.saveRecord = function() {
			
		console.log($scope.record);
			supportService.create($scope.record).then(function(response) {

			});
			$mdSidenav('right').close().then(function() {
				$log.debug("close RIGHT is done");
			});
		}
		$scope.setDate = function(date) {
			$scope.minDate = date;
			$scope.minStartedDate = new Date($scope.minDate.getFullYear(),
					$scope.minDate.getMonth(), $scope.minDate.getDate());
			$scope.minEndDate = $scope.minStartedDate;
		};

		$scope.rowData = function(row) {
			$scope.rowData = row;
			$scope.updatePage = true;
			$scope.create = {
				"trainee" : row.traineeId,
				"trainer" : row.trainerId,
				"startDate" : new Date(row.startDate),
				"endDate" : new Date(row.endDate),
				"allotedTime" : row.allottedTime,
				"endClient" : row.endClient,
				"technologyUsed" : row.technologyUsed,
				"paidBy" : row.paidBy,
				"paidStatus" : row.paidStatus,
				"receivedStatus" : row.receivedStatus,
				"status" : row.status,
				"description" : row.description
			};
		};

		$scope.updateRow = function() {
			$mdSidenav('right').close().then(function() {
				$log.debug("close RIGHT is done");
			});
		}
		$scope.emptyForm = function() {
			$scope.updatePage = false;
			$scope.create = {
				"trainee" : "",
				"trainer" : "",
				"startDate" : "",
				"endDate" : "",
				"allotedTime" : "",
				"endClient" : "",
				"technologyUsed" : "",
				"paidBy" : "",
				"paidStatus" : "",
				"receivedStatus" : "",
				"status" : "",
				"description" : ""
			};
		};

		$scope.rowSelect = function(row) {
			$scope.selected.push(row.id);
		};
		$scope.selectAll = function() {
			for ( var i in $scope.supportsData) {
				$scope.supportsData[i]["checkboxValue"] = 'on';
				$scope.selected.push($scope.supportsData[i].id);
			}
			;
		};

		$scope.deSelectAll = function() {
			for ( var i in $scope.supportsData) {
				$scope.supportsData[i]["checkboxValue"] = 'off';
			}
			;
			$scope.selected = [];
		};

		$scope.deleteSelected = function(ev) {
			// Appending dialog to document.body to cover sidenav in docs app
			if ($scope.selected.length > 0) {
				var confirm = $mdDialog
						.confirm()
						.title('Would you like to delete your Task?')
						.textContent(
								'All of the Tasks have agreed to forgive you your task.')
						.ariaLabel('Lucky day').targetEvent(ev).ok(
								'Please do it!').cancel('Sounds like a scam');

				$mdDialog
						.show(confirm)
						.then(
								function() {
									$scope.supportsData = $scope.supportsData
											.filter(function(obj) {
												return $scope.selected
														.indexOf(obj.id) === -1;
											});
									$scope.supportsLength = $scope.supportsData.length;
								},
								function() {
									$scope.status = 'You decided to keep your Task.';
								});
			} else {
				alert("please select any one");
			}

		};

		$scope.moreColumns = function(ev) {
			$mdDialog.show({
				controller : supportController,
				templateUrl : 'pages/app.support/app.support.moreHeaders.html',
				parent : angular.element(document.body),
				targetEvent : ev,
				clickOutsideToClose : true,
				fullscreen : $scope.customFullscreen
			}).then(
					function(answer) {
						$scope.status = 'You said the information was "'
								+ answer + '".';
					}, function() {
						$scope.status = 'You cancelled the dialog.';
					});
		};

		$scope.openMoreOptions = function(header) {
			if (header.length > 0) {
				for ( var i in header) {
					if (header[i] == 'endClient') {
						$scope.headerEnable.endClient = true;
					} else if (header[i] == 'technologyUsed') {
						$scope.headerEnable.technologyUsed = true;
					} else if (header[i] == 'allottedTime') {
						$scope.headerEnable.allottedTime = true;
					}
				}
			} else {
				$scope.headerEnable = {
					"endClient" : false
				}, {
					"technologyUsed" : false
				}, {
					"allottedTime" : false
				};
			}
		}

		$scope.exportTable = function(tableId) {
			var exportHref = Excel.tableToExcel(tableId, 'sheet name');
			$timeout(function() {
				location.href = exportHref;
			}, 100);
		}

		/* Min Dates starts */
		$scope.minStartDate = new Date();

		/* Tooltip Starrts */
		$scope.demo = {
			showTooltip : false,
			tipDirection : ''
		};

		$scope.demo.delayTooltip = undefined;
		$scope.$watch('demo.delayTooltip', function(val) {
			$scope.demo.delayTooltip = parseInt(val, 10) || 0;
		});

		$scope.$watch('demo.tipDirection', function(val) {
			if (val && val.length) {
				$scope.demo.showTooltip = true;
			}
		});
		/* Tooltip Ends */

		/* Side nav starts */
		$scope.toggleLeft = buildDelayedToggler('left');
		$scope.toggleRight = buildToggler('right');
		$scope.isOpenRight = function() {
			return $mdSidenav('right').isOpen();
		};

		function debounce(func, wait, context) {
			var timer;

			return function debounced() {
				var context = $scope, args = Array.prototype.slice
						.call(arguments);
				$timeout.cancel(timer);
				timer = $timeout(function() {
					timer = undefined;
					func.apply(context, args);
				}, wait || 10);
			};
		}

		function buildDelayedToggler(navID) {
			return debounce(function() {
				$mdSidenav(navID).toggle().then(function() {
					$log.debug("toggle " + navID + " is done");
				});
			}, 200);
		}

		function buildToggler(navID) {
			return function() {
				$mdSidenav(navID).toggle().then(function() {
					$log.debug("toggle " + navID + " is done");
				});
			}
		}
		/* Side nav ends */
	}
	init();

	return self;
};

dmtApplication.directive('createSupport', function($state) {
	return {
		restrict : 'E',
		replace : true,
		templateUrl : function() {
			var current = $state.current.name;
			return '../dmt/pages/' + current + '/' + current + '.create.html';
		}
	};
});
