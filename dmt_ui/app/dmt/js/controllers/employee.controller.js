'use strict';
dmtApplication.controller("EmployeeController", EmployeeController);

function EmployeeController($scope, EmployeeService, Excel,$rootScope, $state, $mdDialog,
		$mdToast, $timeout, $mdSidenav, $log) {

	var self = {
		init : init
	};
	function init() {
		// console.log($state.current.name);
		$rootScope.currentController = 'Employee';
		var current = $state.current.name;
		$rootScope.currentDataEnable = true;
		$scope.currentState = current.split(/[\s.]+/);
		$scope.currentRoute = $scope.currentState[$scope.currentState.length - 1];
		$scope.customFullscreen = false;
		$scope.updatePage = false;
		$scope.employeesData = [];
		$scope.collection = [];
		$scope.selected = [];
		$scope.headerEnable = {};
		$scope.exportData = [];

		$scope.record = {
			"name" : "",
			"phone" : "",
			"email" : "",
			"role" : "",
			"baseSalary" : "",
			"createdDate" : "",
			"description" : ""
		};
		$scope.loading=true;
		EmployeeService.getAllRoles().then(function(response) {
			$scope.roles = response.data;
			
			});


		EmployeeService.getAllEmployees().then(function(response) {
			$scope.employeesData = response.data;
			$scope.employeesLength = response.data.length;
			$rootScope.currentTableLength = 'Records Count :'+response.data.length;
		//	console.log($scope.employeesData);
			$scope.employeesOptions = [ 200,300 ];
			$scope.employeePage = {
				pageSelect : true
			};
			$scope.query = {
				order : 'name',
				limit : 100,
				page : 1
			};
			$scope.loading=false;
		}, function(error) {
			alert("failed");
					$scope.loading=false;
		});
		var deregisterListener = $rootScope.$on("CallEmployeeMethod", function(){
            if ($rootScope.$$listeners["CallEmployeeMethod"].length > 1) {
                            $rootScope.$$listeners["CallEmployeeMethod"].pop();

                }
           $scope.toggleRight();
           $scope.emptyForm();
        });
        var deregisterListener = $rootScope.$on("CallEmployeeSearchMethod", function(event, args) {
            if ($rootScope.$$listeners["CallEmployeeSearchMethod"].length > 1) {
                $rootScope.$$listeners["CallEmployeeSearchMethod"].pop();
            }            
            $scope.filter = args.text;
        });


		$scope.saveRecord = function() {
			EmployeeService.create($scope.record).then(function(response) {
			//	console.log(response);
			});
			$scope.cancelRecord();
			  window.location.reload();
		}

		$scope.setRowData = function(row) {
			//console.log(row);
			$scope.updatePage = true;
			$scope.record = {
				"name" : row.name,
				"phone" : row.phone,
				"email" : row.email,
				"role" : row.role,
				"baseSalary" : row.baseSalary,
				"updatedDate" : "",
				"description" : row.description,
				"id" : row.id
			};
		};
		$scope.updateData = function() {
			// console.log($scope.create);
			EmployeeService.update($scope.record).then(function(response) {
				// $scope.technology = response.data;
				//console.log(response);
			});
			$scope.cancelRecord();
			   window.location.reload();
			    $scope.currentPage = 'Create';
		}
		$scope.emptyForm = function() {
			$scope.updatePage = false;
			$scope.record = {
			"name" : "",
			"phone" : "",
			"email" : "",
			"role" : "",
			"baseSalary" : "",
			"createdDate" : "",
			"description" : ""
		};
		};
		$scope.cancelRecord = function() {
			$mdSidenav('right').close().then(function() {
					$log.debug("close RIGHT is done");
				});
				
			};
		$scope.rowSelect = function(row) {
			$scope.selected.push(row.id);
		};
		$scope.headerCheckbox = false;
		$scope.selectAll = function() {
			if(!$scope.headerCheckbox){
			for ( var i in $scope.employeesData) {
				$scope.employeesData[i]["checkboxValue"] = 'on';
				$scope.selected.push($scope.employeesData[i]);
			};
			$scope.headerCheckbox = ($scope.headerCheckbox == false)?true:false;
		}else if($scope.headerCheckbox){
			for ( var i in $scope.employeesData) {
				$scope.employeesData[i]["checkboxValue"] = 'off';
				$scope.selected = [];
			};
			$scope.headerCheckbox = ($scope.headerCheckbox == true)?false:true;
		};
	//	console.log($scope.selected);
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
									EmployeeService.deleteRow(row.id).then(function(response) {
				
			});
								   window.location.reload();
								},
								function() {
									$scope.status = 'You decided to keep your Task.';
								});
			
	
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
		/* Side nav ends */
	}
	init();

	return self;
};

dmtApplication.directive('createEmployee', function($state) {
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
