var $ = require('jquery');

module.exports = {
  // return this lil promise, because thats nice.
  login: function(data) {
    return $.ajax({
      type: "POST",
      url: '/login',
      data: data
    })
  }
}