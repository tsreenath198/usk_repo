/*(function() {*/
'use strict';
dmtApplication.controller("supportController", supportController);

function supportController($scope, supportService, Excel, $state, $mdDialog, $rootScope,
    $mdToast, $timeout, $mdSidenav, $log) {
    var self = {
        init: init
    };

    function init() {
        // console.log($state.current.name);
        $rootScope.currentController = 'Support';
        $scope.currentPage = 'Create';
        $rootScope.currentDataEnable = true;
        var current = $state.current.name;
        $scope.currentState = current.split(/[\s.]+/);
        $scope.currentRoute = $scope.currentState[$scope.currentState.length - 1];
        $scope.customFullscreen = false;
        $scope.updatePage = false;
        $scope.supportsData = [];
        $scope.collection = [];
        $scope.selected = [];
        $scope.headerEnable = {};
        $scope.exportData = [];

        $scope.headers = [{
                "key": "endClient",
                "value": "End Client"
            },
            {
                "key": "technologyUsed",
                "value": "Technology Used"
            },
            {
                "key": "allottedTime",
                "value": "Allotted Time"
            }
        ];

        $scope.headerEnable = {
            "endClient": false
        }, {
            "technologyUsed": false
        }, {
            "allottedTime": false
        };

        $scope.record = {
            "traineeId": "",
            "trainerId": "",
            "startDate": "",
            "endDate": "",
            "allottedTime": "",
            "endClient": "",
            "status": "1 - Not Started",
            "paidStatus": "2 - Not Paid",
            "receivedStatus": "2 - Not Received",
            "technologyUsed": "",
            "createdDate": "",
            "description": "",
            "paidBy": "",
            "invoice": ""
        };
        supportService.getAllStatus().then(function (response) {
            $scope.statuses = response.data;
        });
        supportService.getAllEmployees().then(function (response) {
            $scope.employees = response.data;
        });

        supportService.getAllTrainees().then(function (response) {
            $scope.trainees = response.data;
        });
        supportService.getAllTrainers().then(function (response) {
            $scope.trainers = response.data;
        });
        supportService.getAlltimeConstants().then(function (response) {
            $scope.timeConstants = response.data;
        });
        supportService.getAllpaidByConstants().then(function (response) {
            $scope.paidByConstants = response.data;
        });
        supportService.getAllreceivedConstants().then(function (response) {
            $scope.receivedConstants = response.data;
        });
        supportService.getAllpaidConstants().then(function (response) {
            $scope.paidConstants = response.data;
        });
        $scope.loading = true;
        supportService.getAllSupports().then(function (response) {

            $scope.supportsData = response.data;
            //console.log($scope.supportsData);
            $scope.supportsLength = response.data.length;
            $rootScope.currentTableLength = 'Records Count :' + response.data.length;
            $scope.supportsOptions = [200, 300];
            $scope.supportPage = {
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
        var deregisterListener = $rootScope.$on("CallSupportMethod", function () {
            if ($rootScope.$$listeners["CallSupportMethod"].length > 1) {
                $rootScope.$$listeners["CallSupportMethod"].pop();
            }
            $scope.currentPage = "Create";
            $scope.toggleRight();
            $scope.emptyForm();
        });

        var deregisterListener = $rootScope.$on("CallSupportSearchMethod", function (event, args) {
            if ($rootScope.$$listeners["CallSupportSearchMethod"].length > 1) {
                $rootScope.$$listeners["CallSupportSearchMethod"].pop();
            }
            $scope.filterByText = args.text;
        });
        $scope.saveRecord = function () {
            supportService.create($scope.record).then(function (response) {

            });
            window.location.reload();
            $scope.cancelRecord();
        }
    }
    init();


    $scope.setDate = function (date) {
        $scope.minDate = date;
        $scope.minStartedDate = new Date($scope.minDate.getFullYear(),
            $scope.minDate.getMonth(), $scope.minDate.getDate());
        $scope.minEndDate = $scope.minStartedDate;
    };

    $scope.rowData = function (row) {
        $scope.currentPage = 'Update';
        $scope.updatePage = true;
        $scope.record = {
            "traineeId": row.traineeId,
            "trainerId": row.trainerId,
            "startDate": new Date(row.startDate),
            "endDate": new Date(row.endDate),
            "allottedTime": row.allottedTime,
            "endClient": row.endClient,
            "status": row.status,
            "paidStatus": row.paidStatus,
            "receivedStatus": row.receivedStatus,
            "technologyUsed": row.technologyUsed,
            "updatedDate": "",
            "description": row.description,
            "paidBy": row.paidBy,
            "invoice": row.invoice,
            "id": row.id
        };
    };

    $scope.updateRecord = function () {
        supportService.update($scope.record).then(function (response) {});
        window.location.reload();
        $scope.cancelRecord();
        $scope.currentPage = 'Create';
    };
    $scope.cancelRecord = function () {
        $mdSidenav('right').close().then(function () {
            $log.debug("close RIGHT is done");
        });
    }
    $scope.emptyForm = function () {
        $scope.updatePage = false;
        $scope.record = {
            "traineeId": "",
            "trainerId": "",
            "startDate": "",
            "endDate": "",
            "allottedTime": "",
            "endClient": "",
            "status": "1 - Not Started",
            "paidStatus": "2 - Not Paid",
            "receivedStatus": "2 - Not Received",
            "technologyUsed": "",
            "description": "",
            "paidBy": "",
            "invoice": ""
        };
    };

    $scope.rowSelect = function (row) {
        $scope.selected.push(row);
    };
    $scope.headerCheckbox = false;
    $scope.selectAll = function () {
        if (!$scope.headerCheckbox) {
            for (var i in $scope.supportsData) {
                $scope.supportsData[i]["checkboxValue"] = 'on';
                $scope.selected.push($scope.supportsData[i]);
            };
            $scope.headerCheckbox = ($scope.headerCheckbox == false) ? true : false;
        } else if ($scope.headerCheckbox) {
            for (var i in $scope.supportsData) {
                $scope.supportsData[i]["checkboxValue"] = 'off';
                $scope.selected = [];
            };
            $scope.headerCheckbox = ($scope.headerCheckbox == true) ? false : true;
        };
        //  console.log($scope.selected);
    };

    $scope.deleteRow = function (ev, data) {
        // Appending dialog to document.body to cover sidenav in docs app

        var confirm = $mdDialog
            .confirm()
            .title('Are you sure want to Delete Record?')

            .ariaLabel('Lucky day').targetEvent(ev).ok(
                'Ok').cancel('Cancel');

        $mdDialog
            .show(confirm)
            .then(
                function () {
                    supportService.deleteRow(data.id).then(function (response) {});
                    window.location.reload();
                },
                function () {
                    $scope.status = 'You decided to keep your Task.';
                });

    };




    $scope.exportTable = function (tableId) {
        var exportHref = Excel.tableToExcel(tableId, 'sheet name');
        $timeout(function () {
            location.href = exportHref;
        }, 100);
    }

    /* Min Dates starts */
    $scope.minStartDate = new Date();

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
            $mdSidenav(navID).toggle().then(function () {
                $log.debug("toggle " + navID + " is done");
            });
        }, 200);
    }

    function buildToggler(navID) {
        return function () {
            $mdSidenav(navID).toggle().then(function () {
                $log.debug("toggle " + navID + " is done");
            });
        }
    }
    init();
    var originatorEv;
    $scope.openMenu = function ($mdOpenMenu, ev) {
        originatorEv = ev;
        $mdOpenMenu(ev);
    };
    $scope.menuItemClick = function (index, key) {


        if (key == 'endClient') {
            $scope.endClient = true;
            $scope.technologyUsed = false;
            $scope.allottedTime = false;
        } else if (key == 'technologyUsed') {
            $scope.endClient = false;
            $scope.technologyUsed = true;
            $scope.allottedTime = false;

        } else if (key == 'allottedTime') {
            $scope.endClient = false;
            $scope.technologyUsed = false;
            $scope.allottedTime = true;
        }



    };
    /* Side nav ends */

    return self;
};

/*dmtApplication.directive('support', function($state) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: function() {
            var current = $state.current.name;
            return '../dmt/pages/' + current + '/' + current + '.record.html';
        }
    };
});*/