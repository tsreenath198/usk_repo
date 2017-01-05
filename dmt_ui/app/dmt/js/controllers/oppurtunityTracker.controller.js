/*(function() {*/
'use strict';
dmtApplication.controller("oppurtunityTrackerController", oppurtunityTrackerController);

function oppurtunityTrackerController($scope, oppurtunityTrackerService, Excel, $state, $mdDialog,
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
		$scope.oppurtunityTrackersData = [];
		$scope.collection = [];
		$scope.selected = [];
		$scope.headerEnable = {};
		$scope.exportData = [];

		$scope.types = [{"key":"trainee","value":"Trainee"},{"key":"trainer","value":"Trainer"},{"key":"client","value":"Client"},{"key":"employee","value":"Employee"}];
		$scope.categories = [{"key":"training","value":"Training"},{"key":"suppport","value":"Suppport"},{"key":"interview","value":"Interview"},{"key":"resume","value":"Resume"}];
		$scope.paidStatus = [{"key":"yes","value":"Yes"},{"key":"no","value":"No"}];

		$scope.record = {
			"type" : "",
			"providedBy" : "",
			"providedFor" : "",
			"opportunityDate" : "",
			"category":"",
			"paid":""
		};
		oppurtunityTrackerService.getAllEmployees().then(function(response) {
			$scope.employees = response.data;
		});

		 $scope.changed = function(test) { 
		oppurtunityTrackerService.getAllProvidedFor(test).then(function(response) {
			//console.log(response.data);
			$scope.provides = response.data;
		});
		 	
		 };

		oppurtunityTrackerService.getAllOpportunity().then(function(response) {
			$scope.oppurtunityTrackersData = response.data;
			$scope.oppurtunityTrackersLength = response.data.length;
			// console.log($scope.tasksData);
			$scope.oppurtunityTrackersOptions = [ 5, 10, 15 ];
			$scope.oppurtunityTrackerPage = {
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
				
			oppurtunityTrackerService.create($scope.record).then(function(response) {
				console.log("resp", response);
			});
			$mdSidenav('right').close().then(function() {
				$log.debug("close RIGHT is done");
			});
		}

		$scope.setRowData = function(row) {
			
			$scope.rowData = row;
			$scope.updatePage = true;
			$scope.record = {				
				"type" : row.type,
				"providedBy" : row.providedBy,
				"providedFor" : row.providedFor,
				"opportunityDate" : new Date(row.opportunityDate),
				"category":row.category,
				"paid":row.paid,
				"id":row.id
			};
			// console.log($scope.create.status);
		};
		$scope.updateRecord = function() {
			console.log($scope.record);
			oppurtunityTrackerService.update($scope.record).then(function(response) {
				console.log("resp", response);
			});
			$mdSidenav('right').close().then(function() {
				$log.debug("close RIGHT is done");
			});
		}
		$scope.emptyForm = function() {
			$scope.updatePage = false;
			
		};

		$scope.rowSelect = function(row) {
			$scope.selected.push(row.id);
		};
		$scope.selectAll = function() {
			for ( var i in $scope.oppurtunityTrackersData) {
				$scope.oppurtunityTrackersData[i]["checkboxValue"] = 'on';
				$scope.selected.push($scope.oppurtunityTrackersData[i].id);
			}
			;
		};

		$scope.deSelectAll = function() {
			for ( var i in $scope.oppurtunityTrackersData) {
				$scope.oppurtunityTrackersData[i]["checkboxValue"] = 'off';
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
									$scope.oppurtunityTrackersData = $scope.oppurtunityTrackersData
											.filter(function(obj) {
												return $scope.selected
														.indexOf(obj.id) === -1;
											});
									$scope.oppurtunityTrackersLength = $scope.oppurtunityTrackersData.length;
								},
								function() {
									$scope.status = 'You decided to keep your Task.';
								});
			} else {
				alert("please select any one");
			}

		};

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

dmtApplication.directive('createOppurtunity', function($state) {
	return {
		restrict : 'E',
		replace : true,
		templateUrl : function() {
			var current = $state.current.name;
			return '../dmt/pages/' + current + '/' + current + '.create.html';
		}
	};
});
