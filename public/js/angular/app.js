var app = angular.module('portfolio', 
  ['ngRoute', 'appControllers', 'postFilters']);

var appControllers = angular.module("appControllers", []);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'js/angular/views/post-list.html',
      controller: 'PostsIndexController'
    })
    .when('/posts/:pretty_url', {
      templateUrl: 'js/angular/views/post-view.html',
      controller: 'PostsShowController'
    })
    .otherwise({
      redirectTo: '/'
    });
}]);
