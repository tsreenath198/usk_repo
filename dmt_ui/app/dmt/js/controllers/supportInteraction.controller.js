/*(function() {*/
    'use strict';
    dmtApplication
        .controller("supportInteractionController", supportInteractionController);

    function supportInteractionController($scope, supportInteractionService, Excel, $state, $mdDialog,
    $mdToast, $timeout, $mdSidenav, $log, $rootScope) {
      var self = {
    init : init
  };
  function init() {
    $rootScope.currentController = 'Support Interaction';
    $scope.currentPage = 'Create';
    var current = $state.current.name;
    $rootScope.currentDataEnable = true;
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
      "traineeId": "",
      "employeeId": "",
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
    $scope.loading = true;
    supportInteractionService.getAllSupportInteractions().then(function(response) {
      $scope.supportInteractionsData = response.data;
      $scope.supportInteractionsLength = response.data.length;
      $rootScope.currentTableLength = 'Records Count :'+response.data.length;
     // console.log($scope.supportInteractionsData);
      $scope.supportInteractionsOptions = [ 200 , 300];
      $scope.supportInteractionPage = {
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
    var deregisterListener = $rootScope.$on("CallSupportInteractionMethod", function(){
      if ($rootScope.$$listeners["CallSupportInteractionMethod"].length > 1) {
                    $rootScope.$$listeners["CallSupportInteractionMethod"].pop();
            }
           $scope.toggleRight();
           $scope.emptyForm();
        });
       var deregisterListener = $rootScope.$on("CallsupportInteractionSearchMethod", function(event, args) {
            if ($rootScope.$$listeners["CallsupportInteractionSearchMethod"].length > 1) {
                $rootScope.$$listeners["CallsupportInteractionSearchMethod"].pop();
            }            
            $scope.filterByText = args.text;
        });
    
    
    /* Side nav ends */
  }
  init();
  $scope.saveRecord = function() {        
    supportInteractionService.create($scope.record).then(function(response) {     
    });
    $scope.cancelRecord();
      window.location.reload();
    };

    $scope.cancelRecord = function(){
        $mdSidenav('right').close().then(function() {
        $log.debug("close RIGHT is done");
      })
    };
  $scope.getLead = function(data){
      
      $scope.record['leadId'] = data.id;
      $scope.record['lead'] = data.name;
      
    };
    $scope.setRowData = function(row) {
      $scope.currentPage = 'Update';
      $scope.rowData = row;
      $scope.updatePage = true;
      $scope.leadId = row.leadId;
      $scope.record = {
        "count": row.count,
      
      "traineeId": row.traineeId,
      "employeeId": row.employeeId,
      
      "date": new Date(row.date),
      "updatedDate": "",
      "description": row.description,
      "id":row.id
      };
      // console.log($scope.create.status);
    };
    $scope.updateRecord = function() {
     supportInteractionService.update($scope.record).then(function(response) {
      
    });
     $scope.cancelRecord();
        window.location.reload();
     $scope.currentPage = 'Create';
    }
    $scope.emptyForm = function() {
      $scope.updatePage = false;
      $scope.leadId = '';
     $scope.record = {
      "count": "",
      "traineeId": "",
      "employeeId": "",
      "date": "",
      "createdDate": "",
      "description": ""
    };   
    };

    $scope.rowSelect = function(row) {
      $scope.selected.push(row);
    };
    $scope.headerCheckbox = false;
    $scope.selectAll = function() {
     if(!$scope.headerCheckbox){
      for ( var i in $scope.supportInteractionsData) {
        $scope.supportInteractionsData[i]["checkboxValue"] = 'on';
        $scope.selected.push($scope.supportInteractionsData[i]);
      };
      $scope.headerCheckbox = ($scope.headerCheckbox == false)?true:false;
    }else if($scope.headerCheckbox){
      for ( var i in $scope.supportInteractionsData) {
        $scope.supportInteractionsData[i]["checkboxValue"] = 'off';
        $scope.selected = [];
      };
      $scope.headerCheckbox = ($scope.headerCheckbox == true)?false:true;
    };
   // console.log($scope.selected);
    };

    $scope.deSelectAll = function() {
      for ( var i in $scope.supportInteractionsData) {
        $scope.supportInteractionsData[i]["checkboxValue"] = 'off';
      }
      ;
      $scope.selected = [];
    };

    $scope.deleteRow = function(ev,row) {
      
       var confirm = $mdDialog
            .confirm()
            .title('Are you sure want to Delete Record?')
            
            .ariaLabel('Lucky day').targetEvent(ev).ok(
                'Ok').cancel('Cancel');
        $mdDialog.show(confirm).then(function() {
          supportInteractionService.deleteRow(row.id).then(function(response) {
      
        });
         window.location.reload();
        }, function() {
          $scope.status = 'You decided to keep your Trainer.';
        });
     
    };

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
