window.PostsView = Backbone.View.extend({
  initialize: function(){

  },
  // el: '.page',
  render: function () {
    var that = this;
    var posts = new PostCollection();
    posts.fetch({
      success: function (posts) {
        // var template = _.template($('#post-list-template').html(), {posts: posts.models});

        var template = _.template(
          '<h1><%= title %></h1>' + 
          '<p><%= body %></p>'
          );
        
        that.$el.html(template);
        // console.log(that.$el.html(template))

        
        // var html = []
        // posts.models.forEach(function(e) {
        //   html.push(template(e.attributes))  
        // })
        // console.log(html)
        // this.$el.html(this.template(this.model.toJSON()));
        // $('#app').html(template(posts.models[0].attributes));
        // $('#app').html(template(posts.models[0].attributes));
        // that.$el.html(template);
      }
    })
  }
});


