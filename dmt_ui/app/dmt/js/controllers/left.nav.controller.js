/*(function() {*/
'use strict';
dmtApplication.controller("leftNavController", leftNavController);

function leftNavController($scope, leftNavService, Excel, $state, $mdDialog,
    $mdToast, $timeout, $mdSidenav, $log, $rootScope) {
    var self = {
        init: init,
        buildToggler: buildToggler
    };
    $scope.toggleStart = false;
    $scope.toggleSearch = function () {
        $scope.toggleStart = ($scope.toggleStart == false) ? true : false;
    };
    $scope.exportData = function () {
        var exportTable = "#" + $scope.tableToExport + "Table";
        var exportHref = Excel.tableToExcel(exportTable, 'sheet name');
        $timeout(function () {
            location.href = exportHref;
        }, 100); // trigger download
    }
    $scope.toggle = function (itemPos) {
        if ($scope.menuIsOpen === itemPos) {
            $scope.menuIsOpen = 0;
            // $scope.class = "fa-chevron-down rotate180";
        } else {
            $scope.menuIsOpen = itemPos;
            // $scope.class = "fa-chevron-down";
        }
    }
    $rootScope.currentTableLength;

    $scope.logout = function () {
        $state.go('login');
    }

    $scope.searchRecord = function (text) {
        switch ($rootScope.currentController) {
            case 'Support':
                $rootScope.$emit("CallSupportSearchMethod", {
                    text: text
                });
                break;
            case 'Batch':
                $rootScope.$emit("CallBatchSearchMethod", {
                    text: text
                });
                break;
            case 'Batch Attendances':
                $rootScope.$emit("CallbatchAttendancesSearchMethod", {
                    text: text
                });
                break;
            case 'Client':
                $rootScope.$emit("CallClientSearchMethod", {
                    text: text
                });
                break;
            case 'Payroll':
                $rootScope.$emit("CallPayRollSearchMethod", {
                    text: text
                });
                break;
            case 'Miscellaneous':
                $rootScope.$emit("CallMiscellaneousSearchMethod", {
                    text: text
                });
                break;
            case 'Expense':
                $rootScope.$emit("CallExpenseSearchMethod", {
                    text: text
                });
                break;
            case 'Evaluation':
                $rootScope.$emit("CallEvaluationSearchMethod", {
                    text: text
                });
                break;
            case 'Resume':
                $rootScope.$emit("CallResumeSearchMethod", {
                    text: text
                });
                break;
            case 'Employee':
                $rootScope.$emit("CallEmployeeSearchMethod", {
                    text: text
                });
                break;
            case 'Employee Designation':
                $rootScope.$emit("CallemployeeDesignationSearchMethod", {
                    text: text
                });
                break;
            case 'Interview':
                $rootScope.$emit("CallInterviewSearchMethod", {
                    text: text
                });
                break;
            case 'Invoice':
                $rootScope.$emit("CallInvoiceSearchMethod", {
                    text: text
                });
                break;
            case 'Oppurtunity Tracker':
                $rootScope.$emit("CalloppurtunityTrackerSearchMethod", {
                    text: text
                });
                break;
            case 'Question':
                $rootScope.$emit("CallQuestionSearchMethod", {
                    text: text
                });
                break;
            case 'Payroll':
                $rootScope.$emit("CallSalarySearchMethod", {
                    text: text
                });
                break;
            case 'Support':
                $rootScope.$emit("CallSupportSearchMethod", {
                    text: text
                });
                break;
            case 'Support Interaction':
                $rootScope.$emit("CallsupportInteractionSearchMethod", {
                    text: text
                });
                break;
            case 'Task':
                $rootScope.$emit("CallTaskSearchMethod", {
                    text: text
                });
                break;
            case 'Technology':
                $rootScope.$emit("CallTechnologySearchMethod", {
                    text: text
                });
                break;
            case 'Time sheet':
                $rootScope.$emit("CallTimeSheetSearchMethod", {
                    text: text
                });
                break;
            case 'Trainee':
                $rootScope.$emit("CallTraineeSearchMethod", {
                    text: text
                });
                break;
            case 'Trainer':
                $rootScope.$emit("CallTrainerSearchMethod", {
                    text: text
                });
                break;
            case 'User Details':
                $rootScope.$emit("CalluserDetailsSearchMethod", {
                    text: text
                });
                break;
            case 'User Roles':
                $rootScope.$emit("CalluserRolesSearchMethod", {
                    text: text
                });
                break;
        }
    }

    $scope.addRecord = function () {
        switch ($rootScope.currentController) {
            case 'Interview':
                $rootScope.$emit("CallInterviewMethod", {});
                break;
            case 'Client':
                $rootScope.$emit("CallClientMethod", {});
                break;
            case 'Support':
                $rootScope.$emit("CallSupportMethod", {});
                break;
            case 'Support Interaction':
                $rootScope.$emit("CallSupportInteractionMethod", {});
                break;
            case 'Oppurtunity Tracker':
                $rootScope.$emit("CallOppurtunityTrackerMethod", {});
                break;
            case 'Miscellaneous':
                $rootScope.$emit("CallMiscellaneousMethod", {});
                break;
            case 'Expense':
                $rootScope.$emit("CallExpenseMethod", {});
                break;
            case 'Resume':
                $rootScope.$emit("CallResumeMethod", {});
                break;
            case 'Question':
                $rootScope.$emit("CallQuestionMethod", {});
                break;
            case 'Task':
                $rootScope.$emit("CallTaskMethod", {});
                break;
            case 'Technology':
                $rootScope.$emit("CallTechnologyMethod", {});
                break;
            case 'User Details':
                $rootScope.$emit("CallUserDetailsMethod", {});
                break;
            case 'User Roles':
                $rootScope.$emit("CallUserRoleMethod", {});
                break;
            case 'Employee Designation':
                $rootScope.$emit("CallEmployeeDesignationMethod", {});
                break;
            case 'Invoice':
                $rootScope.$emit("CallInvoiceMethod", {});
                break;
            case 'Time sheet':
                $rootScope.$emit("CallTimeSheetMethod", {});
                break;
            case 'Trainer':
                $rootScope.$emit("CallTrainerMethod", {});
                break;
            case 'Trainee':
                $rootScope.$emit("CallTraineeMethod", {});
                break;
            case 'Batch':
                $rootScope.$emit("CallBatchMethod", {});
                break;
            case 'Employee':
                $rootScope.$emit("CallEmployeeMethod", {});
                break;
            case 'Batch Attendances':
                $rootScope.$emit("CallBatchAttendancesMethod", {});
                break;
            case 'Payroll':
                $rootScope.$emit("CallPayRollMethod", {});
                break;
            case 'Evaluation':
                $rootScope.$emit("CallEvaluationMethod", {});
                break;
        }
    };


    function init() {
        leftNavService.getAllTabs().then(function (response) {
            $scope.leftTabs = response.data;
        });
        $scope.tablesToExcel = function () {
            var uri = 'data:application/vnd.ms-excel;base64,',
                template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets>',
                templateend = '</x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head>',
                body = '<body>',
                tablevar = '<table>{table',
                tablevarend = '}</table>',
                bodyend = '</body></html>',
                worksheet = '<x:ExcelWorksheet><x:Name>',
                worksheetend = '</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>',
                worksheetvar = '{worksheet',
                worksheetvarend = '}',
                base64 = function (s) {
                    return window.btoa(unescape(encodeURIComponent(s)))
                },
                format = function (s, c) {
                    return s.replace(/{(\w+)}/g, function (m, p) {
                        return c[p];
                    })
                },
                wstemplate = '',
                tabletemplate = '';

            return function (table, name, filename) {
                var tables = table;

                for (var i = 0; i < tables.length; ++i) {
                    wstemplate += worksheet + worksheetvar + i + worksheetvarend + worksheetend;
                    tabletemplate += tablevar + i + tablevarend;
                }

                var allTemplate = template + wstemplate + templateend;
                var allWorksheet = body + tabletemplate + bodyend;
                var allOfIt = allTemplate + allWorksheet;

                var ctx = {};
                for (var j = 0; j < tables.length; ++j) {
                    ctx['worksheet' + j] = name[j];
                }

                for (var k = 0; k < tables.length; ++k) {
                    var exceltable;
                    if (!tables[k].nodeType) exceltable = document.getElementById(tables[k]);
                    ctx['table' + k] = exceltable.innerHTML;
                }

                //document.getElementById("dlink").href = uri + base64(format(template, ctx));
                //document.getElementById("dlink").download = filename;
                //document.getElementById("dlink").click();

                window.location.href = uri + base64(format(allOfIt, ctx));

            }
        }();

    }

    function buildToggler(componentId) {
        return function () {
            $mdSidenav(componentId).toggle();
        }
    }
    $scope.init = self.init;
    $scope.toggleNavigationLeft = buildToggler('left');
    init();

    var str = $state.current.url;
    str = str.replace(/[/]/g, "");
    $scope.tableToExport = str;

    return self;
};