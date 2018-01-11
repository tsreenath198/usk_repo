/*(function() {*/
'use strict';
dmtApplication.controller("batchController", batchController);
dmtApplication.controller("DialogController", DialogController);
dmtApplication.controller("AttendanceController", AttendanceController);


function batchController($scope, batchService, $mdDialog, $rootScope, $mdToast, $timeout,
    $state, $mdSidenav, $log) {

    var self = {
        init: init
    };

    function init() {
        $rootScope.currentController = 'Batch';
        var current = $state.current.name;
        $rootScope.currentDataEnable = true;
        $scope.currentState = current.split(/[\s.]+/);
        $scope.currentRoute = $scope.currentState[$scope.currentState.length - 1];
        $scope.customFullscreen = false;
        $scope.updatePage = false;
        $scope.batchesData = [];
        $scope.collection = [];
        $scope.selected = [];
        $scope.headerEnable = {};
        $scope.exportData = [];
        $scope.headers = [{ "key": "technology", "value": "Technology" }, { "key": "status", "value": "Status" }, { "key": "time", "value": "Time" }];

        $scope.headerEnable = {
            "technology": false
        }, {
                "status": false
            }, {
                "time": false
            };

        $scope.getDate = function (start, end) {
            if (start != null && end == null) {
                var date2 = new Date(start);
                var date1 = new Date();
                var timeDiff = Math.abs(date2.getTime() - date1.getTime());
                $scope.record.duration = Math.ceil(timeDiff /
                    (1000 * 3600 * 24));
            } else if (start != null && end != null) {
                var date2 = new Date(start);
                var date1 = new Date(end);
                var timeDiff = Math.abs(date2.getTime() - date1.getTime());
                $scope.record.duration = Math.ceil(timeDiff /
                    (1000 * 3600 * 24));
            }

        }

        $scope.record = {
            "technologyId": "",
            "trainerId": "",
            "startDate": "",
            "endDate": "",
            "duration": "",
            "status": "",
            "paidStatus": "",
            "receivedStatus": "",
            "createdDate": "",
            "description": "",
            "batchTime": "",
            "invoice": ""
        }

        $scope.loading = true;
        batchService.getAllTimeConstants().then(function (response) {
            $scope.batchtime = response.data;
        });
        batchService.getAllTrainers().then(function (response) {
            $scope.trainers = response.data;
        });

        batchService.getAllPaidStatus().then(function (response) {
            $scope.paidstatuses = response.data;
        });

        batchService.getAllReceivedStatus().then(function (response) {
            $scope.receivedstatuses = response.data;
        });

        batchService.getAllStatus().then(function (response) {
            $scope.statuses = response.data;
        });
        batchService.getAllTechnologies().then(function (response) {
            $scope.technologies = response.data;
        });

        batchService.getAllBatches().then(
            function (response) {
                $scope.batchesData = response.data;
                for (var i in $scope.batchesData) {
                    var start = $scope.batchesData[i].startDate;
                    var end = $scope.batchesData[i].endDate;
                    if (start != null && end == null) {
                        var date2 = new Date(start);
                        var date1 = new Date();
                        var timeDiff = Math.abs(date2.getTime() -
                            date1.getTime());
                        $scope.batchesData[i]['newDuration'] = Math.ceil(timeDiff /
                            (1000 * 3600 * 24));
                    } else if (start != null && end != null) {
                        var date2 = new Date(start);
                        var date1 = new Date(end);
                        var timeDiff = Math.abs(date2.getTime() -
                            date1.getTime());
                        $scope.batchesData[i]['newDuration'] = Math.ceil(timeDiff /
                            (1000 * 3600 * 24));
                    }

                }

                $scope.batchesLength = response.data.length;
                $rootScope.currentTableLength = 'Records Count :' + response.data.length;
                //console.log($scope.batchesData);
                $scope.batchesOptions = [200, 300];
                $scope.batchPage = {
                    pageSelect: true
                };
                $scope.query = {
                    order: 'name',
                    limit: 100,
                    page: 1
                };
                $scope.loading = false;
            },
            function (error) {
                alert("failed");
                $scope.loading = false;
            });

        $scope.setDate = function (date) {
            $scope.minDate = date;
            $scope.minStartedDate = new Date($scope.minDate.getFullYear(),
                $scope.minDate.getMonth(), $scope.minDate.getDate());
            $scope.minEndDate = $scope.minStartedDate;
        };
        var deregisterListener = $rootScope.$on("CallBatchMethod", function () {
            if ($rootScope.$$listeners["CallBatchMethod"].length > 1) {
                $rootScope.$$listeners["CallBatchMethod"].pop();
            }
            $scope.toggleRight();
            $scope.emptyForm();
        });
        var deregisterListener = $rootScope.$on("CallBatchSearchMethod", function (event, args) {
            if ($rootScope.$$listeners["CallBatchSearchMethod"].length > 1) {
                $rootScope.$$listeners["CallBatchSearchMethod"].pop();
            }
            $scope.filter = args.text;
        });
        $scope.saveRecord = function () {
            batchService.create($scope.record).then(function (response) {
                //console.log(response);
            });
            $scope.cancelRecord();
            window.location.reload();
        }
        $scope.setRowData = function (row) {
            $scope.rowData = row;
            $scope.updatePage = true;
            $scope.record = {
                "technologyId": row.technologyId,
                "trainerId": row.trainerId,
                "startDate": new Date(row.startDate),
                "endDate": new Date(row.endDate),
                "duration": row.duration,
                "status": row.status,
                "paidStatus": row.paidStatus,
                "receivedStatus": row.receivedStatus,
                "updatedDate": "",
                "description": row.description,
                "batchTime": row.batchTime,
                "invoice": row.invoice,
                "id": row.id
            };

        };
        $scope.updateData = function () {
            batchService.update($scope.record).then(function (response) { });
            $scope.cancelRecord();
            window.location.reload();
            $scope.currentPage = 'Create';
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
        /* $scope.emptyForm = function() {
             $scope.updatePage = false;
         };*/
        $scope.cancelRecord = function () {
            $mdSidenav('right').close().then(function () {
                $log.debug("close RIGHT is done");
            });
        };
        $scope.rowSelect = function (row) {
            $scope.selected.push(row.id);
        };
        $scope.headerCheckbox = false;
        $scope.selectAll = function () {
            if (!$scope.headerCheckbox) {
                for (var i in $scope.batchesData) {
                    $scope.batchesData[i]["checkboxValue"] = 'on';
                    $scope.selected.push($scope.batchesData[i]);
                };
                $scope.headerCheckbox = ($scope.headerCheckbox == false) ? true : false;
            } else if ($scope.headerCheckbox) {
                for (var i in $scope.batchesData) {
                    $scope.batchesData[i]["checkboxValue"] = 'off';
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
                    batchService.deleteRow(row.id).then(function (response) {
                    });
                    window.location.reload();
                },
                function () {
                    $scope.status = 'You decided to keep your Task.';
                });
        };
        $scope.cancel = function () {
            $mdDialog.cancel();
        };
        $scope.getBatch = function (id, ev) {
            $rootScope.traId = id;
            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'pages/app.batch/batch.trainee.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
            })
                .then(function (answer) {
                    $scope.status = 'You said the information was "' + answer + '".';
                }, function () {
                    $scope.status = 'You cancelled the dialog.';
                });
        }
        $scope.export = function (tableId) {
            var exportHref = Excel.tableToExcel(tableId, 'sheet name');
            $timeout(function () {
                location.href = exportHref;
            }, 100); // trigger download
        }
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
    var originatorEv;
    this.openMenu = function ($mdOpenMenu, ev) {
        originatorEv = ev;
        $mdOpenMenu(ev);
    };
    $scope.menuItemClick = function (index, key) {
        if (key == 'technology') {
            $scope.technology = true;
            $scope.status = false;
            $scope.time = false;
        } else if (key == 'status') {
            $scope.status = true;
            $scope.technology = false;
            $scope.time = false;

        } else if (key == 'time') {
            $scope.time = true;
            $scope.status = false;
            $scope.technology = false;
        }
    };
    return self;
};
function DialogController($scope, batchService, $mdDialog, $rootScope, $mdToast, $timeout,
    $state, $mdSidenav, $log) {
    $scope.traineeId = $rootScope.traId;
    batchService.getAllTraineesBasedOnBatchId($rootScope.traId).then(function (response) {
        $scope.traineesData = response.data;
        $rootScope.traineesData = $scope.traineesData;
    });
    $scope.cancel = function () {
        $mdDialog.cancel();
    };
    $scope.getBatchAttendance = function (idd, evv) {
        $rootScope.traId = idd;
        $mdDialog.show({
            controller: AttendanceController,
            templateUrl: 'pages/app.batch/batch.attendance.html',
            parent: angular.element(document.body),
            targetEvent: evv,
            clickOutsideToClose: true,
            fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        })
            .then(function (answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function () {
                $scope.status = 'You cancelled the dialog.';
            });
    }
}
function AttendanceController($scope, batchService, $mdDialog, $rootScope, $mdToast, $timeout,
    $state, $mdSidenav, $log) {
    $scope.traineesData = $rootScope.traineesData;
    var log=[];
    for(var i=0;i<$scope.traineesData.length;i++){
        log.push({name:$scope.traineesData[i].name,isPresent:false,batchId:$scope.traineesData[i].batchId});
    }
    $scope.attendance = log;
   // angular.forEach($scope.traineesData, function(item,id) {
       // log.push({name:item.name,isPresent:false});
    //});
    $scope.saveAttendance= function(date){
        $scope.attendance["date"]=date;
        $scope.attd= $scope.attendance;
        $scope.att = angular.toJson($scope.attd);
        console.log($scope.att);
        batchService.create($scope.attendance).then(function (response) {
            //console.log(response);
        });
        window.location.reload();
    }
    $scope.cancel = function () {
        $mdDialog.cancel();
    };
}
dmtApplication.filter('capitalize', function () {
    return function (input) {
        return (!!input) ? input.charAt(0).toUpperCase() +
            input.substr(1).toLowerCase() : '';
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