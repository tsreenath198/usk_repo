/*(function() {*/
    'use strict';
    dmtApplication
        .controller("userRoleController", userRoleController);

    function userRoleController($scope,userRoleService,$mdDialog,$mdToast,$state, $mdSidenav,$log) {
          

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
        $scope.userRolesData = [];
        $scope.collection = [];
        $scope.selected = [];
        $scope.headerEnable = {};
        $scope.exportData = [];

       

        $scope.record = {
            "name" : "",
            "createdDate":"",
            "description" : ""
        };
        userRoleService.getAllUserRoles().then(function(response) {
            $scope.userRolesData = response.data;
            $scope.userRolesLength = response.data.length;
            console.log($scope.userRolesData);
            $scope.userRolesOptions = [ 100, 200, 300 ];
            $scope.userRolePage = {
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
             console.log($scope.create);
             userRoleService.create($scope.record).then(function(response) {
                console.log("resp", response);
            });
            $mdSidenav('right').close().then(function() {
                $log.debug("close RIGHT is done");
            });
        }

        $scope.setRowData = function(row) {
            $scope.record = {
                "name" : row.name,
                "updatedDate" :"",
                "description" : row.description,
                "id" : row.id
                };
            // console.log($scope.create.status);
        };
        $scope.updateData = function() {
            // console.log($scope.create);

        	userRoleService.update($scope.record).then(function(response) {
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
            for ( var i in $scope.userRolesData) {
                $scope.userRolesData[i]["checkboxValue"] = 'on';
                $scope.selected.push($scope.userRolesData[i].id);
            }
            ;
        };

        $scope.deSelectAll = function() {
            for ( var i in $scope.userRolesData) {
                $scope.userRolesData[i]["checkboxValue"] = 'off';
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
                    $scope.userRolesData = $scope.userRolesData.filter(function(obj) {
                        return $scope.selected.indexOf(obj.id) === -1;
                    });
                    $scope.userRolesLength = $scope.userRolesData.length;
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
  


dmtApplication.directive('createUserRole', function($state) {
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
        
