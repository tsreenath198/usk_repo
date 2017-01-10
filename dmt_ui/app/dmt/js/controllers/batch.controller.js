/*(function() {*/
'use strict';
dmtApplication.controller("batchController", batchController);

function batchController($scope, batchService, $mdDialog, $mdToast, $timeout,
		$state, $mdSidenav, $log) {

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
		$scope.batchesData = [];
		$scope.collection = [];
		$scope.selected = [];
		$scope.headerEnable = {};
		$scope.exportData = [];
		$scope.record = {
			"technologyId" : "",
			"trainerId" : "",
			"startDate" : "",
			"endDate" : "",
			"duration" : "",
			"status" : "",
			"paidStatus": "",
			"receivedStatus": "",
			"createDate" :"",
			"description" : "",
			"batchTime" : ""
		};
		
		
		batchService.getAllTimeConstants().then(function(response) {
			$scope.batchtime = response.data;
		});
		batchService.getAllTrainers().then(function(response) {
			$scope.trainers = response.data;
		});

		batchService.getAllPaidStatus().then(function(response) {
			$scope.paidstatuses = response.data;
		});

		batchService.getAllReceivedStatus().then(function(response) {
			$scope.receivedstatuses = response.data;
		});

		batchService.getAllStatus().then(function(response) {
			$scope.statuses = response.data;
		});
		batchService.getAllTechnologies().then(function(response) {
			$scope.technologies = response.data;
		});

		batchService.getAllBatches().then(function(response) {
			$scope.batchesData = response.data;
			$scope.batchesLength = response.data.length;
			console.log($scope.batchesData);
			$scope.batchesOptions = [ 100, 200, 300,500,1000 ];
			$scope.batchPage = {
				pageSelect : true
			};
			$scope.query = {
				order : 'name',
				limit : 100,
				page : 1
			};
		}, function(error) {

		});
		
		$scope.setDate = function(date) {
			$scope.minDate = date;
			$scope.minStartedDate = new Date($scope.minDate.getFullYear(),
					$scope.minDate.getMonth(), $scope.minDate.getDate());
			$scope.minEndDate = $scope.minStartedDate;
		};

		$scope.saveRecord = function() {
			batchService.create($scope.record).then(function(response) {
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
				"technologyId" : row.technologyId,
				"trainerId" : row.trainerId,
				"startDate" : new Date(),
				"endDate" : new Date(),
				"duration" : row.duration,
				"status" : row.status,
				"paidStatus" : row.paidStatus,
				"receivedStatus" : row.receivedStatus,
				"updatedDate" :"",
				"description" : row.description,
				"batchTime" : row.batchTime,
				"id" : row.id
			};
			
		};
		$scope.updateData = function() {
			batchService.update($scope.record).then(function(response) {
				console.log(response);
			});
			$mdSidenav('right').close().then(function() {
				$log.debug("close RIGHT is done");
			});
		}
		$scope.emptyForm = function() {
			$scope.updatePage = false;
			$scope.record={};
		};

		$scope.rowSelect = function(row) {
			$scope.selected.push(row.id);
		};
		$scope.selectAll = function() {
			for ( var i in $scope.batchesData) {
				$scope.batchesData[i]["checkboxValue"] = 'on';
				$scope.selected.push($scope.batchesData[i].id);
			}
			;
		};

		$scope.deSelectAll = function() {
			for ( var i in $scope.batchesData) {
				$scope.batchesData[i]["checkboxValue"] = 'off';
			}
			;
			$scope.selected = [];
		};

		$scope.deleteSelected = function(ev) {
			// Appending dialog to document.body to cover sidenav in docs app
			if ($scope.selected.length > 0) {
				var confirm = $mdDialog
						.confirm()
						.title('Would you like to delete your Batch?')
						.textContent(
								'All of the Tasks have agreed to forgive you your batch.')
						.ariaLabel('Lucky day').targetEvent(ev).ok(
								'Please do it!').cancel('Sounds like a scam');

				$mdDialog
						.show(confirm)
						.then(
								function() {
									$scope.batchesData = $scope.batchesData
											.filter(function(obj) {
												return $scope.selected
														.indexOf(obj.id) === -1;
											});
									$scope.batchesLength = $scope.batchesData.length;
								},
								function() {
									$scope.status = 'You decided to keep your Batch.';
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

/*dmtApplication.directive('createBatchForm', function($state) {
	return {
		restrict : 'EA',
		replace:true,
		templateUrl : function() {
			var current = $state.current.name;
			return '../dmt/pages/app.batch/app.batch.create.html';
		}
	};
});*/


