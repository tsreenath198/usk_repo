/*(function() {*/
'use strict';
dmtApplication.controller("salaryController", salaryController);

function salaryController($scope, salaryService,$rootScope, Excel, $state, $mdDialog,
		$mdToast, $timeout, $mdSidenav, $log) {
	var self = {
		init : init
	};
	function init() {
		// console.log($state.current.name);
		$rootScope.currentController = 'Payroll';
		var current = $state.current.name;
		$scope.currentState = current.split(/[\s.]+/);
		$scope.currentRoute = $scope.currentState[$scope.currentState.length - 1];
		$scope.customFullscreen = false;
		$scope.updatePage = false;
		$scope.salariesData = [];
		$scope.collection = [];
		$scope.selected = [];
		$scope.headerEnable = {};
		$scope.exportData = [];
		$scope.headers = [ "month" ];
        $scope.headerEnable = {
            "month" : false
        };

		$scope.record = {
			"employeeId": "",
			"month": "",
			"year": "",
			"salary": "",
			"createdDate": "",
			"description": ""
		};
		salaryService.getAllEmployees().then(function(response) {
			$scope.employees = response.data;
		});

		$scope.getBatchesIntoPayRoll = function(id){
			$rootScope.empId = id;
			salaryService.getAllBatchesBasedOnEmployeeId($rootScope.empId).then(function(response) {
				$scope.batchesData = response.data;
				console.log($scope.batchesData);
					});
			
        }
		
        salaryService.getAllMonth().then(function(response) {
            $scope.months = response.data;
        });
		$scope.loading = true;
		salaryService.getAllSalaries().then(function(response) {
			$scope.salariesData = response.data;
			$scope.salariesLength = response.data.length;
		console.log($scope.salariesData);
			$rootScope.currentTableLength = 'Records Count :'+response.data.length;
			$scope.salariesOptions = [ 200 , 300 ];
			$scope.salaryPage = {
				pageSelect : true
			};
			$scope.query = {
				order : 'name',
				limit : 100,
				page : 1
			};
			$scope.loading = false;
		}, function(error) {
			alert("failed");
					$scope.loading=false;
		});	
		var deregisterListener = $rootScope.$on("CallSalaryMethod", function(){
			if ($rootScope.$$listeners["CallSalaryMethod"].length > 1) {
				            $rootScope.$$listeners["CallSalaryMethod"].pop();
        		}
           $scope.toggleRight();
           $scope.emptyForm();
          // $scope.destroyListener();
        });
	var deregisterListener = $rootScope.$on("CallSalarySearchMethod", function(event, args) {
            if ($rootScope.$$listeners["CallSalarySearchMethod"].length > 1) {
                $rootScope.$$listeners["CallSalarySearchMethod"].pop();
            }            
            $scope.filterByText = args.text;
        });
	}
	init();

		$scope.saveRecord = function() {			
			salaryService.create($scope.record).then(function(response) {
				
			});
			$scope.cancelRecord();
			  window.location.reload();
		}

		$scope.setRowData = function(row) {
			
			$scope.rowData = row;
			$scope.updatePage = true;
			$scope.record = {				
				"employeeId": row.employeeId,
				"month": row.month,
				"year": row.year,
				"salary": row.salary,
				"updatedDate": "",
				"description": row.description,				
				"id" : row.id
			};
			// console.log($scope.create.status);
		};
		$scope.updateRecord = function() {
			//console.log($scope.record);
			salaryService.update($scope.record).then(function(response) {
				
			});
			$scope.cancelRecord();
			   window.location.reload();
			   $scope.currentPage = 'Create';
		}
		$scope.emptyForm = function() {
			$scope.updatePage = false;
			$scope.record = {
			
			"employeeId": "",
			"month": "",
			"year": "",
			"salary": "",
			"createdDate": "",
			"description": ""
		};
		};
		$scope.cancelRecord = function() {
		$mdSidenav('right').close().then(function() {
				$log.debug("close RIGHT is done");
			});
			
		};

		$scope.rowSelect = function(row) {
			$scope.selected.push(row);
		};
		$scope.headerCheckbox = false;
		$scope.selectAll = function() {
			if(!$scope.headerCheckbox){
			for ( var i in $scope.salariesData) {
				$scope.salariesData[i]["checkboxValue"] = 'on';
				$scope.selected.push($scope.salariesData[i]);
			};
			$scope.headerCheckbox = ($scope.headerCheckbox == false)?true:false;
		}else if($scope.headerCheckbox){
			for ( var i in $scope.salariesData) {
				$scope.salariesData[i]["checkboxValue"] = 'off';
				$scope.selected = [];
			};
			$scope.headerCheckbox = ($scope.headerCheckbox == true)?false:true;
		};
		//console.log($scope.selected);
		};

			

			$scope.deleteRow = function(ev,row) {
			
				var confirm = $mdDialog
						.confirm()
						.title('Are you sure want to Delete Record?')
						
						.ariaLabel('Lucky day').targetEvent(ev).ok(
								'Ok').cancel('Cancel');

				$mdDialog
						.show(confirm)
						.then(
								function() {
									salaryService.deleteRow(row.id).then(function(response) {
				
			});
								   window.location.reload();
								},
								function() {
									$scope.status = 'You decided to keep your Task.';
								});
			
	
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

	return self;


};

dmtApplication.directive('createSalary', function($state) {
	return {
		restrict : 'E',
		replace : true,
		templateUrl : function() {
			var current = $state.current.name;
			return '../dmt/pages/' + current + '/' + current + '.record.html';
		}
	};
});
