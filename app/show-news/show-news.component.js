'use strict';

// Register `mainSearch` component, along with its associated controller and template

angular.
module('showNews').
component('showNews', {
    templateUrl: 'show-news/show-news.template.html',
    controller:['$scope', '$http', '$cookieStore',
        function ShowNewsController($scope, $http, $cookieStore,) {
            $scope.count = 0;
            $scope.items = {};
            $scope.login = false;
            if(localStorage.getItem('login')){
                $scope.login = true;
            }
            $http.get('/news/count').then(function (res) {
                $scope.count = res.data.count;
                // console.log(res.data)
                $scope.selPage = 1;
                //分页总数
                $scope.pageSize = 10;
                $scope.pages = Math.ceil($scope.count / $scope.pageSize); //分页数
                $scope.newPages = $scope.pages > 5 ? 5 : $scope.pages;
                //分页要repeat的数组
                $scope.pageList = [];
                for (let i = 0; i < $scope.newPages; i++) {
                    $scope.pageList.push(i + 1);
                }
                $http.get('/news/1')
                    .success(function (data) {
                        // console.log(data);
                        $scope.items = data.data;
                        for(let item in $scope.items) {
                            // console.log($scope.items[item]._id)
                            localStorage.setItem($scope.items[item]._id, JSON.stringify($scope.items[item]));
                        }
                    })
                    .error(function (data) {
                        console.log('err: ' + data.status)
                    })
            });

            //上一页
            $scope.Previous = function () {
                $scope.selectPage($scope.selPage - 1);
            };
            //下一页
            $scope.Next = function () {
                $scope.selectPage($scope.selPage + 1);
            };
            //打印当前选中页索引
            $scope.selectPage = function (page) {
                //不能小于1大于最大
                if (page < 1 || page > $scope.pages) return;
                //最多显示分页数5
                if (page > 2) {
                    //因为只显示5个页数，大于2页开始分页转换
                    let newpageList = [];
                    for (let i = (page - 3) ; i < ((page + 2) > $scope.pages ? $scope.pages : (page + 2)) ; i++) {
                        newpageList.push(i + 1);
                    }
                    $scope.pageList = newpageList;
                }
                $scope.selPage = page;
                // $scope.setData();
                $scope.isActivePage(page);
                $http.get('/news/'+page)
                    .success(function (data) {
                        // console.log('pageItem: ' + data.data);
                        $scope.items = data.data;
                        for(let item in $scope.items) {
                            localStorage.setItem($scope.items[item]._id, JSON.stringify($scope.items[item]));
                        }
                    })
                    .error(function (data) {
                        console.log('err: ' + data.status)
                    })
                // console.log("选择的页：" + page);
            };
            //设置当前选中页样式
            $scope.isActivePage = function (page) {
                return $scope.selPage == page;
            };

            $scope.searchByName = function (name) {
            }

            $scope.createNews = function () {

            }

            $scope.edit = function (item) {

            }

            $scope.delete = function (item) {
                $http.post('/news/delete', {data: item})
                    .success(function (data) {
                        console.log(data)
                        alert('删除' + item.title + '成功');
                        $route.reload();
                    })
                    .error(function (data) {
                        alert('删除失败');
                    })
            }

            $scope.adminLogin = function () {
                location.href = '#!/login';
            }

            $scope.management = function () {
                location.href = '#!/admin';
            }


        }]

});
