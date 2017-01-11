/*(function() {*/
    'use strict';
    dmtApplication
        .controller("invoiceController", invoiceController);

    function invoiceController($scope,invoiceService,$mdDialog,$mdToast,$state, $mdSidenav,$log) {
          

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
        $scope.invoicesData = [];
        $scope.collection = [];
        $scope.selected = [];
        $scope.headerEnable = {};
        $scope.exportData = [];

       

        $scope.record = {
            "invoiceDate" : "",
            "invoiceType" : "",
            "actualAmount" : "",
            "receivedAmount" : "",
            "receivedDate" : "",
            "createdDate":"",
            "description" : ""
        };
        invoiceService.getAllInVoices().then(function(response) {
            $scope.invoicesData = response.data;
            $scope.invoicesLength = response.data.length;
            console.log($scope.invoicesData);
            $scope.invoicesOptions = [200, 300 ];
            $scope.invoicePage = {
                pageSelect : true
            };
            $scope.query = {
                order : 'name',
                limit : 100,
                page : 1
            };
        }, function(error) {

        });
    
        
        $scope.saveRecord = function() {
             invoiceService.create($scope.record).then(function(response) {
                console.log("resp", response);
            });
            $mdSidenav('right').close().then(function() {
                $log.debug("close RIGHT is done");
            });
        }

        $scope.setRowData = function(row) {
        	$scope.updatePage=true;
            $scope.record = {
                "invoiceDate" : new Date(row.invoiceDate),
                "invoiceType" : row.invoiceType,
                "actualAmount" : row.actualAmount,
                "receivedAmount" : row.receivedAmount,
                "receivedDate" : new Date(row.receivedDate),
                "updatedDate" :"",
                "description" : row.description,
                "id" : row.id
                };
            // console.log($scope.create.status);
        };
        $scope.updateData = function() {
            
        	invoiceService.update($scope.record).then(function(response) {
                console.log("resp", response);
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
            for ( var i in $scope.invoicesData) {
                $scope.invoicesData[i]["checkboxValue"] = 'on';
                $scope.selected.push($scope.invoicesData[i].id);
            }
            ;
        };

        $scope.deSelectAll = function() {
            for ( var i in $scope.invoicesData) {
                $scope.invoicesData[i]["checkboxValue"] = 'off';
            }
            ;
            $scope.selected = [];
        };

        $scope.deleteSelected = function(ev) {
            // Appending dialog to document.body to cover sidenav in docs app
            if ($scope.selected.length > 0) {
                var confirm = $mdDialog
                        .confirm()
                        .title('Would you like to delete your InVoice?')
                        .textContent(
                                'All of the InVoice have agreed to forgive you InVoice.')
                        .ariaLabel('Lucky day').targetEvent(ev).ok(
                                'Please do it!').cancel('Sounds like a scam');

                $mdDialog.show(confirm).then(function() {
                    $scope.invoicesData = $scope.invoicesData.filter(function(obj) {
                        return $scope.selected.indexOf(obj.id) === -1;
                    });
                    $scope.invoicesLength = $scope.invoicesData.length;
                }, function() {
                    $scope.status = 'You decided to keep your InVoice.';
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
  


dmtApplication.directive('createInVoice', function($state) {
    return {
        restrict : 'E',
        replace : true,
        templateUrl : function() {
            var current = $state.current.name;
            return '../dmt/pages/' + current + '/' + current + '.create.html';
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
        
