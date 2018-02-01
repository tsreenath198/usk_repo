/*(function() {*/
'use strict';
dmtApplication
    .controller("taskController", taskController);

function taskController($scope, TaskService, $mdDialog, $mdToast, $state, $mdSidenav, $log, $rootScope) {

    var self = {
        init: init
    };

    function init() {
        $rootScope.currentController = 'Task';
        $scope.currentPage = 'Create';
        var current = $state.current.name;
        $rootScope.currentDataEnable = true;
        $scope.currentState = current.split(/[\s.]+/);
        $scope.currentRoute = $scope.currentState[$scope.currentState.length - 1];
        $scope.customFullscreen = false;
        $scope.updatePage = false;
        $scope.TaskData = [];
        $scope.collection = [];
        $scope.selected = [];
        $scope.headerEnable = {};
        $scope.exportData = [];


        $scope.cancelRecord = function () {
            $mdSidenav('right').close().then(function () {
                $log.debug("close RIGHT is done");
            });
        }
        $scope.record = {
            "category": "",
            "referenceId": "1",
            "createdDate": "",
            "description": ""
        };
        TaskService.getAllEmployees().then(function (response) {
            $scope.employees = response.data;
        });
        TaskService.getAllStatuses().then(function (response) {
            $scope.statuses = response.data;
        });
        TaskService.getAllCategories().then(function (response) {
            $scope.categories = response.data;
        });

        TaskService.getAllTimes().then(function (response) {
            $scope.times = response.data;
        });
        $scope.loading = true;
        TaskService.getAllTask().then(function (response) {
            $scope.tasksData = response.data;
            $rootScope.currentTableLength = 'Records Count :' + response.data.length;

            $scope.loading = false;
        }, function (error) {
            alert("failed");
            $scope.loading = false;
        });

        /*Header icon functionality*/
        var deregisterListener = $rootScope.$on("CallTaskMethod", function () {
            if ($rootScope.$$listeners["CallTaskMethod"].length > 1) {
                $rootScope.$$listeners["CallTaskMethod"].pop();

            }
            $scope.currentPage = "Create";
            $scope.toggleRight();
            $scope.emptyForm();
        });
        var deregisterListener = $rootScope.$on("CallTaskSearchMethod", function (event, args) {
            if ($rootScope.$$listeners["CallTaskSearchMethod"].length > 1) {
                $rootScope.$$listeners["CallTaskSearchMethod"].pop();
            }
            $scope.filterByText = args.text;
        });
        $scope.saveRecord = function () {
            TaskService.create($scope.record).then(function (response) {});
            $scope.currentPage = "Create";
            $mdSidenav('right').close().then(function () {
                $log.debug("close RIGHT is done");
            });
            window.location.reload();
        }

        $scope.updateRow = function (row) {
            $scope.currentPage = 'Update';
            $scope.rowData = row;
            $scope.updatePage = true;
            $scope.record = {

                "category": row.category,
                "referenceId": row.referenceId,
                "updatedDate": "",
                "description": row.description,
                "id": row.id
            };
        };
        $scope.updateRecord = function () {

            TaskService.update($scope.record).then(function (response) {});
            window.location.reload();
            $scope.currentPage = 'Create';
            $mdSidenav('right').close().then(function () {
                $log.debug("close RIGHT is done");
            });
        }
        $scope.emptyForm = function () {
            $scope.updatePage = false;
            $scope.record = {
                "category": "",
                "referenceId": "1",
                "createdDate": "",
                "description": ""
            };
        };

        $scope.rowSelect = function (row) {
            $scope.selected.push(row);
        };
        $scope.headerCheckbox = false;
        $scope.selectAll = function () {
            if (!$scope.headerCheckbox) {
                for (var i in $scope.tasksData) {
                    $scope.tasksData[i]["checkboxValue"] = 'on';
                    $scope.selected.push($scope.tasksData[i]);
                };
                $scope.headerCheckbox = ($scope.headerCheckbox == false) ? true : false;
            } else if ($scope.headerCheckbox) {
                for (var i in $scope.tasksData) {
                    $scope.tasksData[i]["checkboxValue"] = 'off';
                    $scope.selected = [];
                };
                $scope.headerCheckbox = ($scope.headerCheckbox == true) ? false : true;
            };
            // console.log($scope.selected);
        };


        $scope.deleteRow = function (ev, row) {

            var confirm = $mdDialog
                .confirm()
                .title('Are you sure want to Delete Record?')

                .ariaLabel('Lucky day').targetEvent(ev).ok(
                    'Ok').cancel('Cancel');

            $mdDialog.show(confirm).then(function () {
                TaskService.deleteRow(row.id).then(function (response) {});
                window.location.reload();
            }, function () {
                $scope.status = 'You decided to keep your Task.';
            });
        };


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



dmtApplication.directive('createTask', function ($state) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: function () {
            var current = $state.current.name;
            return '../dmt/pages/app.task/app.task.record.html';
        }
    };
});