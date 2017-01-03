/*(function() {*/
'use strict';
dmtApplication.controller("courseController", courseController);

function courseController($scope, courseService, Excel, $state, $mdDialog,
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
		$scope.coursesData = [];
		$scope.collection = [];
		$scope.selected = [];
		$scope.headerEnable = {};
		$scope.exportData = [];

		$scope.create = {
			"id" : "",
			"technology_id" : "",
			"name" : "",
			"est_hrs" : "",
			"description" : "",
			"created_date" : "",
			"updated_date" : ""
		};
		courseService.getAllTechnologies().then(function(response) {
			$scope.technologies = response.data;
		});

		courseService.getAllCourses().then(function(response) {
			$scope.coursesData = response.data;
			$scope.coursesLength = response.data.length;
			// console.log($scope.tasksData);
			$scope.coursesOptions = [ 5, 10, 15 ];
			$scope.coursePage = {
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
			console.log($scope.create);
			
			var jsonData = $scope.create;
			var sendDataForCreate = [ jsonData.technology_id, jsonData.name,
					jsonData.est_hrs, new Date(), jsonData.description ];

			courseService.create(sendDataForCreate).then(function(response) {
				console.log("resp", response);
			});
			$mdSidenav('right').close().then(function() {
				$log.debug("close RIGHT is done");
			});
		}

		$scope.updateRow = function(row) {
			console.log(row);
			$scope.rowData = row;
			$scope.updatePage = true;
			$scope.create = {
				"id" : row.id,
				"technology_id" : row.technologyId,
				"name" : row.name,
				"est_hrs" : row.estHrs,
				"description" : row.description,
				"created_date" : "",
				"updated_date" : new Date()
			};
			// console.log($scope.create.status);
		};
		$scope.updateData = function() {
			//console.log($scope.create);
			$mdSidenav('right').close().then(function() {
				$log.debug("close RIGHT is done");
			});
		}
		$scope.emptyForm = function() {
			$scope.updatePage = false;
			$scope.create = {
				"technology_id" : "",
				"name" : "",
				"est_hrs" : "",
				"description" : "",
				"created_date" : "",
				"updated_date" : new Date()
			};
		};

		$scope.rowSelect = function(row) {
			$scope.selected.push(row.id);
		};
		$scope.selectAll = function() {
			for ( var i in $scope.coursesData) {
				$scope.tasksData[i]["checkboxValue"] = 'on';
				$scope.selected.push($scope.tasksData[i].id);
			}
			;
		};

		$scope.deSelectAll = function() {
			for ( var i in $scope.coursesData) {
				$scope.coursesData[i]["checkboxValue"] = 'off';
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
									$scope.coursesData = $scope.coursesData
											.filter(function(obj) {
												return $scope.selected
														.indexOf(obj.id) === -1;
											});
									$scope.coursesLength = $scope.coursesData.length;
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

dmtApplication.directive('createCourse', function($state) {
	return {
		restrict : 'E',
		replace : true,
		templateUrl : function() {
			var current = $state.current.name;
			return '../dmt/pages/' + current + '/' + current + '.create.html';
		}
	};
});
