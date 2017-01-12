/*(function() {*/
    'use strict';
    dmtApplication
        .controller("taskController", taskController);

    function taskController($scope,TaskService,$mdDialog,$mdToast,$state, $mdSidenav,$log) {         

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
        $scope.TaskData = [];
        $scope.collection = [];
        $scope.selected = [];
        $scope.headerEnable = {};
        $scope.exportData = [];


        $scope.record = {           
            "category": "",
            "taskDate": "",
            "status": "",
            "assignedTo":"" ,
            "estimatedTime": "",
            "createdDate": "",
            "description": ""
        };
        TaskService.getAllEmployees().then(function(response) {
                $scope.employees = response.data;
            });
        TaskService.getAllStatuses().then(function(response) {
                  $scope.statuses = response.data;
            });

        TaskService.getAllTimes().then(function(response) {
                  $scope.times = response.data;
            });
        TaskService.getAllTask().then(function(response) {
            $scope.TaskData = response.data;
            $scope.TaskLength = response.data.length;
            console.log($scope.TaskData);
            $scope.TaskOptions = [ 5, 10, 15 ];
            $scope.TaskPage = {
                pageSelect : true
            };

            $scope.query = {
                order : 'name',
                limit : 5,
                page : 1
            };
        }, function(error) {

        });
    
        
        $scope.saveRecord = function() {
             console.log($scope.record);
          TaskService.create($scope.record).then(function(response) {
                console.log("resp", response);
            });
            $mdSidenav('right').close().then(function() {
                $log.debug("close RIGHT is done");
            });
        }

        $scope.updateRow = function(row) {
             console.log(row);
            $scope.rowData = row;
            $scope.updatePage = true;
            $scope.record = { 

            "category" :row.category,
            "taskDate":new Date(row.taskDate),
            "status":row.status,
            "assignedTo":row.assignedTo,
            "estimatedTime":row.estimatedTime,
            "updatedDate": "",
            "description":row.description,
             "id" : row.id
            };
            // console.log($scope.create.status);
        };
        $scope.updateRecord = function() {
            // console.log($scope.create);

          TaskService.update($scope.record).then(function(response) {
                console.log("resp", response);
            });

            $mdSidenav('right').close().then(function() {
                $log.debug("close RIGHT is done");
            });
        }
        $scope.emptyForm1 = function() {
            $scope.updatePage = false;
            $scope.create = {};
        };

        $scope.rowSelect = function(row) {
            $scope.selected.push(row.id);
        };
        $scope.selectAll = function() {
            for ( var i in $scope.taskData) {
                $scope.taskData[i]["checkboxValue"] = 'on';
                $scope.selected.push($scope.taskData[i].id);
            }
            ;
        };

        $scope.deSelectAll = function() {
            for ( var i in $scope.taskData) {
                $scope.taskData[i]["checkboxValue"] = 'off';
            }
            ;
            $scope.selected = [];
        };

        $scope.deleteSelected = function(ev) {
            // Appending dialog to document.body to cover sidenav in docs app
            if ($scope.selected.length > 0) {
                var confirm = $mdDialog
                        .confirm()
                        .title('Would you like to delete your Task?')
                        .textContent(
                                'All of the Tasks have agreed to forgive you your task.')
                        .ariaLabel('Lucky day').targetEvent(ev).ok(
                                'Please do it!').cancel('Sounds like a scam');

                $mdDialog.show(confirm).then(function() {
                    $scope.taskData = $scope.taskData.filter(function(obj) {
                        return $scope.selected.indexOf(obj.id) === -1;
                    });
                       $scope.taskLength = $scope.taskData.length;
                }, function() {
                    $scope.status = 'You decided to keep your Task.';
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
  


dmtApplication.directive('createTask', function($state) {
    return {
        restrict : 'E',
        replace : true,
        templateUrl : function() {
            var current = $state.current.name;
            return '../dmt/pages/app.task/app.task.record.html';
        }
    };
});
