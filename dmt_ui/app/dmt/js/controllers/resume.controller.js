/*(function() {*/
'use strict';
dmtApplication.controller("resumeController", resumeController);

function resumeController($scope, resumeService, $rootScope, Excel, $state, $mdDialog,
    $mdToast, $timeout, $mdSidenav, $log) {
    var self = {
        init: init
    };

    function init() {
        // console.log($state.current.name);
        $rootScope.currentController = 'Resume';
        var current = $state.current.name;
        $scope.currentState = current.split(/[\s.]+/);
        $scope.currentRoute = $scope.currentState[$scope.currentState.length - 1];
        $scope.customFullscreen = false;
        $scope.currentPage = "Create";
        $scope.updatePage = false;
        $scope.resumesData = [];
        $scope.selected = [];
        $scope.record = {
            "traineeId": "",
            "preparedBy": "",
            "date": "2017-09-09",
            "paidStatus": "",
            "receivedStatus": "",
            "details": "",
            "count": "",
            "rate": "",
            "description": ""
        };
        resumeService.getAllEmployees().then(function (response) {
            $scope.employees = response.data;
        });
        resumeService.getAllTrainees().then(function (response) {
            $scope.trainees = response.data;
        });
        resumeService.getAllPaidStatus().then(function (response) {
            $scope.paidStatuses = response.data;
        });
        resumeService.getAllReceivedStatus().then(function (response) {
            $scope.receivedStatuses = response.data;
        });
        $scope.loading = true;
        resumeService.getAllResumes().then(function (response) {
            $scope.resumesData = response.data;
            $scope.resumesLength = response.data.length;
            //console.log(angular.toJson($scope.resumesData));
            $rootScope.currentTableLength = 'Records Count :' + response.data.length;
            $scope.resumesOptions = [200, 300];
            $scope.resumePage = {
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
        var deregisterListener = $rootScope.$on("CallResumeMethod", function () {
            if ($rootScope.$$listeners["CallResumeMethod"].length > 1) {
                $rootScope.$$listeners["CallResumeMethod"].pop();
            }
            $scope.currentPage = "Create";
            $scope.toggleRight();
            $scope.emptyForm();
            // $scope.destroyListener();
        });
        var deregisterListener = $rootScope.$on("CallResumeSearchMethod", function (event, args) {
            if ($rootScope.$$listeners["CallResumeSearchMethod"].length > 1) {
                $rootScope.$$listeners["CallResumeSearchMethod"].pop();
            }
            $scope.filterByText = args.text;
        });
    }
    init();

    $scope.saveRecord = function () {
        $scope.record.date = "2017-09-09";
        resumeService.create($scope.record).then(function (response) {

        });
        $scope.cancelRecord();
        $scope.currentPage = "Create";
        window.location.reload();
    }

    $scope.setRowData = function (row) {
        $scope.rowData = row;
        $scope.updatePage = true;
        $scope.currentPage = "Update";
        $scope.record = {
            "traineeId": row.traineeId,
            "preparedBy": row.preparedBy,
            "date": row.date,
            "paidStatus": row.paidStatus,
            "receivedStatus": row.receivedStatus,
            "details": row.details,
            "count": row.count,
            "rate": row.rate,
            "updatedDate": "",
            "description": row.description,
            "id": row.id
        };
        // console.log($scope.create.status);
    };
    $scope.updateRecord = function () {
        resumeService.update($scope.record).then(function (response) {});
        $scope.cancelRecord();
        $scope.currentPage = "Create";
        window.location.reload();
    }
    $scope.emptyForm = function () {
        $scope.updatePage = false;
        $scope.record = {
            "traineeId": "",
            "preparedBy": "",
            "date": "",
            "paidStatus": "",
            "receivedStatus": "",
            "details": "",
            "count": "",
            "rate": "",
            "description": ""
        };
    };
    $scope.cancelRecord = function () {
        $mdSidenav('right').close().then(function () {
            $log.debug("close RIGHT is done");
        });
    };

    $scope.rowSelect = function (row) {
        $scope.selected.push(row);
    };
    $scope.headerCheckbox = false;
    $scope.selectAll = function () {
        if (!$scope.headerCheckbox) {
            for (var i in $scope.resumesData) {
                $scope.resumesData[i]["checkboxValue"] = 'on';
                $scope.selected.push($scope.resumesData[i]);
            };
            $scope.headerCheckbox = ($scope.headerCheckbox == false) ? true : false;
        } else if ($scope.headerCheckbox) {
            for (var i in $scope.resumesData) {
                $scope.resumesData[i]["checkboxValue"] = 'off';
                $scope.selected = [];
            };
            $scope.headerCheckbox = ($scope.headerCheckbox == true) ? false : true;
        };
        //console.log($scope.selected);
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
                    resumeService.deleteRow(row.id).then(function (response) {

                    });
                    window.location.reload();
                },
                function () {
                    $scope.status = 'You decided to keep your Task.';
                });


    };

    $scope.exportData = function (tableId) {
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
    return self;
};

dmtApplication.directive('createResume', function ($state) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: function () {
            var current = $state.current.name;
            return '../dmt/pages/' + current + '/' + current + '.record.html';
        }
    };
});