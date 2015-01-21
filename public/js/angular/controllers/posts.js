app.controller('PostsController', function($scope, $http, $location) {

  $scope.index = function() {
    $scope.posts = [];
    $http({
      method: "GET", 
      url: 'posts',
    }).success(function(data) {
      data.forEach(function(item) {
        // console.log(item)
        $scope.posts.push(item);
      });
    });
  }; 


  if ($location.path() === '/') {$scope.index();}
});