/*(function() {*/
'use strict';
dmtApplication.controller("batchAttendanceController",
		batchAttendanceController);

function batchAttendanceController($scope, batchAttendanceService, Excel,
		$state, $mdDialog, $mdToast, $timeout, $mdSidenav, $log, $filter) {
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
		$scope.batchAttendancesData = [];
		$scope.collection = [];
		$scope.selected = [];
		$scope.headerEnable = {};
		$scope.exportData = [];

		$scope.record = {
			"batchId" : "",
			"date" : "",
			"traineeId" : "",
			"createdDate" : "",
			"description" : "",
			"name":"java"
		};

		/*
		 * BatchAttendanceService.getAllEmployees().then(function(response) {
		 * $scope.employees = response.data; });
		 * BatchAttendanceService.getAllTechnologies().then(function(response) {
		 * $scope.technologies = response.data; });
		 */
          $scope.loading=true;
		batchAttendanceService.getAllBatchAttendances().then(
				function(response) {
					$scope.batches = response.data;
					console.log("batches", $scope.batches);
					
					 $scope.batchAttendancesLength = response.data.length;
					  console.log($scope.batchAttendancesData);
					  $scope.batchAttendancesOptions = [ 200,300 ];
					  $scope.batchAttendancePage = { pageSelect : true };
					  $scope.query = { order : 'name', limit : 100, page : 1 };
					  $scope.loading=false;
				}, function(error) {

				});

		$scope.traineesList = [];
		$scope.showTrainees = function(record) {
			if (record.batchId && record.batchId != '') {
				batchAttendanceService.trainees(record.batchId).success(
						function(response) {
							
							$scope.traineesList = response;
							console.log($scope.traineesList);
							$scope.traineesList.push(response);
							
                            console.log($scope.traineesList);
						});
			} else {

			}
		}

		$scope.saveRecord = function() {
			batchAttendanceService.create($scope.record).then(
					function(response) {
						console.log(response);
					});
			$mdSidenav('right').close().then(function() {
				$log.debug("close RIGHT is done");
			});
		}

		$scope.setRowData = function(row) {
			console.log(row);
			$scope.rowData = row;
			$scope.updatePage = true;
			$scope.record = {
				"id" : row.id,
				"batchId" : row.batchId,
				"date" : new Date(row.date),
				"traineeId" : row.traineeId,
				"updatedDate" : "",
				"description" : row.description
			};
		};
		$scope.updateData = function() {
			console.log($scope.create);

			batchAttendanceService.update($scope.record).then(
					function(response) {
						// $scope.technology = response.data;
						console.log(response);
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
			for ( var i in $scope.batchAttendancesData) {
				$scope.batchAttendancesData[i]["checkboxValue"] = 'on';
				$scope.selected.push($scope.batchAttendancesData[i].id);
			}
			;
		};

		$scope.deSelectAll = function() {
			for ( var i in $scope.batchAttendancesData) {
				$scope.batchAttendancesData[i]["checkboxValue"] = 'off';
			}
			;
			$scope.selected = [];
		};

		$scope.deleteSelected = function(ev) {
			// Appending dialog to document.body to cover sidenav in docs app
			if ($scope.selected.length > 0) {
				var confirm = $mdDialog
						.confirm()
						.title(
								'Would you like to delete your Batch Attendance?')
						.textContent(
								'All of the  have agreed to forgive you your .')
						.ariaLabel('Lucky day').targetEvent(ev).ok(
								'Please do it!').cancel('Sounds like a scam');

				$mdDialog
						.show(confirm)
						.then(
								function() {
									$scope.batchAttendancesData = $scope.batchAttendancesData
											.filter(function(obj) {
												return $scope.selected
														.indexOf(obj.id) === -1;
											});
									$scope.batchAttendancesLength = $scope.batchAttendancesData.length;
								},
								function() {
									$scope.status = 'You decided to keep your batchAttendance.';
								});
			} else {
				alert("please select any one");
			}

		};

		$scope.export = function(tableId) {
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

	}
	;
	init();

	return self;
};

dmtApplication.directive('createBatchAttendance', function($state) {
	return {
		restrict : 'E',
		replace : true,
		templateUrl : function() {
			var current = $state.current.name;
			return '../dmt/pages/' + current + '/' + current + '.record.html';
		}
	};
});
dmtApplication.filter('capitalize', function() {
	return function(input) {
		return (!!input) ? input.charAt(0).toUpperCase()
				+ input.substr(1).toLowerCase() : '';
	}
});

dmtApplication
		.factory(
				'Excel',
				function($window) {
					var uri = 'data:application/vnd.ms-excel;base64,', template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>', base64 = function(
							s) {
						return $window.btoa(unescape(encodeURIComponent(s)));
					}, format = function(s, c) {
						return s.replace(/{(\w+)}/g, function(m, p) {
							return c[p];
						})
					};
					return {
						tableToExcel : function(tableId, worksheetName) {
							var table = $(tableId), ctx = {
								worksheet : worksheetName,
								table : table.html()
							}, href = uri + base64(format(template, ctx));
							return href;
						}
					};
				});
