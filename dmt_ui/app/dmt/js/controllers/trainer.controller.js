/*(function() {*/
'use strict';
dmtApplication
  .controller("TrainerController", TrainerController);

function TrainerController($scope, TrainerService, Excel, $state, $rootScope, $mdDialog,
  $mdToast, $timeout, $mdSidenav, $log) {
  var self = {
    init: init
  };

  function init() {
    // console.log($state.current.name);
    $rootScope.currentController = 'Trainer';
    var current = $state.current.name;
    $rootScope.currentDataEnable = true;
    $scope.currentState = current.split(/[\s.]+/);
    $scope.currentRoute = $scope.currentState[$scope.currentState.length - 1];
    $scope.customFullscreen = false;
    $scope.currentPage = 'Create';
    $scope.updatePage = false;
    $scope.trainersData = [];
    $scope.collection = [];
    $scope.selected = [];
    $scope.headerEnable = {};
    $scope.exportData = [];
    $scope.record = {
      "name": "",
      "referredBy": "",
      "technologyId": "",
      "phone": "",
      "email": "",
      "createdDate": "",
      "description": ""
    };

    $scope.loading = true;
    TrainerService.getAllEmployees().then(function (response) {
      $scope.employees = response.data;
    });
    TrainerService.getAllTechnologies().then(function (response) {
      $scope.technologies = response.data;
    });

    TrainerService.getAllTrainers().then(function (response) {
      $scope.trainersData = response.data;
      $scope.trainersLength = response.data.length;
      $rootScope.currentTableLength = 'Records Count :' + response.data.length;
      // console.log($scope.trainersData);
      $scope.trainersOptions = [200, 300];
      $scope.trainerPage = {
        pageSelect: true
      };
      $scope.query = {
        order: 'name',
        limit: 100,
        page: 1
      };
      $scope.loading = false;
    }, function (error) {
      alert("failed");
      $scope.loading = false;
    });
    var deregisterListener = $rootScope.$on("CallTrainerMethod", function () {
      if ($rootScope.$$listeners["CallTrainerMethod"].length > 1) {
        $rootScope.$$listeners["CallTrainerMethod"].pop();

      }
      $scope.currentPage = "Create";
      $scope.toggleRight();
      $scope.emptyForm();
    });
    var deregisterListener = $rootScope.$on("CallTrainerSearchMethod", function (event, args) {
      if ($rootScope.$$listeners["CallTrainerSearchMethod"].length > 1) {
        $rootScope.$$listeners["CallTrainerSearchMethod"].pop();
      }
      $scope.filter = args.text;
    });

    $scope.saveRecord = function () {
      TrainerService.create($scope.record).then(function (response) {
        //		console.log(response);
      });
      $scope.cancelRecord();
      window.location.reload();
    }
    $scope.cancelRecord = function () {
      $mdSidenav('right').close().then(function () {
        $log.debug("close RIGHT is done");
      });

    };
    $scope.setRowData = function (row) {
      //  console.log(row);
      $scope.rowData = row;
      $scope.updatePage = true;
      $scope.currentPage = 'Update';
      $scope.record = {
        "name": row.name,
        "referredBy": row.referredBy,
        "technologyId": row.technologyId,
        "phone": row.phone,
        "email": row.email,
        "updatedDate": "",
        "description": row.description,
        "id": row.id
      };
    };
    $scope.updateData = function () {

      TrainerService.update($scope.record).then(function (response) {
        //$scope.technology = response.data;
        //console.log(response);
      });
      $scope.cancelRecord();
      window.location.reload();
      $scope.currentPage = 'Create';
    }
    $scope.emptyForm = function () {
      $scope.updatePage = false;
      $scope.record = {
        "name": "",
        "referredBy": "",
        "technologyId": "",
        "phone": "",
        "email": "",
        "createdDate": "",
        "description": ""
      };
    };

    $scope.rowSelect = function (row) {
      $scope.selected.push(row.id);
    };
    $scope.headerCheckbox = false;
    $scope.selectAll = function () {
      if (!$scope.headerCheckbox) {
        for (var i in $scope.trainersData) {
          $scope.trainersData[i]["checkboxValue"] = 'on';
          $scope.selected.push($scope.trainersData[i]);
        };
        $scope.headerCheckbox = ($scope.headerCheckbox == false) ? true : false;
      } else if ($scope.headerCheckbox) {
        for (var i in $scope.trainersData) {
          $scope.trainersData[i]["checkboxValue"] = 'off';
          $scope.selected = [];
        };
        $scope.headerCheckbox = ($scope.headerCheckbox == true) ? false : true;
      };
      //	console.log($scope.selected);
    };



    $scope.deleteRow = function (ev, row) {

      var confirm = $mdDialog
        .confirm()
        .title('Are you sure want to Delete Record?')

        .ariaLabel('Lucky day').targetEvent(ev).ok(
          'Ok').cancel('Cancel');

      $mdDialog
        .show(confirm)
        .then(
          function () {
            TrainerService.deleteRow(row.id).then(function (response) {

            });
            window.location.reload();
          },
          function () {
            $scope.status = 'You decided to keep your Task.';
          });


    };

    $scope.export = function (tableId) {
      // $scope.tasksOptions = [ $scope.tasksData.length ];
      var exportHref = Excel.tableToExcel(tableId, 'sheet name');
      $timeout(function () {
        location.href = exportHref;
      }, 100); // trigger download
    }

    /* Tooltip Starrts */

    $scope.demo = {
      showTooltip: false,
      tipDirection: ''
    };

    $scope.demo.delayTooltip = undefined;
    $scope.$watch('demo.delayTooltip', function (val) {
      $scope.demo.delayTooltip = parseInt(val, 10) || 0;
    });

    $scope.$watch('demo.tipDirection', function (val) {
      if (val && val.length) {
        $scope.demo.showTooltip = true;
      }
    });
    /* Tooltip Ends */

    /* Side nav starts */
    $scope.toggleLeft = buildDelayedToggler('left');
    $scope.toggleRight = buildToggler('right');
    $scope.isOpenRight = function () {
      return $mdSidenav('right').isOpen();
    };

    function debounce(func, wait, context) {
      var timer;

      return function debounced() {
        var context = $scope,
          args = Array.prototype.slice
          .call(arguments);
        $timeout.cancel(timer);
        timer = $timeout(function () {
          timer = undefined;
          func.apply(context, args);
        }, wait || 10);
      };
    }

    function buildDelayedToggler(navID) {
      return debounce(function () {
        // Component lookup should always be available since we are not
        // using `ng-if`
        $mdSidenav(navID).toggle().then(function () {
          $log.debug("toggle " + navID + " is done");
        });
      }, 200);
    }

    function buildToggler(navID) {

      return function () {
        // Component lookup should always be available since we are not
        // using `ng-if`
        $mdSidenav(navID).toggle().then(function () {
          $log.debug("toggle " + navID + " is done");
        });
      }
    }
    /* Side nav ends */
  }
  init();

  return self;
};