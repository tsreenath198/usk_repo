/*(function() {*/
'use strict';
dmtApplication.controller("technologyController", technologyController);
dmtApplication.controller("technologyPopUpController", technologyPopUpController);

function technologyController($scope, technologyService, $mdDialog, $mdToast, $state, $rootScope, $mdSidenav, $log) {


    var self = {
        init: init
    };

    function init() {
        $rootScope.currentController = 'Technology';
        $scope.currentPage = 'Create';
        var current = $state.current.name;
        $rootScope.currentDataEnable = true;
        $scope.currentState = current.split(/[\s.]+/);
        $scope.currentRoute = $scope.currentState[$scope.currentState.length - 1];
        $scope.customFullscreen = false;
        $scope.updatePage = false;
        $scope.technologiesData = [];
        $scope.collection = [];
        $scope.selected = [];
        $scope.headerEnable = {};
        $scope.exportData = [];

        $scope.cancelRecord = function () {
            $mdSidenav('right').close().then(function () {
                $log.debug("close RIGHT is done");
            });
        }
        $scope.getTrainers = function (id, ev) {
            $rootScope.techId = id;
            $mdDialog.show({
                    controller: technologyPopUpController,
                    templateUrl: 'pages/app.technology/technology.trainer.html',
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

        $scope.create = {
            "name": "",
            "createdDate": "",
            "description": ""
        };
        technologyService.getAllTechnologies().then(function (response) {
            $scope.technologiesData = response.data;
            $scope.technologiesLength = response.data.length;
            $rootScope.currentTableLength = 'Records Count :' + response.data.length;
            //console.log($scope.technologiesData);
            $scope.technologiesOptions = [200, 300];
            $scope.technologyPage = {
                pageSelect: true
            };
            $scope.query = {
                order: 'name',
                limit: 100,
                page: 1
            };
        }, function (error) {
            alert("failed");
            $scope.loading = false;
        });
        /*Header icon functionality*/
        var deregisterListener = $rootScope.$on("CallTechnologyMethod", function () {
            if ($rootScope.$$listeners["CallTechnologyMethod"].length > 1) {
                $rootScope.$$listeners["CallTechnologyMethod"].pop();

            }
            $scope.currentPage = "Create";
            $scope.toggleRight();
            $scope.emptyForm();
        });

        var deregisterListener = $rootScope.$on("CallTechnologySearchMethod", function (event, args) {
            if ($rootScope.$$listeners["CallTechnologySearchMethod"].length > 1) {
                $rootScope.$$listeners["CallTechnologySearchMethod"].pop();
            }
            $scope.filterByText = args.text;
        });


        $scope.headerCheckbox = false;
        $scope.selectAll = function () {
            if (!$scope.headerCheckbox) {
                for (var i in $scope.technologiesData) {
                    $scope.technologiesData[i]["checkboxValue"] = 'on';
                    $scope.selected.push($scope.technologiesData[i]);
                };
                $scope.headerCheckbox = ($scope.headerCheckbox == false) ? true : false;
            } else if ($scope.headerCheckbox) {
                for (var i in $scope.technologiesData) {
                    $scope.technologiesData[i]["checkboxValue"] = 'off';
                    $scope.selected = [];
                };
                $scope.headerCheckbox = ($scope.headerCheckbox == true) ? false : true;
            };
            //   console.log($scope.selected);
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
    $scope.updateData = function () {
        technologyService.update($scope.create).then(function (response) {
                init();
            }),
            function (error) {
                console.log(error)
            };

        $mdSidenav('right').close().then(function () {
            $log.debug("close RIGHT is done");
        });

        $scope.currentPage = 'Create';
    }
    $scope.saveRecord = function () {
        technologyService.create($scope.create).then(function (response) {});
        $mdSidenav('right').close().then(function () {
            $log.debug("close RIGHT is done");
        });
        window.location.reload();
        $scope.currentPage = 'Create';
    }

    $scope.updateRow = function (row) {
        $scope.currentPage = 'Update';
        $scope.rowData = row;
        $scope.updatePage = true;
        $scope.create = {
            "name": row.name,
            "updatedDate": new Date(),
            "description": row.description
        };
    };

    $scope.emptyForm = function () {
        $scope.updatePage = false;
        $scope.record = {};
    };
    $scope.deleteRow = function (ev, row) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog
            .confirm()
            .title('Are you sure want to Delete Record?')

            .ariaLabel('Lucky day').targetEvent(ev).ok(
                'Ok').cancel('Cancel');

        $mdDialog.show(confirm).then(function () {
            technologyService.deleteRow(row.id).then(function (response) {});
            window.location.reload();
        }, function () {
            $scope.status = 'You decided to keep your Task.';
        });

    };

    $scope.rowSelect = function (row) {
        $scope.selected.push(row);
    };

    return self;
};


function technologyPopUpController($scope, technologyService, $mdDialog, $rootScope, $mdToast, $timeout,
    $state, $mdSidenav, $log) {
    $scope.technologyId = $rootScope.techId;
    technologyService.getAllTrainersBasedOnTechnologyName($scope.technologyId).then(function (response) {
        $scope.trainersData = response.data;
        console.log("trainers", $scope.trainersData);

    });
    $scope.cancel = function () {
        $mdDialog.cancel();
    };
}
dmtApplication.directive('createTechnology', function ($state) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: function () {
            var current = $state.current.name;
            return '../dmt/pages/app.technology/app.technology.create.html';
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