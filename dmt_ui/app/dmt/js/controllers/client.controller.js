/*(function() {*/
'use strict';
dmtApplication.controller("clientController", clientController);

function clientController($scope, clientService, Excel, $state, $mdDialog,
		$mdToast, $timeout, $mdSidenav, $log,$rootScope) {
	var self = {
		init : init
	};
	function init() {
		$rootScope.currentController = 'Client';
		$scope.currentPage = 'Create';
		$rootScope.currentDataEnable = true;
		var current = $state.current.name;
		$scope.currentState = current.split(/[\s.]+/);
		$scope.currentRoute = $scope.currentState[$scope.currentState.length - 1];
		$scope.customFullscreen = false;
		$scope.updatePage = false;
		$scope.clientsData = [];
		$scope.collection = [];
		$scope.selected = [];
		$scope.headerEnable = {};
		$scope.exportData = [];
		

		$scope.addMoreContacts = function(){
				$scope.record.contacts.push({"poc":"","email":"","telephone":"","designation":""});
		};

		$scope.removeContacts = function(index){
            $scope.record.contacts.splice(index, 1);
                     }

        $scope.checkButton = function() {
         if ($scope.record.contacts.length == 1) { // your question said "more than one element"
         return true;
            }
        else {
         return false;
          }
        };


		$scope.cancelRecord = function(){
			$mdSidenav('right').close().then(function() {
				$log.debug("close RIGHT is done");
			});
		}		
				 
		$scope.record = {
			"name":"",
			"address":"",
			"createdDate":"",
			"description":"",
			"contacts":[{"poc":"","email":"","telephone":"","designation":""}]			
		};
		clientService.getAllTechnologies().then(function(response) {
			$scope.technologies = response.data;
		});
		$scope.loading = true;
		clientService.getAllClients().then(function(response) {
		//	console.log(response.data.length)
			$scope.clientsData = response.data;
			$scope.clientsLength = response.data.length;
			$rootScope.currentTableLength = 'Records Count :'+response.data.length;
			// console.log($scope.tasksData);
			$scope.clientsOptions = [ 200 , 300];
			$scope.clientPage = {
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
		var deregisterListener = $rootScope.$on("CallClientMethod", function(){
			if ($rootScope.$$listeners["CallClientMethod"].length > 1) {
				            $rootScope.$$listeners["CallClientMethod"].pop();

        		}
           $scope.toggleRight();
           $scope.emptyForm();
        });       
 var deregisterListener = $rootScope.$on("CallClientSearchMethod", function(event, args) {
            if ($rootScope.$$listeners["CallClientSearchMethod"].length > 1) {
                $rootScope.$$listeners["CallClientSearchMethod"].pop();
            }            
            $scope.filterByText = args.text;
        });
	}
	init();



	$scope.saveRecord = function() {
			//console.log($scope.record);	
			clientService.create($scope.record).then(function(response) {
				//console.log("resp", response);
			});					
			$scope.cancelRecord();	
			   window.location.reload();

		}
		$scope.contactList = [];
		$scope.setRowData = function(row) {
			$scope.currentPage = 'Update';
			$scope.rowData = row;
			$scope.updatePage = true;
			$scope.clientId = {"clientId":row.id};
			clientService.getContactsById($scope.clientId).then(function(response) {
				$scope.contactList = response.data;
			});
			$scope.record = {
			"name":row.name,
			"address":row.address,
			"updatedDate":"",
			"description":row.description,
			"contacts":$scope.contactList,
			"id" : row.id			
		};

		};
		$scope.updateRecord = function() {
			//console.log($scope.record);
			clientService.update($scope.record).then(function(response) {
				//console.log("resp", response);
			});
			$scope.cancelRecord();
			   window.location.reload();
			$scope.currentPage = 'Create';
		}
		$scope.emptyForm = function() {
			$scope.updatePage = false;
			$scope.record = {
			"name":"",
			"address":"",
			"createdDate":"",
			"description":"",
			"contacts":[{"poc":"","email":"","telephone":"","designation":""}]			
		};
			
		};

		$scope.rowSelect = function(row) {
			$scope.selected.push(row);
		};
		$scope.headerCheckbox = false;
		$scope.selectAll = function() {
			if(!$scope.headerCheckbox){
			for ( var i in $scope.clientsData) {
				$scope.clientsData[i]["checkboxValue"] = 'on';
				$scope.selected.push($scope.clientsData[i]);
			};
			$scope.headerCheckbox = ($scope.headerCheckbox == false)?true:false;
		}else if($scope.headerCheckbox){
			for ( var i in $scope.clientsData) {
				$scope.clientsData[i]["checkboxValue"] = 'off';
				$scope.selected = [];
			};
			$scope.headerCheckbox = ($scope.headerCheckbox == true)?false:true;
		};
		//console.log($scope.selected);
		};

		
		$scope.deleteRow = function(ev,row) {
			// Appending dialog to document.body to cover sidenav in docs app
			
				var confirm = $mdDialog
						.confirm()
						.title('Are you sure want to Delete Record?')
						
						.ariaLabel('Lucky day').targetEvent(ev).ok(
								'Ok').cancel('Cancel');

				$mdDialog.show(confirm).then(function() {
						clientService.deleteRow(row.id).then(function(response) {
			});
						   window.location.reload();
				}, function() {
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

dmtApplication.directive('createClient', function($state) {
	return {
		restrict : 'E',
		replace : true,
		templateUrl : function() {
			var current = $state.current.name;
			return '../dmt/pages/' + current + '/' + current + '.record.html';
		}
	};
});
