var filters = angular.module('postFilters', []);
  
filters.filter('postImages', function() {
  return function(input) {
    if (input) {
      console.log(input)
      return input.replace(/&lt;img/g, '<img').replace(/&gt;/g,'>');
    }
  };
});