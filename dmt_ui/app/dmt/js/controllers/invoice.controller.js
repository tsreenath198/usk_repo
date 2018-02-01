/*(function() {*/
'use strict';
dmtApplication.controller("invoiceController", invoiceController);

function invoiceController($scope, invoiceService, $mdDialog, $rootScope, $mdToast,
    $timeout, $state, $mdSidenav, $log) {

    var self = {
        init: init
    };

    function init() {
        $rootScope.currentController = 'Invoice';
        var current = $state.current.name;
        $rootScope.currentDataEnable = true;
        $scope.currentState = current.split(/[\s.]+/);
        $scope.currentRoute = $scope.currentState[$scope.currentState.length - 1];
        $scope.currentPage = "Create";
        $scope.customFullscreen = false;
        $scope.updatePage = false;
        $scope.invoicesData = [];
        $scope.collection = [];
        $scope.selected = [];
        $scope.headerEnable = {};
        $scope.exportData = [];
        $scope.headers = ["InvoiceType"];
        $scope.headerEnable = {
            "Invoice Type": false
        };

        $scope.record = {
            "invoiceDate": "",
            "invoiceType": "",
            "actualAmount": "",
            "receivedAmount": "",
            "receivedDate": "",
            "description": ""
        };

        invoiceService.getAllInvoiceType().then(function (response) {
            $scope.invoiceTypes = response.data;
        });

        invoiceService.getAllInVoices().then(function (response) {
            $scope.invoicesData = response.data;
            $scope.invoicesLength = response.data.length;
            $rootScope.currentTableLength = 'Records Count :' + response.data.length;
            //console.log($scope.invoicesData);
            $scope.invoicesOptions = [200, 300];
            $scope.invoicePage = {
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
        var deregisterListener = $rootScope.$on("CallInvoiceSearchMethod", function (event, args) {
            if ($rootScope.$$listeners["CallInvoiceSearchMethod"].length > 1) {
                $rootScope.$$listeners["CallInvoiceSearchMethod"].pop();
            }
            $scope.filterByText = args.text;
        });

        $scope.saveRecord = function () {
            var jsonData = $scope.create;
            var date = new Date();
            invoiceService.create($scope.record).then(function (response) {
                //    console.log(response);
            });
            $scope.currentPage = "Create";
            $scope.cancelRecord();
            window.location.reload();

        }

        $scope.setRowData = function (row) {
            //  console.log(row);
            $scope.rowData = row;
            $scope.currentPage = "Update";
            $scope.updatePage = true;
            $scope.record = {
                "invoiceDate": new Date(row.invoiceDate),
                "invoiceType": row.invoiceType,
                "actualAmount": row.actualAmount,
                "receivedAmount": row.receivedAmount,
                "receivedDate": new Date(row.receivedDate),
                "description": row.description,
                "id": row.id
            };
            // console.log($scope.create.status);
        };
        $scope.updateData = function () {
            invoiceService.update($scope.record).then(function (response) {
                //   console.log(response);
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
        $scope.emptyForm = function () {
            $scope.record = {
                "invoiceDate": "",
                "invoiceType": "",
                "actualAmount": "",
                "receivedAmount": "",
                "receivedDate": "",
                "description": ""
            };
        };
        var deregisterListener = $rootScope.$on("CallInvoiceMethod", function () {
            if ($rootScope.$$listeners["CallInvoiceMethod"].length > 1) {
                $rootScope.$$listeners["CallInvoiceMethod"].pop();

            }
            $scope.currentPage = "Create";
            $scope.toggleRight();
            $scope.emptyForm();
        });

        $scope.headerCheckbox = false;
        $scope.selectAll = function () {
            if (!$scope.headerCheckbox) {
                for (var i in $scope.invoicesData) {
                    $scope.invoicesData[i]["checkboxValue"] = 'on';
                    $scope.selected.push($scope.invoicesData[i]);
                };
                $scope.headerCheckbox = ($scope.headerCheckbox == false) ? true :
                    false;
            } else if ($scope.headerCheckbox) {
                for (var i in $scope.invoicesData) {
                    $scope.invoicesData[i]["checkboxValue"] = 'off';
                    $scope.selected = [];
                };
                $scope.headerCheckbox = ($scope.headerCheckbox == true) ? false :
                    true;
            };
            //   console.log($scope.selected);
        };

        $scope.deleteRow = function (ev, row) {

            var confirm = $mdDialog.confirm().title(
                    'Are you sure want to Delete Record?')

                .ariaLabel('Lucky day').targetEvent(ev).ok('Ok').cancel('Cancel');

            $mdDialog.show(confirm).then(function () {
                invoiceService.deleteRow(row.id).then(function (response) {

                });
                window.location.reload();
            }, function () {
                $scope.status = 'You decided to keep your Task.';
            });

        };

        $scope.moreColumns = function (ev) {
            $mdDialog.show({
                controller: supportController,
                templateUrl: 'pages/app.invoice/app.invoice.moreHeaders.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: $scope.customFullscreen
            }).then(
                function (answer) {
                    $scope.status = 'You said the information was "' +
                        answer + '".';
                },
                function () {
                    $scope.status = 'You cancelled the dialog.';
                });
        };

        $scope.openMoreOptions = function (header) {
            if (header.length > 0) {
                for (var i in header) {
                    if (header[i] == 'Batch') {
                        $scope.headerEnable.batchId = true;
                    } else if (header[i] == 'Status') {
                        $scope.headerEnable.invoiceFeeStatus = true;
                    } else if (header[i] == 'Client') {
                        $scope.headerEnable.clientId = true;
                    } else if (header[i] == 'Skype Id') {
                        $scope.headerEnable.skypeId = true;
                    } else if (header[i] == 'Time Zone') {
                        $scope.headerEnable.timezone = true;
                    } else if (header[i] == 'Alternate Phone') {
                        $scope.headerEnable.alternatePhone = true;
                    }

                }
            } else {
                $scope.headerEnable = {
                    "Batch": false
                }, {
                    "Status": false
                }, {
                    "Client": false
                }, {
                    "Skype Id": false
                }, {
                    "Altenate Phone": false
                }, {
                    "Time Zone": false
                };
            }
        }

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

dmtApplication.directive('createInvoice', function ($state) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: function () {
            var current = $state.current.name;
            return '../dmt/pages/' + current + '/' + current +
                '.record.html';
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