/*(function() {*/
    'use strict';
    dmtApplication
        .controller("supportInteractionController", supportInteractionController);

    function supportInteractionController($scope, supportInteractionService, Excel, $state, $mdDialog,
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
    $scope.supportInteractionsData = [];
    $scope.collection = [];
    $scope.selected = [];
    $scope.headerEnable = {};
    $scope.exportData = [];
    $scope.record = {
      "count": "",
      "leadId": "",
      "traineeId": "",
      "employeeId": "",
      "lead": "Sreenath Thatikonda",
      "date": "",
      "createdDate": "",
      "description": ""
    };   

    supportInteractionService.getAllEmployees().then(function(response) {
      $scope.employees = response.data;
    });
     supportInteractionService.getAllTrainees().then(function(response) {
      $scope.trainees = response.data;
    });

    supportInteractionService.getAllSupportInteractions().then(function(response) {
      $scope.supportInteractionsData = response.data;
      $scope.supportInteractionsLength = response.data.length;
      console.log($scope.supportInteractionsData);
      $scope.supportInteractionsOptions = [ 200 , 300];
      $scope.supportInteractionPage = {
        pageSelect : true
      };
      $scope.query = {
        order : 'name',
        limit : 100,
        page : 1
      };
    }, function(error) {

    });
  
    
    $scope.saveRecord = function() {   			
		supportInteractionService.create($scope.record).then(function(response) {
			
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
        "count": row.count,
      "leadId": row.leadId,
      "traineeId": row.traineeId,
      "employeeId": row.employeeId,
      "lead": "Sreenath Thatikonda",
      "date": row.date,
      "updatedDate": "",
      "description": row.description,
      "id":row.id
      };
      // console.log($scope.create.status);
    };
    $scope.updateRecord = function() {
     supportInteractionService.update($scope.record).then(function(response) {
      
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
      for ( var i in $scope.supportInteractionsData) {
        $scope.supportInteractionsData[i]["checkboxValue"] = 'on';
        $scope.selected.push($scope.supportInteractionsData[i].id);
      }
      ;
    };

    $scope.deSelectAll = function() {
      for ( var i in $scope.supportInteractionsData) {
        $scope.supportInteractionsData[i]["checkboxValue"] = 'off';
      }
      ;
      $scope.selected = [];
    };

    $scope.deleteSelected = function(ev) {
      // Appending dialog to document.body to cover sidenav in docs app
      if ($scope.selected.length > 0) {
        var confirm = $mdDialog
            .confirm()
            .title('Would you like to delete your Trainer?')
            .textContent(
                'All of the Tasks have agreed to forgive you your trainer.')
            .ariaLabel('Lucky day').targetEvent(ev).ok(
                'Please do it!').cancel('Sounds like a scam');

        $mdDialog.show(confirm).then(function() {
          $scope.supportInteractionsData = $scope.supportInteractionsData.filter(function(obj) {
            return $scope.selected.indexOf(obj.id) === -1;
          });
          $scope.supportInteractionsLength = $scope.supportInteractionsData.length;
        }, function() {
          $scope.status = 'You decided to keep your Trainer.';
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
    /* Side nav ends */
  }
  init();

  return self;
};
  


dmtApplication.directive('createSupportinteraction', function($state) {
  return {
    restrict : 'E',
    replace : true,
    templateUrl : function() {
      var current = $state.current.name;
      return '../dmt/pages/' + current + '/' + current + '.record.html';
    }
  };
});
