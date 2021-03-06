/**
 * Top level module of the DMT Application.
 * 
 * @module DmtApplication
 * @requires ngMaterial
 * @requires ui.router
 */
/*(function() {*/
    'use strict';
    var env = {};
    // Import variables if present from env.js
    if (window) {

       env = window.__env;
       env.api = "/api";
    }

    var dmtApplication = angular.module('DmtApplication', ['ngMaterial', 'ui.router','ngIdle','md.data.table','ngResource','ngSanitize', 'ngCsv'])
        .constant('__env', env)
        .config(function(IdleProvider, KeepaliveProvider) {
              // configure Idle settings
              IdleProvider.autoResume(false);
              IdleProvider.keepalive(false);
          })        
        .config(function($mdThemingProvider) {
            $mdThemingProvider.theme('default')
                .primaryPalette('blue-grey')
                .accentPalette('green')
                .warnPalette('red')
                .backgroundPalette('grey', {
                    'default': 'A100'
                });
        })
        .run(function(Idle){
        // start watching when the app runs. also starts the Keepalive service by default.
        Idle.watch();
        })
        .config(function($mdIconProvider) {
  $mdIconProvider.fontSet('md', 'material-icons');
})
        .config(['$locationProvider', '$stateProvider', '$urlRouterProvider',
            function($locationProvider, $stateProvider, $urlRouterProvider) {
                //$locationProvider.html5Mode(true);
                 $stateProvider
                    .state('app', {
                        url: '',
                        abstract: true,
                        views: {
                            'header': {
                                templateUrl: 'pages/header.html',
                                controller: "leftNavController",
                                controllerAs: 'self'

                            },
                            'navbar': {
                                templateUrl: 'pages/navigation.html',
                                controller: "leftNavController",
                                controllerAs: 'self'

                            }
                        }
                    });

                 $stateProvider .state(
                    'app.interview',
                    {
                        name : "interview",
                        url : "/interview",
                        views : {

                            "content@" : {
                                controller : "interviewController",
                                controllerAs : 'self',
                                templateUrl : "pages/app.interview/app.interview.html"
                            }
                        }
                    });
                    $stateProvider
                    .state('app.oppurtunityTracker', {
                        name: "oppurtunityTracker",
                        url: "/oppurtunityTracker",
                        views: {

                            "content@": {
                                controller: "oppurtunityTrackerController",
                                controllerAs: 'self',
                                templateUrl: "pages/app.oppurtunityTracker/app.oppurtunityTracker.html"

                            }
                        }
                    });


                     $stateProvider
                    .state('app.client', {
                        name: "client",
                        url: "/client",
                        views: {

                            "content@": {
                                controller: "clientController",
                                controllerAs: 'self',
                                templateUrl: "pages/app.client/app.client.html"
                            }
                        }
                    });
                    $stateProvider
                    .state('app.miscellaneous', {
                        name: "miscellaneous",
                        url: "/miscellaneous",
                        views: {

                            "content@": {
                                controller: "miscellaneousController",
                                controllerAs: 'self',
                                templateUrl: "pages/app.miscellaneous/app.miscellaneous.html"
                            }
                        }
                    });
                    $stateProvider
                    .state('app.evaluation', {
                        name: "evaluation",
                        url: "/evaluation",
                        views: {

                            "content@": {
                                controller: "evaluationController",
                                controllerAs: 'self',
                                templateUrl: "pages/app.evaluation/app.evaluation.html"
                            }
                        }
                    });
                    $stateProvider
                    .state('app.payroll', {
                        name: "payroll",
                        url: "/payroll",
                        views: {

                            "content@": {
                                controller: "payrollController",
                                controllerAs: 'self',
                                templateUrl: "pages/app.payroll/app.payroll.html"
                            }
                        }
                    });
                    $stateProvider
                    .state('app.resume', {
                        name: "resume",
                        url: "/resume",
                        views: {

                            "content@": {
                                controller: "resumeController",
                                controllerAs: 'self',
                                templateUrl: "pages/app.resume/app.resume.html"
                            }
                        }
                    });
                    $stateProvider
                    .state('app.salary', {
                        name: "salary",
                        url: "/salary",
                        views: {

                            "content@": {
                                controller: "salaryController",
                                controllerAs: 'self',
                                templateUrl: "pages/app.salary/app.salary.html"
                            }
                        }
                    });

                     $stateProvider
                    .state('app.supportInteraction', {
                        name: "supportInteraction",
                        url: "/supportInteraction",
                        views: {

                            "content@": {
                                controller: "supportInteractionController",
                                controllerAs: 'self',
                                templateUrl: "pages/app.supportInteraction/app.supportInteraction.html"
                                }
                        }
                    });

                $stateProvider
                    .state('app.dashboard', {
                        name: "dashboard",
                        url: "/dashboard",
                        views: {

                            "content@": {
                                controller: "DashboardController",
                                controllerAs: 'self',
                                templateUrl: "pages/dashboard/dashboard.html"
                            }
                        }
                    });
                
                $stateProvider
                .state('app.batchAttendance', {
                    name: "batchAttendance",
                    url: "/batchAttendance",
                    views: {

                        "content@": {
                            controller: "batchAttendanceController",
                            controllerAs: 'self',
                            templateUrl: "pages/app.batchAttendance/app.batchAttendance.html"
                        }
                    }
                });
                    

                      $stateProvider
                    .state('app.userDetails', {
                        name: "userDetails",
                        url: "/userDetails",
                        views: {

                            "content@": {
                                controller: "UserDetailsController",
                                controllerAs: 'self',
                                templateUrl: "pages/app.userdetails/app.userdetails.html"
                            }
                        }
                    });

                    $stateProvider
                    .state('app.userRoles', {
                        name: "userRoles",
                        url: "/userRoles",
                        views: {

                            "content@": {
                                controller: "userRoleController",
                                controllerAs: 'self',
                                templateUrl: "pages/app.userRoles/app.userRoles.html"
                            }
                        }
                    });
                     

                     $stateProvider
                    .state('app.employeeDesignation', {
                        name: "employeeDesignation",
                        url: "/employeeDesignation",
                        views: {

                            "content@": {
                                controller: "employeeDesignationController",
                                controllerAs: 'self',
                                templateUrl: "pages/app.employeeDesignation/app.employeeDesignation.html"
                            }
                        }
                    });
                      $stateProvider
                    .state('app.technology', {
                        name: "technology",
                        url: "/technology",
                        views: {

                            "content@": {
                                controller: "technologyController",
                                controllerAs: 'self',
                                templateUrl: "pages/app.technology/app.technology.html"
                                }
                        }
                    });
                    $stateProvider
                    .state('app.question', {
                        name: "question",
                        url: "/question",
                        views: {

                            "content@": {
                                controller: "questionController",
                                controllerAs: 'self',
                                templateUrl: "pages/app.question/app.question.html"
                                }
                        }
                    });
                   

                    $stateProvider
                    .state('app.timesheet', {
                        name: "timesheet",
                        url: "/timesheet",
                        views: {

                            "content@": {
                                controller: "timesheetController",
                                controllerAs: 'self',
                                templateUrl: "pages/app.timesheet/app.timesheet.html"
                            }
                        }
                    });
                    $stateProvider
                    .state('app.employee', {
                        name: "employee",
                        url: "/employee",
                        views: {

                            "content@": {
                                controller: "EmployeeController",
                                controllerAs: 'self',
                                templateUrl: "pages/app.employee/app.employee.html"
                            }
                        }
                    });
                    $stateProvider
                    .state('app.trainee', {
                        name: "trainee",
                        url: "/trainee",
                        views: {

                            "content@": {
                                controller: "TraineeController",
                                controllerAs: 'self',
                                templateUrl: "pages/app.trainee/app.trainee.html"
                            }
                        }
                    });

                    $stateProvider
                    .state('app.batch', {
                        name: "batch",
                        url: "/batch",
                        views: {

                            "content@": {
                                controller: "batchController",
                                controllerAs: 'self',
                                templateUrl: "pages/app.batch/app.batch.html"
                            }
                        }
                    });

                                     $stateProvider
                                    .state(
                                            'app.task',
                                            {
                                                name : "task",
                                                url : "/task",
                                                views : {

                                                    "content@" : {
                                                        controller : "taskController",
                                                        controllerAs : 'self',
                                                        templateUrl : "pages/app.task/app.task.html"
                                                    }
                                                }
                                            });

                                $stateProvider
                                    .state(
                                            'app.support',
                                            {
                                                name : "support",
                                                url : "/support",
                                                views : {

                                                    "content@" : {
                                                        controller : "supportController",
                                                        controllerAs : 'self',
                                                        templateUrl : "pages/app.support/app.support.html"
                                                    }
                                                }
                                            });
                $stateProvider
                    .state('app.rules', {
                        name: "rules",
                        url: "/rules",
                        views: {

                            "content@": {
                                templateUrl: "pages/rules/rules.html"
                            }
                        }
                    });
                $stateProvider
                    .state('app.logout', {
                        name: "logout",
                        url: "/logout",
                        views: {
                            "content@": {
                                controller: "LogoutController"
                            }
                        }
                    });
                    $stateProvider
                                    .state(
                                            'app.course',
                                            {
                                                name : "course",
                                                url : "/course",
                                                views : {

                                                    "content@" : {
                                                        controller : "courseController",
                                                        controllerAs : 'self',
                                                        templateUrl : "pages/app.course/app.course.html"
                                                    }
                                                }
                                            });
                $stateProvider
                    .state(
                            'app.trainer',
                            {
                                name : "trainer",
                                url : "/trainer",
                                views : {

                                    "content@" : {
                                        controller : "TrainerController",
                                        controllerAs : 'self',
                                        templateUrl : "pages/app.trainer/app.trainer.html"
                                    }
                                }
                            });
                $stateProvider
                .state(
                        'app.invoice',
                        {
                            name : "invoice",
                            url : "/invoice",
                            views : {

                                "content@" : {
                                    controller : "invoiceController",
                                    controllerAs : 'self',
                                    templateUrl : "pages/app.invoice/app.invoice.html"
                                }
                            }
                        });

                        $stateProvider
                        .state(
                                'app.expense',
                                {
                                    name : "expense",
                                    url : "/expense",
                                    views : {
        
                                        "content@" : {
                                            controller : "expenseController",
                                            controllerAs : 'self',
                                            templateUrl : "pages/app.expense/app.expense.html"
                                        }
                                    }
                                });
                $stateProvider
                    .state('login', {
                        name: "login",
                        url: "/login",
                        views: {
                            'header': {
                            },
                            'navbar': {
                            },
                            "content@": {
                                controller: "loginController",
                                controllerAs: 'self',
                                templateUrl: "pages/app.login/app.login.html"
                            }
                        }
                    });
                $urlRouterProvider.otherwise("/login");

            }
        ]);

dmtApplication.filter('capitalize', function() {
    return function(input) {
        return (!!input) ? input.charAt(0).toUpperCase()
                + input.substr(1).toLowerCase() : '';
    }
});

dmtApplication.directive('onlyDigits', function () {
    return {
      require: 'ngModel',
      restrict: 'A',
      link: function (scope, element, attr, ctrl) {
        function inputValue(val) {
          if (val) {
            var digits = val.replace(/[^0-9.+-]/g, '');

            if (digits.split('.').length > 2) {
              digits = digits.substring(0, digits.length - 1);
            }

            if (digits !== val) {
              ctrl.$setViewValue(digits);
              ctrl.$render();
            }
            return parseFloat(digits);
          }
          return undefined;
        }            
        ctrl.$parsers.push(inputValue);
      }
    };
 });

dmtApplication.directive('replace', function() {
  return {
    require: 'ngModel',
    scope: {
      regex: '@replace',
      with: '@with'
    }, 
    link: function(scope, element, attrs, model) {
      model.$parsers.push(function(val) {
        if (!val) { return; }
        var regex = new RegExp(scope.regex);
        var replaced = val.replace(regex, scope.with); 
        if (replaced !== val) {
          model.$setViewValue(replaced);
          model.$render();
        }         
        return replaced;         
      });
    }
  };
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
