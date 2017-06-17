/**
 * Created by richard on 17-6-16.
 */
'use strict';

// Register `login` component, along with its associated controller and template

angular.
module('login').
component('login', {
    templateUrl: 'login/login.template.html',
    controller:['$scope', '$http', '$cookieStore', '$route',
        function LoginController($scope, $http, $cookieStore, $route) {
            $scope.username = '';
            $scope.password = '';
            $scope.hide = true;

            $scope.login = function () {
                if($scope.username == '' || $scope.password == '') {
                    $scope.hide = false;
                } else {
                    $http.post('/login', {username: $scope.username, password: $scope.password})
                        .success(function (data) {
                            if(data.status == 200) {
                                localStorage.setItem('login', 'login');
                                localStorage.setItem('create_user', $scope.username);
                                location.href = '#!/admin';
                            } else {
                                alert(data.message);
                            }

                        })
                        .error(function (data) {
                            alert(data.message);
                        })
                }
            }
        }]

});