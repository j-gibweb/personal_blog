

var Blog = React.createClass({displayName: "Blog",
  getInitialState: function() {
    return {
      posts: []
    }
  },
  componentDidMount: function() {
    $.get(this.props.source, function(data) {
      if (this.isMounted()) {
        this.setState({
          posts: data
        })
      }
    }.bind(this))
  },
  render: function() {
    var posts = []
    this.state.posts.forEach(function(post) {
      posts.push(React.createElement(Post, {id: post._id, title: post.title, pretty_url: post.pretty_url, body: post.body}))
    })
    return (
      React.createElement("div", null, 
      React.createElement("div", {className: "container"}, 
        React.createElement("div", {className: "col-lg-8 col-lg-offset-2"}, 
          React.createElement("div", {className: "clearfix"}), 
          React.createElement("h1", null, "my thoughts on things"), React.createElement("hr", null), 
          posts
        )
      )
      )
      );
  }
});

var Post = React.createClass({displayName: "Post",
  getInitialState: function(){
    return {}
  },
  render: function() {
    var url = '/posts/' + this.props.pretty_url
    return (
      React.createElement("div", null, 
        React.createElement("h4", {className: "title tiny-text"}, this.props.title), 
        React.createElement("p", {className: "title tiny-text"}, 
          React.createElement("a", {href: url}, this.props.id), " - ", this.props.body.split(' ').length, " words"
        ), 
        React.createElement("hr", null)
      )
    )
  }
})

React.render(React.createElement(Blog, {source: "/posts"}), document.getElementById('blog'));
