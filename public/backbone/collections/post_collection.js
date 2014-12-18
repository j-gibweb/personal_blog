window.PostCollection = Backbone.Collection.extend({
  model: PostModel,
  url: '/posts',
  initialize: function(){
    // this.on('remove', this.hideModel, this);
  },
  parse: function(response) {
    response.forEach(function(x) {
      console.log(x)
    })
  }

  // hideModel: function(model){
  //   model.trigger('hide');
  // },

  // focusOnTodoItem: function(id) {
  //   var modelsToRemove = this.filter(function(todoItem){
  //     return todoItem.id != id;
  //   });

  //   this.remove(modelsToRemove);
  // }
})
