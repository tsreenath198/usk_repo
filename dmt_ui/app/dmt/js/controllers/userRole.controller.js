/*(function() {*/
'use strict';
dmtApplication
    .controller("userRoleController", userRoleController);

function userRoleController($scope, userRoleService, $mdDialog, $mdToast, $state, $rootScope, $mdSidenav, $log) {
    var self = {
        init: init
    };

    function init() {
        $rootScope.currentController = 'User Roles';
        var current = $state.current.name;
        $rootScope.currentDataEnable = true;
        $scope.currentState = current.split(/[\s.]+/);
        $scope.currentRoute = $scope.currentState[$scope.currentState.length - 1];
        $scope.customFullscreen = false;
        $scope.currentPage = "Create";
        $scope.updatePage = false;
        $scope.userRolesData = [];
        $scope.collection = [];
        $scope.selected = [];
        $scope.headerEnable = {};
        $scope.exportData = [];

        $scope.record = {
            "name": "",
            "createdDate": "",
            "description": ""
        };
        $scope.loading = true;
        userRoleService.getAllUserRoles().then(function (response) {
            $scope.userRolesData = response.data;
            $scope.userRolesLength = response.data.length;
            $rootScope.currentTableLength = 'Records Count :' + response.data.length;
            //  console.log($scope.userRolesData);
            $scope.userRolesOptions = [200, 300];
            $scope.userRolePage = {
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


        $scope.saveRecord = function () {
            userRoleService.create($scope.record).then(function (response) {});
            $scope.cancelRecord();
            $scope.currentPage = "Create";
            window.location.reload();
        }

        $scope.setRowData = function (row) {
            $scope.currentPage = "Update";
            $scope.rowData = row;
            $scope.updatePage = true;
            $scope.record = {
                "name": row.name,
                "updatedDate": "",
                "description": row.description,
                "id": row.id
            };
            // console.log($scope.create.status);
        };
        $scope.updateData = function () {
            userRoleService.update($scope.record).then(function (response) {
                console.log("resp", response);
            });

            $scope.cancelRecord();
            $scope.currentPage = "Create";
            window.location.reload();
        }

        $scope.cancelRecord = function () {
            $mdSidenav('right').close().then(function () {
                $log.debug("close RIGHT is done");
            });

        };

        $scope.rowSelect = function (row) {
            $scope.selected.push(row.id);
        };

        $scope.emptyForm = function () {
            $scope.record = {
                "name": "",
                "createdDate": "",
                "description": ""
            };
        };
        var deregisterListener = $rootScope.$on("CallUserRoleMethod", function () {
            if ($rootScope.$$listeners["CallUserRoleMethod"].length > 1) {
                $rootScope.$$listeners["CallUserRoleMethod"].pop();

            }
            $scope.currentPage = "Create";
            $scope.toggleRight();
            $scope.emptyForm();
        });

        var deregisterListener = $rootScope.$on("CalluserRolesSearchMethod", function (event, args) {
            if ($rootScope.$$listeners["CalluserRolesSearchMethod"].length > 1) {
                $rootScope.$$listeners["CalluserRolesSearchMethod"].pop();
            }
            $scope.filter = args.text;
        });
        $scope.headerCheckbox = false;
        $scope.selectAll = function () {
            if (!$scope.headerCheckbox) {
                for (var i in $scope.userRolesData) {
                    $scope.userRolesData[i]["checkboxValue"] = 'on';
                    $scope.selected.push($scope.userRolesData[i]);
                };
                $scope.headerCheckbox = ($scope.headerCheckbox == false) ? true : false;
            } else if ($scope.headerCheckbox) {
                for (var i in $scope.userRolesData) {
                    $scope.userRolesData[i]["checkboxValue"] = 'off';
                    $scope.selected = [];
                };
                $scope.headerCheckbox = ($scope.headerCheckbox == true) ? false : true;
            };
            //    console.log($scope.selected);
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
                        userRoleService.deleteRow(row.id).then(function (response) {

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



dmtApplication.directive('createUserRole', function ($state) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: function () {
            var current = $state.current.name;
            return '../dmt/pages/' + current + '/' + current + '.record.html';
        }
    };
});
dmtApplication.filter('capitalize', function () {
    return function (input) {
        return (!!input) ? input.charAt(0).toUpperCase() +
            input.substr(1).toLowerCase() : '';
    }
});

dmtApplication
    .factory(
        'Excel',
        function ($window) {
            var uri = 'data:application/vnd.ms-excel;base64,',
                template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
                base64 = function (
                    s) {
                    return $window.btoa(unescape(encodeURIComponent(s)));
                },
                format = function (s, c) {
                    return s.replace(/{(\w+)}/g, function (m, p) {
                        return c[p];
                    })
                };
            return {
                tableToExcel: function (tableId, worksheetName) {
                    var table = $(tableId),
                        ctx = {
                            worksheet: worksheetName,
                            table: table.html()
                        },
                        href = uri + base64(format(template, ctx));
                    return href;
                }
            };
        });