/*(function() {*/
'use strict';
dmtApplication
    .controller("DashboardController", DashboardController);

function DashboardController($scope, DashboardService, $mdDialog, $mdToast,$rootScope) {
    var self = {
        init: init,
        isPanelShown: false,
        submitted: false,
        recordAlreadyExist: false,
        maxlength: 80,
        addApplication: addApplication,
        messageOnSuccessOrFailure: messageOnSuccessOrFailure,
        deleteApplication: deleteApplication,
        showAndHidePanel: showAndHidePanel,
        deleteDialog: deleteDialog,
        containsObject: containsObject,
        tooltip: {
            showTooltip: false,
            tipDirection: ''
        }

    };

    function init() {
       
      $rootScope.loading = true;
      $rootScope.currentDataEnable = false;
        DashboardService.getAllApplications().then(function(response) {
            $scope.applications = response.data;    
            $rootScope.loading = false;
        }, function(error) {
  alert("failed");
                    $scope.loading=false;
        });

    }

    function addApplication() {
        var item = {
            "app": self.name
        };
        if ($scope.form.$valid) {
            DashboardService.saveApplication(item).then(function(response) {
                self.applications.push(item);
                self.messageOnSuccessOrFailure("Successfully added record");
                self.showAndHidePanel();
                self.submitted = false;
                $scope.form.$setPristine();
                $scope.form.$setUntouched();
            }, function(error) {
                if (error.status === 409) {
                    self.recordAlreadyExist = true;
                    //self.messageOnSuccessOrFailure(error.message);
                }
                if (error.status === 400) {
                    self.messageOnSuccessOrFailure(error.message);
                }
                self.submitted = true;
            });

        } else {
            self.submitted = true;
        }
        /* self.submitted = true;*/
    }

    function deleteApplication(app) {
        var item = {
            "app": app
        };
        DashboardService.deleteApplication(item).then(function(response) {
            angular.forEach(self.applications, function(application, index) {
                if (application.app === app) {
                    self.applications.splice(index, 1);
                    self.messageOnSuccessOrFailure("Successfully deleted record");
                }
            });

        }, function(error) {
            if (error.status === 404) {
                self.messageOnSuccessOrFailure(error.message);
            }
            if (error.status === 400) {
                self.messageOnSuccessOrFailure(error.message);
            }
            return;
        });
    }

    function showAndHidePanel() {
        self.name = "";
        self.isPanelShown = (self.isPanelShown == false) ? true : false;
        self.submitted = false;
        $scope.form.$setPristine();
        $scope.form.$setUntouched();
    }

    function deleteDialog(app) {
        $mdDialog.show({
            scope: $scope,
            preserveScope: true,
            template: '<md-dialog>' +
                '<md-dialog-content class="md-dialog-content">' +
                '<div class="md-dialog-content-body">Are you sure ?' +
                '</div>' +
                '</md-dialog-content>' +
                '<md-dialog-actions>' +
                '<md-button ng-click="closeDialog()" class="md-primary">' +
                'Close' +
                '</md-button>' +
                '<md-button ng-click="delete()" class="md-primary">' +
                'Delete' +
                '</md-button>' +
                '</md-dialog-actions>' +
                '</md-dialog>',

            controller: function($scope) {
                $scope.closeDialog = function() {
                    $mdDialog.hide();
                };
                $scope.delete = function() {
                    self.deleteApplication(app);
                    $mdDialog.hide();
                };
            }
        });
    }

    function messageOnSuccessOrFailure(message) {


        $mdDialog.show({
            scope: $scope,
            preserveScope: true,
            template: '<md-dialog>' +
                '<md-dialog-content class="md-dialog-content">' +
                '<div class="md-dialog-content-body">' + message +
                '</div>' +
                '</md-dialog>',

            controller: function($scope, $timeout) {
                self.iconDisabled = true;
                $timeout(function() {
                    $mdDialog.hide();
                    self.iconDisabled = false;
                }, 3000);
            }
        });

    }

    function containsObject(obj, list) {
        return list.filter(function(listItem) {
            return angular.equals(listItem, obj)
        }).length > 0;
    }

    $scope.init = self.init;
    $scope.addApplication = self.addApplication;
    $scope.showAndHidePanel = self.showAndHidePanel;
    $scope.isPanelShown = self.isPanelShown;
    $scope.submitted = self.submitted;
    $scope.deleteDialog = self.deleteDialog;
    $scope.messageOnSuccessOrFailure = self.messageOnSuccessOrFailure;
    $scope.tooltip = self.tooltip;
    $scope.tooltip.delayTooltip = undefined;
    $scope.$watch('tooltip.delayTooltip', function(val) {
        $scope.tooltip.delayTooltip = parseInt(val, 10) || 0;
    });

    $scope.init();


    return self;
}