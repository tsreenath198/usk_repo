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
                $urlRouterProvider.otherwise("/rules");
            }
        ]);

/*}());*/