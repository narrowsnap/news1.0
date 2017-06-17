'use strict';

// Register `createNews` component, along with its associated controller and template

angular.
module('createNews')
    .component('createNews', {
    templateUrl: 'create-news/create-news.template.html',
    controller:['$scope', '$http', '$cookieStore', 'Upload', '$routeParams',
        function CreateNews($scope, $http, $cookieStore, Upload, $routeParams) {
            if(localStorage.getItem('login')) {
                $scope.title = '';
                $scope.tag = '';
                $scope.img_url = '';
                $scope.content = '';
                $scope.upload_img = localStorage.getItem('create_user');
                $scope.hide = true;
                $scope.file = null;

                /*$scope.select = function (file) {
                    if(file){
                        let reader = new FileReader();
                        reader.onload = function (ev) {
                            $scope.img_url = ev.target.result;
                        };
                        reader.readAsDataURL(file);
                    }
                };*/


                $scope.createNews = function () {
                    if($scope.title == '' || $scope.tag == '' || $scope.content == '' || $scope.file == '') {
                        $scope.hide = false;
                    } else {
                        $scope.uploadFiles();
                    }
                };

                // upload later on form submit or something similar
                $scope.uploadFiles = function() {
                    if ($scope.file) {
                        $scope.upload($scope.file);
                    } else {
                        console.log('fail')
                    }
                };

                // upload on file select or drop
                $scope.upload = function (file) {
                    Upload.upload({
                        url: '/uploadImg',
                        file: file,
                        data: {
                            img_name: $scope.title
                        }
                    }).progress(function (evt) {
                        let progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                        console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                    }).success(function (data, status, headers, config) {
                        if(data.status == 200) {
                            $http.post('/form', {data: {
                                title: $scope.title,
                                tag: $scope.tag,
                                img_type: data.img_type,
                                content: $scope.content,
                                create_user: localStorage.getItem('create_user')
                            }}).success(function (data, status, headers, config) {
                                if(data.status == 200) {
                                    console.log('suc: ' + JSON.stringify(data));
                                    alert('创建成功');
                                    location.href = '#!admin';
                                } else if(data.status == 401) {
                                    alert(data.message);
                                    location.href = '#!/login'
                                } else {
                                    alert(data.message);
                                }
                            }).error(function (data, status, headers, config) {
                                console.log('err: ' + JSON.stringify(data));
                            })
                        } else if(data.status == 401) {
                            alert(data.message);
                            location.href = '#!/login'
                        } else {
                            alert(data.message);
                        }
                    }).error(function (data, status, headers, config) {
                        console.log('error status: ' + status);
                    })
                };

                $scope.show = function (file) {

                }

            } else {
                location.href = '#!/login';
            }



        }]

});

