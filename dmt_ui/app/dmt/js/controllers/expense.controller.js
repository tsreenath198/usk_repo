/*(function() {*/
'use strict';
dmtApplication.controller("expenseController", expenseController);

function expenseController($scope, expenseService, $rootScope, Excel, $state, $mdDialog,
    $mdToast, $timeout, $mdSidenav, $log) {
    var self = {
        init: init
    };

    function init() {
        // console.log($state.current.name);
        $rootScope.currentController = 'Expense';
        var current = $state.current.name;
        $scope.currentState = current.split(/[\s.]+/);
        $scope.currentRoute = $scope.currentState[$scope.currentState.length - 1];
        $scope.customFullscreen = false;
        $scope.currentPage = "Create";
        $scope.updatePage = false;
        $scope.expenseData = [];
        $scope.selected = [];

        $scope.record = {
            "date": new Date(),
            "purposeOfExpense": "",
            "amount": "",
            "typeOfExpense": "",
            "description": ""
        };

        $scope.loading = true;
        expenseService.getAllexpenses().then(function(response) {
            $scope.expenseData = response.data;
            $scope.expenseLength = response.data.length;
            console.log($scope.expenseData);
            $rootScope.currentTableLength = 'Records Count :' + response.data.length;
            $scope.expenseOptions = [200, 300];
            $scope.expensePage = {
                pageSelect: true
            };
            $scope.query = {
                order: 'name',
                limit: 100,
                page: 1
            };
            $scope.loading = false;
        }, function(error) {
            alert("failed");
            $scope.loading = false;
        });
        var deregisterListener = $rootScope.$on("CallExpenseMethod", function() {
            if ($rootScope.$$listeners["CallExpenseMethod"].length > 1) {
                $rootScope.$$listeners["CallExpenseMethod"].pop();
            }
            $scope.currentPage = "Create";

            $scope.creditModel = false;
            $scope.debitModel = false;
            $scope.toggleRight();
            $scope.emptyForm();
            // $scope.destroyListener();
        });
        var deregisterListener = $rootScope.$on("CallExpenseSearchMethod", function(event, args) {
            if ($rootScope.$$listeners["CallExpenseSearchMethod"].length > 1) {
                $rootScope.$$listeners["CallExpenseSearchMethod"].pop();
            }
            $scope.filterByText = args.text;
        });
    }
    init();

    $scope.saveRecord = function() {
        if ($scope.debitModel) {
            $scope.record.typeOfExpense = false;
        } else {
            $scope.record.typeOfExpense = true;
        }
        expenseService.create($scope.record).then(function(response) {

        });
        $scope.currentPage = "Create";
        $scope.cancelRecord();
        window.location.reload();
    }

    $scope.setRowData = function(row) {

        $scope.creditModel = false;
        $scope.debitModel = false;
        //TODO: TOE == typeOfExpense
        // Enable/Disable checkbox based on TOE
        if (row.typeOfExpense) {
            $scope.creditModel = true;
        } else {
            $scope.debitModel = true;
        }
        //TODO:Need to fix once functinality done in BE
        //Set based on the credit/debit to amount.
        if (row.credit == 0) {
            $scope.record.amount = row.debit;
        } else {
            $scope.record.amount = row.credit;
        }
        $scope.rowData = row;
        $scope.updatePage = true;
        $scope.currentPage = "Create";

        //Making individual because of conitinally amount value.
        $scope.record.date = new Date(row.date);
        $scope.record.purposeOfExpense = row.purposeOfExpense;
        //$scope.record.typeOfExpense = "";
        $scope.record.description = row.description;
        $scope.record.id = row.id

        // console.log($scope.create.status);
    };
    $scope.updateRecord = function() {
        if ($scope.debitModel) {
            $scope.record.typeOfExpense = false;
        } else {
            $scope.record.typeOfExpense = true;
        }
        expenseService.update($scope.record).then(function(response) {

        });
        $scope.cancelRecord();
        $scope.currentPage = "Create";
        window.location.reload();
    }
    $scope.emptyForm = function() {
        $scope.updatePage = false;
        $scope.record = {
            "date": new Date(),
            "purposeOfExpense": "",
            "amount": "",
            "typeOfExpense": "",
            "description": ""
        };
    };
    $scope.cancelRecord = function() {
        $mdSidenav('right').close().then(function() {
            $log.debug("close RIGHT is done");
        });
    };

    $scope.rowSelect = function(row) {
        $scope.selected.push(row);
    };
    $scope.headerCheckbox = false;
    $scope.selectAll = function() {
        if (!$scope.headerCheckbox) {
            for (var i in $scope.expenseData) {
                $scope.expenseData[i]["checkboxValue"] = 'on';
                $scope.selected.push($scope.expenseData[i]);
            };
            $scope.headerCheckbox = ($scope.headerCheckbox == false) ? true : false;
        } else if ($scope.headerCheckbox) {
            for (var i in $scope.expenseData) {
                $scope.expenseData[i]["checkboxValue"] = 'off';
                $scope.selected = [];
            };
            $scope.headerCheckbox = ($scope.headerCheckbox == true) ? false : true;
        };
        //console.log($scope.selected);
    };



    $scope.deleteRow = function(ev, row) {

        var confirm = $mdDialog
            .confirm()
            .title('Are you sure want to Delete Record?')

            .ariaLabel('Lucky day').targetEvent(ev).ok(
                'Ok').cancel('Cancel');

        $mdDialog
            .show(confirm)
            .then(
                function() {
                    expenseService.deleteRow(row.id).then(function(response) {});
                    window.location.reload();
                },
                function() {
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
        showTooltip: false,
        tipDirection: ''
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
            var context = $scope,
                args = Array.prototype.slice
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

dmtApplication.directive('createExpense', function($state) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: function() {
            var current = $state.current.name;
            return '../dmt/pages/' + current + '/' + current + '.record.html';
        }
    };
});