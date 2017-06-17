'use strict';

// Register `showDetail` component, along with its associated controller and template
angular.
  module('showDetail').
  component('showDetail', {
    templateUrl: 'show-detail/show-detail.template.html',
    controller: ['$routeParams', '$cookieStore', '$scope', '$sce',
      function showDetailController($routeParams, $cookieStore, $scope, $sce) {
        $scope.item = JSON.parse(localStorage.getItem($routeParams.id));
          $scope.deliberatelyTrustDangerousSnippet = function() {
              return $sce.trustAsHtml($scope.item.content);
          };
      }
    ]
  });

/*angular
    .module('showDetail').filter('trustHtml', function ($sce) {
    return function (input) {
        return $sce.trustAsHtml(input);
    }
});

angular
    .module('showDetail').filter('ntobr', function () {
    let filter = function(input){
        return input.replace(/\n/g,"<\/br>").replace(/ /g,"&nbsp;");
    };
    return filter;
})*/
