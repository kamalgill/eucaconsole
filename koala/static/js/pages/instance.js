/**
 * @fileOverview Instance page JS
 * @requires AngularJS
 *
 */

// Instance page includes the tag editor, so pull in that module as well.
angular.module('InstancePage', ['TagEditor'])
    .controller('InstancePageCtrl', function ($scope, $http, $timeout) {
        $http.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
        $scope.instanceStateEndpoint = '';
        // Valid instance states are: "pending", "running", "shutting-down", "terminated", "stopping", "stopped"
        // 'shutting-down' = terminating state
        $scope.transitionalStates = ['pending', 'stopping', 'shutting-down'];
        $scope.instanceState = '';
        $scope.isUpdating = false;
        $scope.isNotStopped = $scope.instanceState != 'stopped';
        $scope.instanceForm = $('#instance-form');
        $scope.isTransitional = function (state) {
            return $scope.transitionalStates.indexOf(state) !== -1;
        };
        $scope.initController = function (jsonEndpoint, consoleEndpoint, state, id, group_name, key_name, public_dns_name, platform) {
            $scope.instanceStateEndpoint = jsonEndpoint;
            $scope.consoleOutputEndpoint = consoleEndpoint;
            $scope.instanceState = state;
            $scope.instanceID = id;
            $scope.groupName = group_name;
            $scope.keyName = key_name;
            $scope.publicDNS = public_dns_name;
            $scope.platform = platform;
            $scope.getInstanceState();
            $scope.setFocus();
        };
        $scope.revealConsoleOutputModal = function() {
            $('.actions-menu').trigger('click');
            $http.get($scope.consoleOutputEndpoint).success(function(oData) {
                var results = oData ? oData.results : '';
                if (results) {
                    $scope.consoleOutput = results;
                    var modal = $('#console-output-modal');
                    modal.foundation('reveal', 'open');
                }
            }).error(function (oData, status) {
                var errorMsg = oData['error'] || null;
                if (errorMsg && status === 403) {
                    alert(errorMsg);
                    $('#euca-logout-form').submit();
                }
            });
        };
        $scope.setFocus = function () {
            $(document).on('opened', '[data-reveal]', function () {
                var modal = $(this);
                var inputElement = modal.find('input[type!=hidden]').get(0);
                var modalButton = modal.find('button').get(0);
                if (!!inputElement) {
                    inputElement.focus();
                } else if (!!modalButton) {
                    modalButton.focus();
                }
            });
        };
        $scope.getInstanceState = function () {
            $http.get($scope.instanceStateEndpoint).success(function(oData) {
                $scope.instanceState = oData ? oData.results : '';

                // Poll to obtain desired end state if current state is transitional
                if ($scope.isTransitional($scope.instanceState)) {
                    $scope.isUpdating = true;
                    $timeout(function() {$scope.getInstanceState()}, 4000);  // Poll every 4 seconds
                } else {
                    $scope.isUpdating = false;
                }
                $scope.isNotStopped = $scope.instanceState != 'stopped';
            });
        };
        $scope.submitUpdateInstance = function ($event) {
            $event.preventDefault();
            $('a.close-reveal-modal').trigger('click');
            $('#start_later').val('true');
            $scope.instanceForm.submit();
        };
        $scope.cancelUpdateInstance = function ($event) {
            $event.preventDefault();
            $('a.close-reveal-modal').trigger('click');
            $scope.instanceForm.submit();
        };
    })
;

