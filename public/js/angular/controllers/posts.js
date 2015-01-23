app.controller('PostsIndexController', 
  ['$scope', '$http', function($scope, $http) {
  $scope.posts = [];
  $http({
    method: "GET", 
    url: 'posts',
  }).success(function(data) {
    data.forEach(function(item) {
      $scope.posts.push(item);
    });
  });
}]);

app.controller('PostsShowController', 
  ['$scope', '$http', '$routeParams', '$sce', function($scope, $http, $routeParams, $sce) {
  $http({
    method: "GET", 
    url: 'posts/' + $routeParams.pretty_url,
  }).success(function(data) {
    $scope.post = data;
    $scope.body = $sce.trustAsHtml(data.body);
  });
}]);