/*(function() {*/
'use strict';
dmtApplication.controller("batchAttendanceController",
		batchAttendanceController);

function batchAttendanceController($scope, batchAttendanceService, $rootScope,Excel,
		$state, $mdDialog, $mdToast, $timeout, $mdSidenav, $log, $filter) {
	var self = {
		init : init
	};
	function init() {
		// console.log($state.current.name);
		$rootScope.currentController = 'Batch Attendances';
		var current = $state.current.name;
		$rootScope.currentDataEnable = true;
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
			"createdDate" : "",
			"description" : ""
		};

		
		 batchAttendanceService.getAllBatches().then(function(response) {
			 
		  $scope.batches = response.data; 
		  });
		
		
          $scope.loading=true;
		batchAttendanceService.getAllBatchAttendances().then(
				function(response) {
					$scope.batchAttendancesData = response.data;			
					//  console.log($scope.batchAttendancesData);
					  $rootScope.currentTableLength = 'Records Count :'+response.data.length;
					  $scope.batchAttendancesOptions = [ 200,300 ];
					  $scope.batchAttendancePage = { pageSelect : true };
					  $scope.query = { order : 'name', limit : 100, page : 1 };
					  $scope.loading=false;
				}, function(error) {

					alert("failed");
					$scope.loading=false;
	});
		var deregisterListener = $rootScope.$on("CallBatchAttendancesMethod", function(){
            if ($rootScope.$$listeners["CallBatchAttendancesMethod"].length > 1) {
                            $rootScope.$$listeners["CallBatchAttendancesMethod"].pop();

                }
           $scope.toggleRight();
           $scope.emptyForm();
        });

        var deregisterListener = $rootScope.$on("CallbatchAttendancesSearchMethod", function(event, args) {
            if ($rootScope.$$listeners["CallbatchAttendancesSearchMethod"].length > 1) {
                $rootScope.$$listeners["CallbatchAttendancesSearchMethod"].pop();
            }            
            $scope.filterByText = args.text;
        });
        

		$scope.traineesList = [];
		$scope.showTrainees = function(record) {
			if (record.batchId && record.batchId != '') {
				batchAttendanceService.trainees(record.batchId).success(
						function(response) {
							
							$scope.traineesList = response;
							//console.log($scope.traineesList);
							$scope.traineesList.push(response);
							
                            //console.log($scope.traineesList);
						});
			} else {

			}
		}

		$scope.saveRecord = function() {
			$scope.record["traineeIds"] = JSON.stringify($scope.trainees);
			batchAttendanceService.create($scope.record).then(
					function(response) {
						//console.log(response);
					});
			$scope.cancelRecord();
			window.location.reload();
			//$state.reload();
		}

		$scope.setRowData = function(row) {
			//console.log(row);
			$scope.rowData = row;
			$scope.updatePage = true;
			$scope.record = {
				"id" : row.id,
				"batchId" : row.batchId,
				"date" : new Date(row.date),
				"traineeIds" : row.traineeId,
				"updatedDate" : "",
				"description" : row.description
			};
		};
		$scope.updateData = function() {
			//console.log($scope.create);
		$scope.record["traineeIds"] = JSON.stringify($scope.trainees);
			batchAttendanceService.update($scope.record).then(
					function(response) {
						//$scope.technology = response.data;
						console.log(response);
					});
			$scope.cancelRecord();
			window.location.reload();
			//$state.reload();
		}
		$scope.emptyForm = function() {
			$scope.updatePage = false;
			$scope.create = {};
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
			for ( var i in $scope.batchAttendancesData) {
				$scope.batchAttendancesData[i]["checkboxValue"] = 'on';
				$scope.selected.push($scope.batchAttendancesData[i]);
			};
			$scope.headerCheckbox = ($scope.headerCheckbox == false)?true:false;
		}else if($scope.headerCheckbox){
			for ( var i in $scope.batchAttendancesData) {
				$scope.batchAttendancesData[i]["checkboxValue"] = 'off';
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
									batchAttendanceService.deleteRow(row.id).then(function(response) {
				
			});
								$state.reload();
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
