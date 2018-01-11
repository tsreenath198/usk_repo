/*(function() {*/
    'use strict';
    dmtApplication
        .controller("UserDetailsController", UserDetailsController);

    function UserDetailsController($scope,UserDetailsService,$mdDialog,$rootScope,$mdToast,$state, $mdSidenav,$log) {
          

        var self = {
        init : init
    };
    function init() {
       $rootScope.currentController = 'User Details';
       $scope.currentPage = 'Create';
        var current = $state.current.name;
        $rootScope.currentDataEnable = true;
        $scope.currentState = current.split(/[\s.]+/);
        $scope.currentRoute = $scope.currentState[$scope.currentState.length - 1];
        $scope.customFullscreen = false;
        $scope.updatePage = false;
        $scope.userDetails1Data = [];
        $scope.collection = [];
        $scope.selected = [];
        $scope.headerEnable = {};
        $scope.exportData = [];


        $scope.cancelRecord = function(){
            $mdSidenav('right').close().then(function() {
                $log.debug("close RIGHT is done");
            });
        }
        $scope.record = {

            "userName" : "",
            "firstName":"",
            "lastName":"",
            "email":"",
            "phoneNo":"",
            "password":"",
            "confirmPassword": null,
            "role":"",
            "description":""
     
        };

        UserDetailsService.getAllRoles().then(function(response) {
            $scope.roles = response.data;
            
            });
        $scope.loading = true;

        UserDetailsService.getAllUserDetails().then(function(response) {
            $scope.userDetailsData = response.data;
            $scope.userDetailsLength = response.data.length;
            $rootScope.currentTableLength = 'Records Count :'+response.data.length;
            $scope.userDetailsOptions = [ 200 , 300 ];
            $scope.userDetailsPage = {
                pageSelect : true
            };

            $scope.query = {
                order : 'name',
                limit : 100,
                page : 1
            };$scope.loading = false;
        }, function(error) {
alert("failed");
                    $scope.loading=false;
        });
    
    /*Header icon functionality*/
        var deregisterListener = $rootScope.$on("CallUserDetailsMethod", function(){
            if ($rootScope.$$listeners["CallUserDetailsMethod"].length > 1) {
                            $rootScope.$$listeners["CallUserDetailsMethod"].pop();

                }
           $scope.toggleRight();
           $scope.emptyForm();
        });
         var deregisterListener = $rootScope.$on("CalluserDetailsSearchMethod", function(event, args) {
            if ($rootScope.$$listeners["CalluserDetailsSearchMethod"].length > 1) {
                $rootScope.$$listeners["CalluserDetailsSearchMethod"].pop();
            }            
            $scope.filter = args.text;
        });

        $scope.saveRecord = function() {
             //console.log($scope.record);
            UserDetailsService.create($scope.record).then(function(response) {
               // console.log("resp", response);
            });
             window.location.reload();
            $mdSidenav('right').close().then(function() {
               // $log.debug("close RIGHT is done");
            });
        };
         
        $scope.checkPassword = function(){
            if($scope.record.password == $scope.record.confirmPassword){
                $scope.confirmpassword = false;
            }else{
                $scope.confirmpassword = true;
            }
            
        }

        $scope.updateRow = function(row) {
             $scope.currentPage = 'Update';
            $scope.rowData = row;
            $scope.updatePage = true;
            $scope.record = {             
            "userName" :row.userName,
            "firstName":row.firstName,
            "lastName":row.lastName,
            "email":row.email,
            "phoneNo":row.phoneNo,
            "password":row.password,
            "confirmPassword": row.confirmPassword,
            "role":row.role,
            "description":row.description,
            "id" : row.id
            };
            
        };
        $scope.updateRecord = function() {
            UserDetailsService.update($scope.record).then(function(response) {
               //console.log("resp", response);
            });
              $scope.currentPage = 'Create';
            window.location.reload();
            $mdSidenav('right').close().then(function() {
                //$log.debug("close RIGHT is done");
            });
        }
        $scope.emptyForm = function() {
            $scope.updatePage = false;
             $scope.record = {

            "userName" : "",
            "firstName":"",
            "lastName":"",
            "email":"",
            "phoneNo":"",
            "password":"",
            "confirmPassword": null,
            "role":"",
            "description":""
     
        };
        };

        $scope.rowSelect = function(row) {
            $scope.selected.push(row);
        };
        $scope.headerCheckbox = false;
        $scope.selectAll = function() {
            if(!$scope.headerCheckbox){
            for ( var i in $scope.userDetailsData) {
                $scope.userDetailsData[i]["checkboxValue"] = 'on';
                $scope.selected.push($scope.userDetailsData[i]);
            };
            $scope.headerCheckbox = ($scope.headerCheckbox == false)?true:false;
        }else if($scope.headerCheckbox){
            for ( var i in $scope.userDetailsData) {
                $scope.userDetailsData[i]["checkboxValue"] = 'off';
                $scope.selected = [];
            };
            $scope.headerCheckbox = ($scope.headerCheckbox == true)?false:true;
        };
       // console.log($scope.selected);
        };

      
        $scope.deleteRow = function(ev,row) {
          var confirm = $mdDialog
                        .confirm()
                        .title('Are you sure want to Delete Record?')
                        
                        .ariaLabel('Lucky day').targetEvent(ev).ok(
                                'Ok').cancel('Cancel');

                $mdDialog
                        .show(confirm)
                        .then(
                                function() {
                                    UserDetailsService.deleteRow(row.id).then(function(response) {
            });
                                  window.location.reload();
                                },
                                function() {
                                    $scope.status = 'You decided to keep your Task.';
                                }); 

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
  


dmtApplication.directive('createUser', function($state) {
    return {
        restrict : 'E',
        replace : true,
        templateUrl : function() {
            var current = $state.current.name;
            return '../dmt/pages/app.userdetails/app.userdetails.create.html';
        }
    };
});