/*(function() {*/
'use strict';
dmtApplication.controller("TraineeController", TraineeController);

function TraineeController($scope, TraineeService, $mdDialog, $mdToast,
		$timeout, $state, $mdSidenav, $log) {

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
		$scope.traineesData = [];
		$scope.collection = [];
		$scope.selected = [];
		$scope.headerEnable = {};
		$scope.exportData = [];
		$scope.headers = [ "Batch", "Status", "Client","Skype Id","Altenate Phone","Time Zone"];
		$scope.headerEnable = {
				"Batch" : false
			}, {
				"Status" : false
			},{
				"Client" : false
			},{
				"Skype Id" : false
			},{
				"Altenate Phone" : false
			},{
				"Time Zone" : false
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
			console.log("$scope.batches", $scope.batches);
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
			$scope.traineesData = response.data;
			$scope.traineesLength = response.data.length;
			console.log($scope.traineesData);
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

		});

		$scope.saveRecord = function() {
			var jsonData = $scope.create;
			var date = new Date();
			// var dataForCreate = [ jsonData.name,date,jsonData.description ];
			TraineeService.create($scope.record).then(function(response) {
				// $scope.technology = response.data;
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
			for ( var i in $scope.traineesData) {
				$scope.traineesData[i]["checkboxValue"] = 'on';
				$scope.selected.push($scope.traineesData[i].id);
			}
			;
		};

		$scope.deSelectAll = function() {
			for ( var i in $scope.traineesData) {
				$scope.traineesData[i]["checkboxValue"] = 'off';
			}
			;
			$scope.selected = [];
		};

		$scope.deleteSelected = function(ev) {
			// Appending dialog to document.body to cover sidenav in docs app
			if ($scope.selected.length > 0) {
				var confirm = $mdDialog
						.confirm()
						.title('Would you like to delete your Trainee?')
						.textContent(
								'All of the Tasks have agreed to forgive you your trainee.')
						.ariaLabel('Lucky day').targetEvent(ev).ok(
								'Please do it!').cancel('Sounds like a scam');

				$mdDialog
						.show(confirm)
						.then(
								function() {
									$scope.traineesData = $scope.traineesData
											.filter(function(obj) {
												return $scope.selected
														.indexOf(obj.id) === -1;
											});
									$scope.traineesLength = $scope.traineesData.length;
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

		$scope.openMoreOptions = function(header) {
			if (header.length > 0) {
				for ( var i in header) {
					if (header[i] == 'Batch') {
						$scope.headerEnable.batchId = true;
					} else if (header[i] == 'Status') {
						$scope.headerEnable.traineeFeeStatus = true;
					} else if (header[i] == 'Client') {
						$scope.headerEnable.clientId = true;
					}
					else if (header[i] == 'Skype Id') {
						$scope.headerEnable.skypeId = true;
					}
					else if (header[i] == 'Time Zone') {
						$scope.headerEnable.timezone = true;
					}
					else if (header[i] == 'Alternate Phone') {
						$scope.headerEnable.alternatePhone = true;
					}
					
				}
			} else {
				$scope.headerEnable = {
						"Batch" : false
				}, {
					"Status" : false
				},{
					"Client" : false
				},{
					"Skype Id" : false
				},{
					"Altenate Phone" : false
				},{
					"Time Zone" : false
				};
			}
		}

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
