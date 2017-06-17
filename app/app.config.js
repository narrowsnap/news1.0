'use strict';

angular.
  module('phonecatApp').
  config(['$locationProvider' ,'$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider.
        when('/', {
          template: '<show-news></show-news>'
        }).
        /*when('/:personId', {
          template: '<create-news></create-news>'
        }).*/
        when('/login', {
          template: '<login></login>'
        }).
        when('/admin', {
          template: '<admin-page></admin-page>'
        }).
        when('/create', {
          template: '<create-news></create-news>'
        }).
        when('/edit/:id', {
          template: '<edit-news></edit-news>'
        }).
        when('/showDetail/:id', {
          template: '<show-detail></show-detail>'
        }).
        otherwise('/');
    }
  ]);
