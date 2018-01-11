/*(function() {*/
'use strict';
dmtApplication.controller("TraineeController", TraineeController);

function TraineeController($scope, TraineeService, $mdDialog,$rootScope, $mdToast,
		$timeout, $state, $mdSidenav, $log) {

	var self = {
		init : init
	};
	function init() {
		// console.log($state.current.name);
		 $rootScope.currentController = 'Trainee';
		var current = $state.current.name;
		$rootScope.currentDataEnable = true;
		$scope.currentState = current.split(/[\s.]+/);
		$scope.currentRoute = $scope.currentState[$scope.currentState.length - 1];
		$scope.customFullscreen = false;
		$scope.updatePage = false;
		$scope.traineesData = [];
		$scope.collection = [];
		$scope.selected = [];
		$scope.headerEnable = {};
		$scope.exportData = [];
		$scope.headers = [ {"key":"batch","value":"Batch"},{"key":"status","value":"Status"},{"key":"client","value":"Client"}];
		$scope.headerEnable = {
				"batch" : false
			}, {
				"status" : false
			},{
				"client" : false
			};


		$scope.record = {
			"name" : "",
			"email" : "",
			"alternatePhone" : "",
			"clientId" : "",
			"skypeId" : "",
			"timezone" : "",
			"batchId" : "",
			"createdDate" :"",
			"description" : "",
			"phone" : "",
			"traineeFeeStatus" : "",
			"paidStatus" : "",
			"receivedStatus" : "",
			"technologyId" : ""
		};

		$scope.loading=true;
		TraineeService.getAllClients().then(function(response) {
			$scope.clients = response.data;
		});

		TraineeService.getAllTimezones().then(function(response) {
			$scope.timezones = response.data;
		});

		TraineeService.getAllBatchs().then(function(response) {
			$scope.batches = response.data;
		//	console.log("$scope.batches", $scope.batches);
		});

		TraineeService.getAllPaidStatus().then(function(response) {
			$scope.paidstatuses = response.data;
		});

		TraineeService.getAllReceivedStatus().then(function(response) {
			$scope.receivedstatuses = response.data;
		});

		TraineeService.getAllStatus().then(function(response) {
			$scope.statuses = response.data;
		});
		TraineeService.getAllTechnologies().then(function(response) {
			$scope.technologies = response.data;
		});

		TraineeService.getAllTrainees().then(function(response) {
		//	console.log(response.data.length);
			$scope.traineesData = response.data;
			$scope.traineesLength = response.data.length;
			$rootScope.currentTableLength = 'Records Count :'+response.data.length;
		//	console.log($scope.traineesData);
			$scope.traineesOptions = [ 200,300 ];
			$scope.traineePage = {
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
		var deregisterListener = $rootScope.$on("CallTraineeMethod", function(){
            if ($rootScope.$$listeners["CallTraineeMethod"].length > 1) {
                            $rootScope.$$listeners["CallTraineeMethod"].pop();

                }
           $scope.toggleRight();
           $scope.emptyForm();
        });
 var deregisterListener = $rootScope.$on("CallTraineeSearchMethod", function(event, args) {
            if ($rootScope.$$listeners["CallTraineeSearchMethod"].length > 1) {
                $rootScope.$$listeners["CallTraineeSearchMethod"].pop();
            }            
            $scope.filterByText = args.text;
        });
		$scope.saveRecord = function() {
			var jsonData = $scope.create;
			var date = new Date();
			TraineeService.create($scope.record).then(function(response) {
		//		console.log(response);
			});
			$scope.cancelRecord();
			  window.location.reload();
			
		}

		$scope.setRowData = function(row) {
		//	console.log(row);
			$scope.rowData = row;
			$scope.updatePage = true;
			$scope.record = {
				"name" : row.name,
				"email" : row.email,
				"alternatePhone" : row.alternatePhone,
				"clientId" : row.clientId,
				"skypeId" : row.skypeId,
				"timezone" : row.timezone,
				"batchId" : row.batchId,
				"updatedDate" :"",
				"description" : row.description,
				"phone" : row.phone,
				"traineeFeeStatus" : row.traineeFeeStatus,
				"paidStatus" : row.paidStatus,
				"receivedStatus" : row.receivedStatus,
				"technologyId" : row.technologyId,
				"id" : row.id
			};
			// console.log($scope.create.status);
		};
		$scope.updateData = function() {
			TraineeService.update($scope.record).then(function(response) {
				//console.log(response);
			});
			$scope.cancelRecord();
			   window.location.reload();
			    $scope.currentPage = 'Create';
		}
		
		$scope.cancelRecord = function() {
			$mdSidenav('right').close().then(function() {
					$log.debug("close RIGHT is done");
				});
				
			};
		$scope.emptyForm = function() {
			$scope.updatePage = false;
		$scope.record = {
			"name" : "",
			"email" : "",
			"alternatePhone" : "",
			"clientId" : "",
			"skypeId" : "",
			"timezone" : "",
			"batchId" : "",
			"createdDate" :"",
			"description" : "",
			"phone" : "",
			"traineeFeeStatus" : "",
			"paidStatus" : "",
			"receivedStatus" : "",
			"technologyId" : ""
		};

		};

		$scope.headerCheckbox = false;
		$scope.selectAll = function() {
			if(!$scope.headerCheckbox){
			for ( var i in $scope.traineesData) {
				$scope.traineesData[i]["checkboxValue"] = 'on';
				$scope.selected.push($scope.traineesData[i]);
			};
			$scope.headerCheckbox = ($scope.headerCheckbox == false)?true:false;
		}else if($scope.headerCheckbox){
			for ( var i in $scope.traineesData) {
				$scope.traineesData[i]["checkboxValue"] = 'off';
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
									TraineeService.deleteRow(row.id).then(function(response) {
				
			});
								   window.location.reload();
								},
								function() {
									$scope.status = 'You decided to keep your Task.';
								});
			
	
		};
		
		$scope.moreColumns = function(ev) {
			$mdDialog.show({
				controller : supportController,
				templateUrl : 'pages/app.trainee/app.trainee.moreHeaders.html',
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
	var originatorEv;
            this.openMenu = function($mdOpenMenu, ev) {
            originatorEv = ev;
               $mdOpenMenu(ev);
            };
            $scope.menuItemClick = function(index,key) {
            	
				
					if (key == 'batch') {
						$scope.batch = true;
						$scope.status = false;
						$scope.client = false;
					} else if (key == 'status') {
						$scope.status = true;
						$scope.batch = false;
						$scope.client = false;

					} else if (key == 'client') {
						$scope.client = true;
						$scope.status = false;
						$scope.batch = false;
					} 
            };

	return self;
};

dmtApplication.directive('createTrainee', function($state) {
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
