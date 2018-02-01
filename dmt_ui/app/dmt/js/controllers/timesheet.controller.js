 'use strict';
 dmtApplication
     .controller("timesheetController", timesheetController);

 function timesheetController($scope, timesheetService, $mdDialog, $rootScope, $mdToast, $state, $mdSidenav, $log) {


     var self = {
         init: init
     };

     function init() {
         $scope.pageInfo = 'Create';
         $rootScope.currentController = 'Time sheet';
         var current = $state.current.name;
         $scope.currentPage = "Create";
         $rootScope.currentDataEnable = true;
         $scope.currentState = current.split(/[\s.]+/);
         $scope.currentRoute = $scope.currentState[$scope.currentState.length - 1];
         $scope.customFullscreen = false;
         $scope.updatePage = false;
         $scope.timesheetsData = [];
         $scope.collection = [];
         $scope.selected = [];
         $scope.headerEnable = {};
         $scope.exportData = [];
         $scope.taskList = [{
             "category": "",
             "referenceId": "",
             "description": "",
             "createdDate": ""
         }];


         $scope.loading = true;
         timesheetService.getAllTimesheets().then(function (response) {
             $scope.timesheetsData = response.data;
             $scope.timesheetsLength = response.data.length;
             $rootScope.currentTableLength = 'Records Count :' + response.data.length;
             //console.log($scope.timesheetsData);
             $scope.timesheetsOptions = [200, 300];
             $scope.timesheetPage = {
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

         timesheetService.getAllTimes().then(function (response) {
             $scope.times = response.data;
         });
         timesheetService.getAllCategories().then(function (response) {
             $scope.categories = response.data;
         });
         timesheetService.getAllEmployees().then(function (response) {
             $scope.employees = response.data;
         });

         var deregisterListener = $rootScope.$on("CallTimeSheetMethod", function () {
             if ($rootScope.$$listeners["CallTimeSheetMethod"].length > 1) {
                 $rootScope.$$listeners["CallTimeSheetMethod"].pop();

             }
             $scope.currentPage = 'Create';
             $scope.toggleRight();
             $scope.emptyForm();
         });
         var deregisterListener = $rootScope.$on("CallTimeSheetSearchMethod", function (event, args) {
             if ($rootScope.$$listeners["CallTimeSheetSearchMethod"].length > 1) {
                 $rootScope.$$listeners["CallTimeSheetSearchMethod"].pop();
             }
             $scope.filterByText = args.text;
         });

         $scope.addMoreCategories = function () {

             $scope.taskList.push({
                 "category": "",
                 "referenceId": "",
                 "description": "",
                 "createdDate": ""
             });

         }

         $scope.removeCategories = function (index) {
             $scope.taskList.splice(index, 1);
         }

         $scope.record = {
             "date": "",
             "inTime": "",
             "createdDate": "",
             "employeeId": ""
         };

         $scope.cancelRecord = function () {
             $mdSidenav('right').close().then(function () {
                 $log.debug("close RIGHT is done");
             });

         };

         $scope.saveRecord = function () {
             $scope.record['taskList'] = $scope.taskList;
             timesheetService.create($scope.record).then(function (response) {});
             $scope.cancelRecord();
             $scope.currentPage = "Create";
             window.location.reload();
         }

         $scope.setRowData = function (row) {
             $scope.currentPage = "Create";
             $scope.record = {
                 "date": new Date(row.date),
                 "inTime": row.inTime,
                 "employeeId": row.employeeId,
                 "id": row.id
             };
             $scope.timesheetId = {
                 "timeSheetId": row.id
             };
             timesheetService.getTasksById($scope.timesheetId).then(function (response) {
                 //   console.log(response.data);
                 $scope.taskList = response.data;
             });

             $scope.updatePage = true;

         };
         $scope.updateData = function () {
             $scope.record['taskList'] = $scope.taskList;
             timesheetService.update($scope.record).then(function (response) {
                 //console.log(response);
             });

             $scope.cancelRecord();
             $scope.currentPage = "Create";
             window.location.reload();
         }
         $scope.emptyForm = function () {
             $scope.updatePage = false;
             $scope.record = {
                 "date": "",
                 "inTime": "",
                 "createdDate": "",
                 "employeeId": ""
             };
         };

         $scope.rowSelect = function (row) {
             $scope.selected.push(row.id);
         };
         $scope.headerCheckbox = false;
         $scope.selectAll = function () {
             if (!$scope.headerCheckbox) {
                 for (var i in $scope.timesheetsData) {
                     $scope.timesheetsData[i]["checkboxValue"] = 'on';
                     $scope.selected.push($scope.timesheetsData[i]);
                 };
                 $scope.headerCheckbox = ($scope.headerCheckbox == false) ? true : false;
             } else if ($scope.headerCheckbox) {
                 for (var i in $scope.timesheetsData) {
                     $scope.timesheetsData[i]["checkboxValue"] = 'off';
                     $scope.selected = [];
                 };
                 $scope.headerCheckbox = ($scope.headerCheckbox == true) ? false : true;
             };
             // console.log($scope.selected);
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
                         timesheetService.deleteRow(row.id).then(function (response) {

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



 dmtApplication.directive('createTimesheet', function ($state) {
     return {
         restrict: 'E',
         replace: true,
         templateUrl: function () {
             var current = $state.current.name;
             return '../dmt/pages/' + current + '/' + current + '.record.html';
         }
     };
 });