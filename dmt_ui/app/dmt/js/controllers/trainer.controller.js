/*(function() {*/
    'use strict';
    dmtApplication
        .controller("TrainerController", TrainerController);

    function TrainerController($scope, TrainerService, Excel, $state, $mdDialog,
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
    $scope.trainersData = [];
    $scope.collection = [];
    $scope.selected = [];
    $scope.headerEnable = {};
    $scope.exportData = [];
    $scope.record = {
      "name" : "",
      "referredBy" : "",
      "technologyId" : "",
      "phone" : "",
      "email" : "",
      "createdDate":"",
      "description" : ""
    };
    
    $scope.loading = true;
    TrainerService.getAllEmployees().then(function(response) {
      $scope.employees = response.data;
    });
     TrainerService.getAllTechnologies().then(function(response) {
      $scope.technologies = response.data;
    });

    TrainerService.getAllTrainers().then(function(response) {
      $scope.trainersData = response.data;
      $scope.trainersLength = response.data.length;
      console.log($scope.trainersData);
      $scope.trainersOptions = [ 200,300];
      $scope.trainerPage = {
        pageSelect : true
      };
      $scope.query = {
        order : 'name',
        limit : 100,
        page : 1
      };
      $scope.loading = false;
    }, function(error) {

    });
  
    
    $scope.saveRecord = function() {
		TrainerService.create($scope.record).then(function(response) {
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
        "referredBy" : row.referredBy,
        "technologyId" : row.technologyId,
        "phone" : row.phone,
        "email" : row.email,
        "updatedDate" : "",
        "description" : row.description,
        "id" : row.id
      };
    };
    $scope.updateData = function() {
     
     TrainerService.update($scope.record).then(function(response) {
			//$scope.technology = response.data;
			console.log(response);
		});
      $mdSidenav('right').close().then(function() {
        $log.debug("close RIGHT is done");
      });
    }
    $scope.emptyForm = function() {
      $scope.updatePage = false;
      $scope.record = {};
    };

    $scope.rowSelect = function(row) {
      $scope.selected.push(row.id);
    };
    $scope.selectAll = function() {
      for ( var i in $scope.trainersData) {
        $scope.trainersData[i]["checkboxValue"] = 'on';
        $scope.selected.push($scope.trainersData[i].id);
      }
      ;
    };

    $scope.deSelectAll = function() {
      for ( var i in $scope.trainersData) {
        $scope.trainersData[i]["checkboxValue"] = 'off';
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
          $scope.trainersData = $scope.trainersData.filter(function(obj) {
            return $scope.selected.indexOf(obj.id) === -1;
          });
          $scope.trainersLength = $scope.trainersData.length;
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
  


dmtApplication.directive('createTrainer', function($state) {
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
        
