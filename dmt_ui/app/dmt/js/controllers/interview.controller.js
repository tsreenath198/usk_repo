/*(function() {*/
'use strict';
dmtApplication.controller("interviewController", interviewController);

function interviewController($scope, interviewService, Excel, $state, $mdDialog,
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
		$scope.interviewsData = [];
		$scope.collection = [];
		$scope.selected = [];
		$scope.headerEnable = {};
		$scope.exportData = [];

		$scope.headers = [ "category", "status" ];

		$scope.headerEnable = {
			"category" : false
		}, {
			"status" : false
		};

		$scope.record = {
			"traineeId" : "",
			"assistedBy" : "",
			"clientId" : "",
			"interviewer" : "",
			"time" : "",
			"status" : "",
			"createdDate" : "",
			"paidStatus" : "",
			"receivedStatus" : "",
			"description" : "",
			"date":""
		};
		
		interviewService.getAllEmployees().then(function(response) {
			$scope.employees = response.data;
		});
		interviewService.getAllTrainees().then(function(response) {
			$scope.trainees = response.data;
		});
		interviewService.getAllClients().then(function(response) {
			$scope.clients = response.data;
		});
		interviewService.getAllTimes().then(function(response) {
			$scope.times = response.data;
		});
		interviewService.getAllPaidStatus().then(function(response) {
			$scope.paidStatuses = response.data;
		});
		interviewService.getAllReceivedStatus().then(function(response) {
			$scope.receivedStatuses = response.data;
		});
		interviewService.getAllStatus().then(function(response) {
			$scope.statuses = response.data;
		});


		interviewService.getAllInterviews().then(function(response) {
			$scope.interviewsData = response.data;
			$scope.interviewsLength = response.data.length;
			//console.log($scope.tasksData);
			$scope.interviewsOptions = [ 5, 10, 15 ];
			$scope.interviewPage = {
				pageSelect : true
			};
			$scope.query = {
				order : 'name',
				limit : 5,
				page : 1
			};
		}, function(error) {

		});
	
		
		$scope.saveRecord = function() {
		console.log($scope.record);
			interviewService.create($scope.record).then(function(response) {

			});
			$mdSidenav('right').close().then(function() {
				$log.debug("close RIGHT is done");
			});
		}

		$scope.rowData = function(row) {
			 console.log(row);
			$scope.rowData = row;
			$scope.updatePage = true;
			$scope.record = {
				
			"traineeId" : row.traineeId,
			"assistedBy" : row.assistedBy,
			"clientId" : row.clientId,
			"interviewer" : row.interviewer,
			"time" : row.time,
			"status" : row.status,
			"updatedDate" : "",
			"paidStatus" : row.paidStatus,
			"receivedStatus" : row.receivedStatus,
			"description" : row.description,
			"date":row.date,
			"id":row.id
		};
		
			// console.log($scope.create.status);
		};
		$scope.updateRecord = function() {
			// console.log($scope.create);
			interviewService.update($scope.record).then(function(response) {

			});
			$mdSidenav('right').close().then(function() {
				$log.debug("close RIGHT is done");
			});
		}
		$scope.emptyForm = function() {
			$scope.updatePage = false;
			$scope.create = {};
		};

		$scope.rowSelect = function(row) {
			$scope.selected.push(row.id);
		};
		$scope.selectAll = function() {
			for ( var i in $scope.interviewsData) {
				$scope.interviewsData[i]["checkboxValue"] = 'on';
				$scope.selected.push($scope.interviewsData[i].id);
			}
			;
		};

		$scope.deSelectAll = function() {
			for ( var i in $scope.interviewsData) {
				$scope.interviewsData[i]["checkboxValue"] = 'off';
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

				$mdDialog.show(confirm).then(function() {
					$scope.interviewsData = $scope.interviewsData.filter(function(obj) {
						return $scope.selected.indexOf(obj.id) === -1;
					});
					//$scope.tasksLength = $scope.interviewsData.length;
				}, function() {
					$scope.status = 'You decided to keep your Task.';
				});
			} else {
				alert("please select any one");
			}

		};

		$scope.moreColumns = function(ev) {

			$mdDialog.show({
				controller : interviewController,
				templateUrl : 'pages/app.interview/app.interview.moreHeaders.html',
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
			console.log(header);
			if (header.length > 0) {
				for ( var i in header) {
					if (header[i] == 'category') {
						$scope.headerEnable.category = true;
					} else if (header[i] == 'status') {
						$scope.headerEnable.status = true;
					}
				}
			} else {
				$scope.headerEnable = {
					"category" : false
				}, {
					"status" : false
				};
			}
		}

		$scope.exportData = function(tableId) {
			// $scope.tasksOptions = [ $scope.tasksData.length ];
			var exportHref = Excel.tableToExcel(tableId, 'sheet name');
			$timeout(function() {
				location.href = exportHref;
			}, 100); // trigger download
		}

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
				// Component lookup should always be available since we are not
				// using `ng-if`
				$mdSidenav(navID).toggle().then(function() {
					$log.debug("toggle " + navID + " is done");
				});
			}, 200);
		}

		function buildToggler(navID) {

			return function() {
				// Component lookup should always be available since we are not
				// using `ng-if`
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

dmtApplication.directive('createInterview', function($state) {
	return {
		restrict : 'E',
		replace : true,
		templateUrl : function() {
			var current = $state.current.name;
			return '../dmt/pages/' + current + '/' + current + '.create.html';
		}
	};
});
