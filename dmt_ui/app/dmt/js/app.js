/**
 * Top level module of the Policy Application.
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

    var dmtApplication = angular.module('DmtApplication', ['ngMaterial', 'ui.router','ngIdle','md.data.table','ngResource'])
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
                $locationProvider.html5Mode(true);
                $stateProvider
                    .state('app', {
                        url: '',
                        abstract: true,
                        views: {
                            'header': {
                                templateUrl: 'pages/header.html'

                            },
                            'navbar': {
                                templateUrl: 'pages/navigation.html'

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
                $urlRouterProvider.otherwise("/course");
            }
        ]);

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

/*}());*/