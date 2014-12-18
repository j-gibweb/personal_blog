window.BlogApp = new (Backbone.Router.extend({
  routes: {
    "posts": "index",
    "posts/:id": "show"
  },

  initialize: function(){
    // this.postsView = new PostsView();
    // this.postsView.render();
  },

  index: function(){
    var posts = new PostCollection();
    posts.fetch()
    // console.log(posts)
    // $('#app').html(posts);

  },

  start: function(){
    Backbone.history.start();
  },

  show: function(id){
    // this.todoItems.focusOnTodoItem(id);
  }
}));