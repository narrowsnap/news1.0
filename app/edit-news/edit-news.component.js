'use strict';

// Register `createNews` component, along with its associated controller and template

angular.
module('editNews')
    .component('editNews', {
    templateUrl: 'edit-news/edit-news.template.html',
    controller:['$scope', '$http', '$cookieStore', 'Upload', '$routeParams',
        function EditNews($scope, $http, $cookieStore, Upload, $routeParams) {
            if(localStorage.getItem('login')) {
                $scope.item = JSON.parse(localStorage.getItem($routeParams.id));
                $scope.title = $scope.item.title;
                $scope.tag = $scope.item.tag;
                $scope.img_url = $scope.item.img_url;
                $scope.content = $scope.item.content;
                $scope.upload_img = localStorage.getItem('create_user');
                $scope.hide = true;

                $scope.createNews = function () {
                    if($scope.title === '' || $scope.tag === '' || $scope.content === '' || $scope.file === '') {
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
                        if(data.status === 200) {
                            $http.post('/form', {data: {
                                title: $scope.title,
                                tag: $scope.tag,
                                img_type: data.img_type,
                                content: $scope.content,
                                create_user: localStorage.getItem('create_user')
                            }}).success(function (data, status, headers, config) {
                                if(data.status === 200) {
                                    console.log('suc: ' + JSON.stringify(data));
                                    alert('创建成功');
                                    location.href = '#!admin';
                                } else if(data.status === 401) {
                                    alert(data.message);
                                    location.href = '#!/login'
                                } else {
                                    alert(data.message);
                                }
                            }).error(function (data, status, headers, config) {
                                console.log('err: ' + JSON.stringify(data));
                            })
                        } else if(data.status === 401) {
                            alert(data.message);
                            location.href = '#!/login'
                        } else {
                            alert(data.message);
                        }
                    }).error(function (data, status, headers, config) {
                        console.log('error status: ' + status);
                    })
                };

            } else {
                location.href = '#!/login';
            }



        }]

});

