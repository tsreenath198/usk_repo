/*(function() {*/
    'use strict';
    dmtApplication
        .controller("EventsController", EventsController);

    function EventsController($scope, Idle, SessionManagementService, __env, $mdDialog) {
        var self = {
            timeToLive : 0,
            sessionWarnBefore : __env.sessionWarnBefore / 1000,
            idle : 0,
            timeOut : 0,
            timeCheck : null,
            keepALive : null,
            callTimeCheck : callTimeCheck,
            callKeepALive : callKeepALive,
            errorDialog :errorDialog
        };
      
        $scope.$on('IdleStart', function() {
        
            var confirm = $mdDialog.confirm()
                .title('Session Timeout')
                .textContent('Your session is about to expire due to inactivity.')
                .ariaLabel('')
                .targetEvent(this)
                .ok('Stay logged in')
                .cancel('Logout now');

      /*  $mdDialog.show(confirm).then(function(args) {
        if (args === true) {//the user clicked ok
                	self.callKeepALive();
		} 
        }, function(args) {

        if (args != "sessionTimer" && args != true) {//the user clicked cancel
            
                	Idle.unwatch();
                	SessionManagementService.logout();
		}
        });*/
        });

        $scope.$on('IdleWarn', function(e, countdown) {
          //  console.log("IdleWarn");
        });

        $scope.$on('IdleTimeout', function() {
            self.callTimeCheck();
        });

        $scope.$on('IdleEnd', function() {
           // console.log("IdleEnd");
        });
        //Not used, retained for further use if need be
        $scope.$on('Keepalive', function() {
          //  console.log("Keepalive");
        });

        function callTimeCheck() {
            SessionManagementService.timeCheck().then(function(response) {
                self.timeToLive = response.timeToLive;
                Idle.unwatch();
                $mdDialog.cancel("sessionTimer");
                //in case server and client clocks are slightly out of synch
                if (self.timeToLive === -1 || self.timeToLive < self.sessionWarnBefore) {
                    SessionManagementService.timedOut();
                    return false;
                } else {
                    self.idle = self.timeToLive - self.sessionWarnBefore;
                    self.timeOut = self.sessionWarnBefore;
                    Idle.setIdle(self.idle);
                    Idle.setTimeout(self.timeOut);
                    Idle.watch();
                }
            },function(error) {
                self.errorDialog(error);
            });
        }

        function callKeepALive() {
            SessionManagementService.keepALive().then(function(response) {
                self.timeToLive = response.timeToLive;
                Idle.unwatch();
                $mdDialog.cancel("sessionTimer");
                //in case server and client clocks are slightly out of synch
                if (self.timeToLive === -1 || self.timeToLive < self.sessionWarnBefore) {
                    SessionManagementService.timedOut();
                    return false;
                } else {
                    self.idle = self.timeToLive - self.sessionWarnBefore;
                    self.timeOut = self.sessionWarnBefore;
                    Idle.setIdle(self.idle);
                    Idle.setTimeout(self.timeOut);
                    Idle.watch();
                }
            },function(error) {
               // console.log("error",error);
                self.errorDialog(error);
            });
        }
        
        function errorDialog(error) {
           $mdDialog.show({
                scope: $scope,
                preserveScope: true,
                template: '<md-dialog>' +
                    '<md-dialog-content class="md-dialog-content">' +
                    '<h2 class="md-title ng-binding">LTS Policy</h2>' +
                    '<div class="md-dialog-content-body">Unfortunately, your request could not be completed. For assistance, please <a href="http://nrs.harvard.edu/urn-3:hul.ois:drshelp">contact Library Technology Services</a> and include the following address in your description:' +
                    '<div>' + error + '</div></div>' +
                    '</md-dialog-content>' +
                    '<md-dialog-actions>' +
                    '<md-button ng-click="closeDialog()" class="md-primary">' +
                    'OK' +
                    '</md-button>' +
                    '</md-dialog-actions>' +
                    '</md-dialog>',

                controller: function ($scope) {
                    $scope.closeDialog = function() {
                       // console.log("ERROR logout");
                        Idle.unwatch();
                        $mdDialog.cancel("sessionTimer");
                        SessionManagementService.logout();
                    };
                }
            });
        }
        $scope.callTimeCheck = self.callTimeCheck;
        $scope.callTimeCheck();
        return self;
    }
/*}());*/
