/*(function() {*/
'use strict';
dmtApplication.controller("questionController", questionController);
dmtApplication.controller("questionPopUpController", questionPopUpController);

function questionController($scope, questionService, Excel, $state, $mdDialog,
    $mdToast, $timeout, $mdSidenav, $log, $rootScope) {
    var self = {
        init: init
    };

    function init() {
        $rootScope.currentController = 'Question';
        var current = $state.current.name;
        $rootScope.currentDataEnable = true;
        $scope.currentState = current.split(/[\s.]+/);
        $scope.currentPage = "Create";
        $scope.currentRoute = $scope.currentState[$scope.currentState.length - 1];
        $scope.customFullscreen = false;
        $scope.updatePage = false;
        $scope.coursesData = [];
        $scope.collection = [];
        $scope.selected = [];
        $scope.headerEnable = {};
        $scope.exportData = [];

        $scope.cancelRecord = function () {
            $mdSidenav('right').close().then(function () {
                $log.debug("close RIGHT is done");
            });
        }

        $scope.record = {
            "endClient": "",
            "question": "",
            "answers": "",
            "createdDate": "",
            "description": ""
        }

        $scope.loading = true;
        questionService.getAllQuestion().then(function (response) {
            $scope.questionData = response.data;
            $scope.questionLength = response.data.length;
            $rootScope.currentTableLength = 'Records Count :' + response.data.length;
            $scope.questionOptions = [200, 300];
            $scope.questionPage = {
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

        $scope.getDetailedInfo = function (id, ev) {
            console.log(id);
            $rootScope.questionId = id;
            $mdDialog.show({
                    controller: questionPopUpController,
                    templateUrl: 'pages/app.question/question.answer.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true,
                    fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
                })
                .then(function (answer) {
                    $scope.status = 'You said the information was "' + answer + '".';
                }, function () {
                    $scope.status = 'You cancelled the dialog.';
                });
        }

        $scope.splitData = function (text) {
            var content = text.substring(0, 25);
            return content;
        }

        /*Header icon functionality*/
        var deregisterListener = $rootScope.$on("CallQuestionMethod", function () {
            if ($rootScope.$$listeners["CallQuestionMethod"].length > 1) {
                $rootScope.$$listeners["CallQuestionMethod"].pop();

            }
            $scope.currentPage = "Create";
            $scope.toggleRight();
            $scope.emptyForm();
        });

        var deregisterListener = $rootScope.$on("CallQuestionSearchMethod", function (event, args) {
            if ($rootScope.$$listeners["CallQuestionSearchMethod"].length > 1) {
                $rootScope.$$listeners["CallQuestionSearchMethod"].pop();
            }
            $scope.filterByText = args.text;
        });
        $scope.saveRecord = function () {
            questionService.create($scope.record).then(function (response) {
                //	console.log("resp", response);
            });
            $scope.currentPage = "Create";
            $mdSidenav('right').close().then(function () {
                $log.debug("close RIGHT is done");
            });
            window.location.reload();
        }

        $scope.setRowData = function (row) {
            $scope.updatePage = true;
            $scope.currentPage = "Update";
            $scope.record = {
                "endClient": row.endClient,
                "question": row.question,
                "answers": row.answers,
                "updatedDate": "",
                "description": row.description,
                "id": row.id

            };
            // console.log($scope.create.status);
        };
        $scope.updateRecord = function () {
            console.log($scope.record);
            questionService.update($scope.record).then(function (response) {
                //console.log("resp", response);
            });
            $mdSidenav('right').close().then(function () {
                $log.debug("close RIGHT is done");
            });
            $scope.currentPage = "Create";
            window.location.reload();
        }
        $scope.emptyForm = function () {
            $scope.updatePage = false;
            $scope.record = {
                "endClient": "",
                "question": "",
                "answers": "",
                "createdDate": "",
                "description": ""
            }
        };

        $scope.rowSelect = function (row) {
            $scope.selected.push(row);
        };
        $scope.headerCheckbox = false;
        $scope.selectAll = function () {
            if (!$scope.headerCheckbox) {
                for (var i in $scope.questionData) {
                    $scope.questionData[i]["checkboxValue"] = 'on';
                    $scope.selected.push($scope.questionData[i]);
                };
                $scope.headerCheckbox = ($scope.headerCheckbox == false) ? true : false;
            } else if ($scope.headerCheckbox) {
                for (var i in $scope.questionData) {
                    $scope.questionData[i]["checkboxValue"] = 'off';
                    $scope.selected = [];
                };
                $scope.headerCheckbox = ($scope.headerCheckbox == true) ? false : true;
            };
            //	console.log($scope.selected);
        };



        $scope.deleteRow = function (ev, row) {
            var confirm = $mdDialog
                .confirm()
                .title('Are you sure want to Delete Record?')

                .ariaLabel('Lucky day').targetEvent(ev).ok(
                    'Ok').cancel('Cancel');

            $mdDialog.show(confirm).then(function () {
                questionService.deleteRow(row.id).then(function (response) {});
                window.location.reload();

            }, function () {
                $scope.status = 'You decided to keep your Task.';
            });

        };


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

function questionPopUpController($scope, questionService, $mdDialog, $rootScope, $mdToast, $timeout,
    $state, $mdSidenav, $log) {
    $scope.questionId = $rootScope.questionId;
    questionService.getAllQuestion().then(function (response) {
        $scope.questionsData = response.data;
        angular.forEach($scope.questionsData, function (value, key) {
            if (value.id == $scope.questionId) {
                $scope.answers = value.answers;
            }

        });
    });
    $scope.cancel = function () {
        $mdDialog.cancel();
    };
}

dmtApplication.directive('createQuestion', function ($state) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: function () {
            var current = $state.current.name;
            return '../dmt/pages/' + current + '/' + current + '.record.html';
        }
    };
});