var app = angular.module('portfolio', 
  ['ngRoute', 'appControllers']);

var appControllers = angular.module("appControllers", []);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'js/angular/views/post-list.html',
      controller: 'PostsController'
    })
    .otherwise({
      redirectTo: '/'
    });
}]);
