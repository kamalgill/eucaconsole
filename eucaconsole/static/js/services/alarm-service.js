angular.module('AlarmServiceModule', ['EucaRoutes'])
.factory('AlarmService', ['$http', 'eucaRoutes', function ($http, eucaRoutes) {
    return {
        createAlarm: function (alarm, csrf_token) {
            return eucaRoutes.getRouteDeferred('cloudwatch_alarms').then(function (path) {
                return $http({
                    method: 'PUT',
                    url: path,
                    data: {
                        alarm: alarm,
                        csrf_token: csrf_token
                    }
                });
            });
        },

        updateAlarm: function (alarm, path, csrf_token, flash) {
            return $http({
                method: 'PUT',
                url: path,
                data: {
                    alarm: alarm,
                    csrf_token: csrf_token,
                    flash: flash
                }
            });
        },

        deleteAlarms: function (alarms, path, csrf_token, flash) {
            var alarmNames = alarms.map(function (current) {
                return current.name;
            });

            return $http({
                method: 'DELETE',
                url: path,
                data: {
                    alarms: alarmNames,
                    csrf_token: csrf_token,
                    flash: flash
                }
            });
        },

        updateActions: function (id, actions) {
            return eucaRoutes.getRouteDeferred('cloudwatch_alarm_actions', { alarm_id: id }).then(function (path) {
                return $http({
                    method: 'PUT',
                    url: path,
                    data: {
                        actions: actions
                    }
                });
            });
        },

        getHistory: function (id) {
            return eucaRoutes.getRouteDeferred('cloudwatch_alarm_history_json', { alarm_id: id }).then(function (path) {
                return $http({
                    method: 'GET',
                    url: path
                }).then(function (response) {
                    var data = response.data || {
                        history: []
                    };
                    return data.history;
                });
            });
        }
    };
}]);
